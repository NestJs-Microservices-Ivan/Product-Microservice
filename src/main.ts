import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { envsValue } from './products/config/envs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
AppModule,
          {
            transport:Transport.TCP,
            options:{
              port: envsValue.PORT
            }
          }
  );
  const logger = new Logger('Main')
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted: true
    })
  )
  
  logger.log(`Products Microservice running on port ${envsValue.PORT}`)
  
}
bootstrap();

