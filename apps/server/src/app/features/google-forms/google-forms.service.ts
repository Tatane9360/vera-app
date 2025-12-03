import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import * as path from 'path';

@Injectable()
export class GoogleFormsService {
  private auth;
  private forms;
  private readonly logger = new Logger(GoogleFormsService.name);

  constructor() {
    try {
      // Check if credentials are provided via environment variable (Railway)
      if (process.env.GOOGLE_CREDENTIALS_JSON) {
        this.logger.log('✅ Using Google credentials from GOOGLE_CREDENTIALS_JSON environment variable');
        const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
        
        this.auth = new google.auth.GoogleAuth({
          credentials: credentials,
          scopes: [
            'https://www.googleapis.com/auth/forms.responses.readonly',
            'https://www.googleapis.com/auth/forms.body.readonly'
          ],
        });
      } else {
        // Fallback to local file (development)
        this.logger.log('Using Google credentials from local file');
        const keyFilePath = path.join(process.cwd(), 'apps/server/google-credentials.json');
        
        this.auth = new google.auth.GoogleAuth({
          keyFile: keyFilePath,
          scopes: [
            'https://www.googleapis.com/auth/forms.responses.readonly',
            'https://www.googleapis.com/auth/forms.body.readonly'
          ],
        });
      }

      this.forms = google.forms({ version: 'v1', auth: this.auth });
      this.logger.log('✅ Google Forms Service initialized successfully');
    } catch (error) {
      this.logger.error('❌ Failed to initialize Google Forms Service', error);
    }
  }

  async getFormResponses(formId: string) {
    if (!this.forms) {
      throw new Error('Google Forms service not initialized');
    }
    try {
      const response = await this.forms.forms.responses.list({
        formId: formId,
      });
      return response.data || {};
    } catch (error) {
      this.logger.error(`Error fetching responses for form ${formId}`, error);
      throw error;
    }
  }

  async getFormDetails(formId: string) {
    if (!this.forms) {
      throw new Error('Google Forms service not initialized');
    }
    try {
      const response = await this.forms.forms.get({
        formId: formId,
      });
      return response.data || {};
    } catch (error) {
      this.logger.error(`Error fetching details for form ${formId}`, error);
      throw error;
    }
  }

  async getFormStatistics(formId: string) {
    if (!this.forms) {
      throw new Error('Google Forms service not initialized');
    }

    try {
      // 1. Récupérer la structure du formulaire (les questions)
      const formDetails = await this.getFormDetails(formId);
      
      // 2. Récupérer toutes les réponses
      const formResponses = await this.getFormResponses(formId);

      // 3. Créer un dictionnaire questionId -> Titre de la question
      const questionMap = new Map<string, string>();
      if (formDetails.items) {
        for (const item of formDetails.items) {
          if (item.questionItem?.question?.questionId) {
            questionMap.set(item.questionItem.question.questionId, item.title || 'Question sans titre');
          }
        }
      }

      // 4. Agréger les statistiques
      const stats: Record<string, Record<string, number>> = {};

      if (formResponses.responses) {
        for (const response of formResponses.responses) {
          if (!response.answers) continue;

          for (const [questionId, answer] of Object.entries(response.answers)) {
            const questionTitle = questionMap.get(questionId) || 'Question inconnue';
            
            // Initialiser l'objet stats pour cette question si nécessaire
            if (!stats[questionTitle]) {
              stats[questionTitle] = {};
            }

            // Compter les réponses (textAnswers)
            // Note: Google Forms peut avoir plusieurs types de réponses, ici on gère le texte simple
            const answerValue = (answer as any).textAnswers?.answers?.[0]?.value || 'Non répondu';
            
            if (!stats[questionTitle][answerValue]) {
              stats[questionTitle][answerValue] = 0;
            }
            stats[questionTitle][answerValue]++;
          }
        }
      }

      return stats;

    } catch (error) {
      this.logger.error(`Error calculating statistics for form ${formId}`, error);
      throw error;
    }
  }
}
