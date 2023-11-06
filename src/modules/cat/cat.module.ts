import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  //   UserModule,
  // ],
  controllers: [CatController],
  // providers: [CatService],
})
export class CatModule {}
