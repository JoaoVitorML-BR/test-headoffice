import { Controller, Post, Body } from '@nestjs/common';
// import { RegisterDto } from './dto/register.dto';
// import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // async register(@Body() dto: RegisterDto) {
  //   return this.authService.register(dto);
  // }
  register(@Body() _body: any) {
    return { message: 'register endpoint - to be implemented' };
  }

  @Post('login')
  // async login(@Body() dto: LoginDto) {
  //   return this.authService.login(dto);
  // }
  login(@Body() _body: any) {
    return { message: 'login endpoint - to be implemented' };
  }
}
