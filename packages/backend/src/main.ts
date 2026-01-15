import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
// ajour validatorPipe pour valider les requêtes entraintes
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configuration pipe en global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,// Supprime les propriétés non décorées du DTO
      forbidNonWhitelisted: true, // Rejette les requêtes avec propriétés inconnues
      transform: true,// Transforme les objets JSON en instances de classe
      transformOptions: {
        enableImplicitConversion: true, // Convertit automatiquement les types exemple "5" deviendra 5 si le DTO attend un number
      },
    })
  );

  const configService = app.get(ConfigService);
  
  app.enableShutdownHooks();

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN') || '*',
    credentials: true,
  });
  
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);

  // Gestion des signaux d'arrêt pour libérer le port proprement
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await app.close();
    process.exit(0);
  });
  
  process.on('SIGINT', async () => {
    console.log('\nSIGINT signal received: closing HTTP server');
    await app.close();
    process.exit(0);
  });
}
bootstrap();
