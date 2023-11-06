import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let server: any;

async function setupSwagger(app) {
  // const serverUrl = isServerless ? '/dev' : '/';
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addServer('/dev')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const swaggerHandler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (event.path === '/api') {
    event.path = '/api/';
  }
  event.path = event.path.includes('swagger-ui')
    ? `/api${event.path}`
    : event.path;

  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
