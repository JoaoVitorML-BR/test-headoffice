import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

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
    const normalized = email?.toLowerCase?.() ?? email;
    return this.userModel.findOne({ email: normalized }).exec();
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    const normalized = email?.toLowerCase?.() ?? email;
    return this.userModel.findOne({ email: normalized }).select('+password').exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.email) {
      const emailLower = updateUserDto.email.toLowerCase?.() ?? updateUserDto.email;
      const exists = await this.userModel
        .findOne({ email: emailLower, _id: { $ne: id } })
        .lean()
        .exec();
      if (exists) {
        throw new ConflictException('Email already in use');
      }
      (updateUserDto as any).email = emailLower;
    }

    let updatedUser: User | null = null;
    try {
      updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true, runValidators: true, context: 'query' })
        .exec();
    } catch (err: any) {
      if (err?.code === 11000 && err?.keyPattern?.email) {
        throw new ConflictException('Email already in use');
      }
      throw err;
    }

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
