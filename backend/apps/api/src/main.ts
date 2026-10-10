import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api.module.js';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  // validation dto
  app.useGlobalPipes(new ValidationPipe());

  // Kafka microservice
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: [`localhost:${process.env.KAFKA_PORT}`],
  //     },
  //     consumer: {
  //       groupId: 'jobradar-kafka',
  //     },
  //   },
  // });
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Application API')
    .setDescription('The main appl API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // run microservices
  // await app.startAllMicroservices();

  await app.listen(process.env.port ?? 3000);
}
await bootstrap();
