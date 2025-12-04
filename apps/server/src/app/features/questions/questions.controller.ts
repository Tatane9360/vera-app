import { Controller, Get, Post, Body, Query } from '@nestjs/common';

@Controller('questions')
export class QuestionsController {
  private questions: Array<{ id: string; question: string; createdAt: string }> = [];

  @Post()
  async createQuestion(@Body() body: { question: string }) {
    try {
      console.log('Création de question:', body);
      const question = {
        id: Date.now().toString(),
        question: body.question,
        createdAt: new Date().toISOString(),
      };
      this.questions.push(question);
      console.log('Question créée:', question);
      return question;
    } catch (error) {
      console.error('Erreur création:', error);
      throw error;
    }
  }

  @Get()
  async getQuestions(
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    try {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const skip = (pageNum - 1) * limitNum;

      const paginatedQuestions = this.questions
        .slice(skip, skip + limitNum)
        .reverse();

      return {
        data: paginatedQuestions,
        total: this.questions.length
      };
    } catch (error) {
      console.error('Erreur récupération:', error);
      throw error;
    }
  }
}