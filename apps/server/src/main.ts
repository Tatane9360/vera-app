import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // 1. Définition de la liste de base (Dev & Production spécifique)
  const baseOrigins: (string | RegExp)[] = [
    'http://localhost:4200',
    // Assurez-vous d'ajouter ici TOUTES les versions (avec/sans slash, HTTP/HTTPS) si vous avez un doute
    'https://vera-app-client.vercel.app',
    'https://vera-app-client.vercel.app/',
    /\.vercel\.app$/,
  ];

  // 2. Récupération des origines depuis la variable d'environnement
  const envOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : [];

  // 3. Combinaison des deux listes
  const allowedOrigins: (string | RegExp)[] = [...baseOrigins, ...envOrigins];

  Logger.log('🔒 CORS Configuration:');
  allowedOrigins.forEach((origin) => {
    if (origin instanceof RegExp) {
      Logger.log(`   ✓ Pattern: ${origin.toString()}`);
    } else {
      Logger.log(`   ✓ ${origin}`);
    }
  });

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Accept,Authorization',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();