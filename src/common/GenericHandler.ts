import { NestFactory } from '@nestjs/core';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

export class GenericHandler<T> {
  constructor(module: T) {
    this.module = module;
  }

  private server: Handler;
  private module: T;

  private async bootstrap(): Promise<Handler> {
    const app = await NestFactory.create(this.module);
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
  }

  private handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
  ) => {
    this.server = this.server ?? (await this.bootstrap());
    return this.server(event, context, callback);
  };

  public getHandler() {
    return this.handler;
  }
}
