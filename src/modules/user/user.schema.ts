import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Cat } from '../cat/cat.schema';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }] })
  cats: Cat[];
}

export const UserSchema = SchemaFactory.createForClass(User);
