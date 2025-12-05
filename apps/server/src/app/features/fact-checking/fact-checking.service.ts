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

      const prompt =
        "Analyse cette image pour le fact-checking. Identifie l'allégation principale. Renvoie UNIQUEMENT cette allégation sous forme d'une phrase affirmative simple et précise, sans titre ni contexte. Exemple : 'Le président porte un t-shirt jaune'.";
      const result = await this.model.generateContent([prompt, imagePart]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new HttpException(
        'Failed to analyze image',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async analyzeUrl(url: string): Promise<string> {
    try {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        try {
          const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
            url
          )}&format=json`;
          const { data } = await axios.get(oembedUrl);
          return data.title;
        } catch (e) {
          console.warn(
            'Failed to get YouTube oEmbed, falling back to standard scraping',
            e
          );
        }
      }

      const { data } = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });

      const $ = cheerio.load(data);

      const title = $('title').text().trim();
      const metaDescription =
        $('meta[name="description"]').attr('content')?.trim() || '';
      const ogTitle =
        $('meta[property="og:title"]').attr('content')?.trim() || '';
      const ogDescription =
        $('meta[property="og:description"]').attr('content')?.trim() || '';
      const twitterTitle =
        $('meta[name="twitter:title"]').attr('content')?.trim() || '';
      const twitterDescription =
        $('meta[name="twitter:description"]').attr('content')?.trim() || '';

      const finalTitle = ogTitle || twitterTitle || title;
      const finalDescription =
        ogDescription || twitterDescription || metaDescription;

      let claim = finalTitle;

      if (!claim && finalDescription) {
        claim = finalDescription;
      }

      if (!claim) {
        claim = $('p').first().text().trim().substring(0, 200);
      }

      return claim.trim();
    } catch (error) {
      console.error('Error analyzing URL:', error);
      throw new HttpException(
        'Failed to analyze URL',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async verifyClaim(query: string): Promise<string> {
    const apiKey = process.env.VERA_API_KEY;
    if (!apiKey) {
      throw new HttpException(
        'VERA_API_KEY is not set',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const apiUrl =
      'https://feat-api-partner---api-ksrn3vjgma-od.a.run.app/api/v1/chat';

    try {
      const response = await axios.post(
        apiUrl,
        {
          userId: 'vera-app-user',
          query: query,
        },
        {
          headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
          },
          responseType: 'stream',
        }
      );

      return new Promise((resolve, reject) => {
        let data = '';
        response.data.on('data', (chunk: Buffer) => (data += chunk.toString()));
        response.data.on('end', () => resolve(data));
        response.data.on('error', (err: Error) => reject(err));
      });
    } catch (error) {
      console.error('Error verifying claim:', error);
      throw new HttpException(
        'Failed to verify claim with VERA API',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
