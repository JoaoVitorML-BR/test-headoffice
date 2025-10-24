import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/schemas/user.schema';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  private stripSensitive(user: any) {
    if (!user) return user;
    const { password, __v, ...rest } = user.toObject ? user.toObject() : user;
    return rest;
  }

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const created = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      cpf: dto.cpf,
      password: hashed,
      role: UserRole.USER,
    } as any);
    return this.stripSensitive(created);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, (user as any).password);
    if (!isMatch) return null;
    return this.stripSensitive(user) as User;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: (user as any)._id?.toString?.() ?? (user as any).id, email: user.email, role: (user as any).role };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
