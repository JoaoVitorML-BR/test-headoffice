import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthService } from './auth.service';

/**
 * Authentication Controller
 * 
 * Note: Public registration (/auth/register) is intentionally disabled.
 * The system starts with a default admin user (see seed.service.ts).
 * Only authenticated admins can create new users via POST /users endpoint.
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login', description: 'Authenticate user and return JWT access token' })
  @ApiResponse({ status: 200, description: 'Login successful, returns access_token', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
