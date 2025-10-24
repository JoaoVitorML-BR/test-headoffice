import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/user-role.enum';
import { AgentStatus } from '../../common/enums/agent-status.enum';

export class AgentResponseDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Agent unique identifier (MongoDB ObjectId)'
  })
  _id: string;

  @ApiProperty({ example: 'João Silva', description: 'Full name of the agent' })
  name: string;

  @ApiProperty({ example: 'joao.silva@example.com', description: 'Agent email address' })
  email: string;

  @ApiProperty({ example: '123.456.789-00', description: 'Agent CPF (Brazilian tax ID)' })
  cpf: string;

  @ApiProperty({ example: '+55 11 98765-4321', description: 'Agent phone number' })
  phone: string;

  @ApiProperty({ example: 'Sales Manager', description: 'Agent job position' })
  position: string;

  @ApiProperty({ example: 'Sales', description: 'Agent department' })
  department: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'Agent status',
    enum: AgentStatus
  })
  status: AgentStatus;

  @ApiProperty({
    example: 'USER',
    description: 'Agent role',
    enum: UserRole
  })
  role: UserRole;

  @ApiProperty({
    example: '2025-10-23T00:00:00.000Z',
    description: 'Agent creation timestamp'
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-10-23T00:00:00.000Z',
    description: 'Agent last update timestamp'
  })
  updatedAt: string;
}
