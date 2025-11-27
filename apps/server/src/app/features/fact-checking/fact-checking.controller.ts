import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FactCheckingService } from './fact-checking.service';
import { AnalyzeUrlDto, AnalyzeResponseDto, VerifyClaimDto, VerifyResponseDto } from '@compet-website/shared-types';
import { Express } from 'express';
import 'multer';

@Controller('fact-checking')
export class FactCheckingController {
  constructor(private readonly factCheckingService: FactCheckingService) {}

  @Post('analyze-image')
  @UseInterceptors(FileInterceptor('file'))
  async analyzeImage(@UploadedFile() file: Express.Multer.File): Promise<AnalyzeResponseDto> {
    const text = await this.factCheckingService.analyzeImage(file);
    return { text, source: 'image' };
  }

  @Post('analyze-url')
  async analyzeUrl(@Body() dto: AnalyzeUrlDto): Promise<AnalyzeResponseDto> {
    const text = await this.factCheckingService.analyzeUrl(dto.url);
    return { text, source: 'url' };
  }

  @Post('verify')
  async verifyClaim(@Body() dto: VerifyClaimDto): Promise<VerifyResponseDto> {
    const result = await this.factCheckingService.verifyClaim(dto.query);
    return { result };
  }
}
