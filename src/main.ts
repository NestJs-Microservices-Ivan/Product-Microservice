import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { envsValue } from './products/config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main')
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted: true
    })
  )
  
  await app.listen(envsValue.PORT);
  logger.log(`App running on port ${envsValue.PORT}`)
  
}
bootstrap();

