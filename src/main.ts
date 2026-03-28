import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { rabbitMQConfig } from './config/rabbitmq.config';
import { createDocument } from './config/swagger.config';
import { RMQConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('app.port');
  const { queue, url } = configService.get<RMQConfig>('rmq');

  const rmqConfig = rabbitMQConfig({
    queue: queue,
    urls: [url],
  });

  app.connectMicroservice<MicroserviceOptions>(rmqConfig);

  createDocument(app);

  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();
