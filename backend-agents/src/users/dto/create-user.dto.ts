import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/user-role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email address (unique)' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'securePass123', description: 'User password (min 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    example: 'USER', 
    description: 'User role (ADMIN, USER, or ENTERPRISE). Note: public registration via /auth/register always creates USER role.',
    enum: UserRole,
    required: false
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
