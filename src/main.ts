import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: port,
    },
  });
  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
