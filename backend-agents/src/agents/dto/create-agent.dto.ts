import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/user-role.enum';
import { AgentStatus } from '../../common/enums/agent-status.enum';

export class CreateAgentDto {
  @ApiProperty({ example: 'João Silva', description: 'Full name of the agent' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'joao.silva@example.com', description: 'Agent email address (unique)' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+55 11 98765-4321', description: 'Agent phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Sales Manager', description: 'Agent job position' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ example: 'Sales', description: 'Agent department' })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ 
    example: 'ACTIVE', 
    description: 'Agent status (ACTIVE or INACTIVE). Defaults to ACTIVE if not provided.',
    enum: AgentStatus,
    required: false
  })
  @IsEnum(AgentStatus)
  @IsOptional()
  status?: AgentStatus;

  @ApiProperty({ 
    example: 'USER', 
    description: 'Agent role (ADMIN, USER, or ENTERPRISE). Defaults to USER if not provided.',
    enum: UserRole,
    required: false
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

    @ApiProperty({ 
      example: '2024-01-15', 
      description: 'Agent hire date (ISO format: YYYY-MM-DD)',
      required: false
    })
    @IsDateString()
    @IsOptional()
    hireDate?: string;
}
