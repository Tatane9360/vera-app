import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class FactCheckingService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set');
    }
    this.genAI = new GoogleGenerativeAI(apiKey || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async analyzeImage(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      // Convert buffer to base64
      const imagePart = {
        inlineData: {
          data: file.buffer.toString('base64'),
          mimeType: file.mimetype,
        },
      };

      const prompt = "Analyse cette image pour le fact-checking. Identifie l'allégation principale. Renvoie UNIQUEMENT cette allégation sous forme d'une phrase affirmative simple et précise, sans titre ni contexte. Exemple : 'Le président porte un t-shirt jaune'.";
      const result = await this.model.generateContent([prompt, imagePart]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new HttpException('Failed to analyze image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async analyzeUrl(url: string): Promise<string> {
    try {
      // 1. Fetch URL content
      const { data } = await axios.get(url);
      
      // 2. Parse HTML to extract metadata (title and description)
      const $ = cheerio.load(data);
      
      const title = $('title').text().trim();
      const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
      const ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || '';
      const ogDescription = $('meta[property="og:description"]').attr('content')?.trim() || '';

      // Prioritize OG tags or standard tags
      const finalTitle = ogTitle || title;
      const finalDescription = ogDescription || metaDescription;

      // Construct the claim from metadata
      let claim = finalTitle;
      if (finalDescription) {
        claim += `. ${finalDescription}`;
      }

      if (!claim) {
         // Fallback if no metadata found, take first paragraph
         claim = $('p').first().text().trim().substring(0, 200);
      }

      return claim;
    } catch (error) {
      console.error('Error analyzing URL:', error);
      throw new HttpException('Failed to analyze URL', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyClaim(query: string): Promise<string> {
    const apiKey = process.env.VERA_API_KEY;
    if (!apiKey) {
      throw new HttpException('VERA_API_KEY is not set', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const apiUrl = 'https://feat-api-partner---api-ksrn3vjgma-od.a.run.app/api/v1/chat';

    try {
      const response = await axios.post(apiUrl, {
        userId: 'vera-app-user', // TODO: Use real user ID when auth is implemented
        query: query
      }, {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        },
        responseType: 'stream'
      });

      return new Promise((resolve, reject) => {
        let data = '';
        response.data.on('data', (chunk: Buffer) => data += chunk.toString());
        response.data.on('end', () => resolve(data));
        response.data.on('error', (err: Error) => reject(err));
      });

    } catch (error) {
      console.error('Error verifying claim:', error);
      throw new HttpException('Failed to verify claim with VERA API', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
