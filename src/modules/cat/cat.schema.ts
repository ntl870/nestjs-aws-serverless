import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../user/user.schema';

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  breed: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
