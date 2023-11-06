import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { CatModule } from './modules/cat/cat.module';
import { DogModule } from './modules/dog/dog.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    CatModule,
    DogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
