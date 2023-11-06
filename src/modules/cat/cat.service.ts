import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';
import { CreateCatDto } from './dto/cat.dto';
import { UsersService } from '../user/user.service';

@Injectable()
export class CatService {
  constructor(
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    private readonly userService: UsersService,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const owner = await this.userService.getUserById(createCatDto.ownerId);
    const createdCat = new this.catModel({
      name: createCatDto.name,
      breed: createCatDto.breed,
      owner: owner._id,
    });
    owner.cats.push(createdCat);
    await owner.save();
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
}
