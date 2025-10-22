import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userModel
      .findOne({ email: createUserDto.email.toLowerCase?.() ?? createUserDto.email })
      .lean()
      .exec();
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    try {
      const created = new this.userModel(createUserDto);
      return await created.save();
    } catch (err: any) {
      if (err?.code === 11000 && err?.keyPattern?.email) {
        throw new ConflictException('Email already registered');
      }
      throw err;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
