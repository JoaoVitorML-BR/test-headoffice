import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/user-role.enum';

export class UserResponseDto {
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011', 
    description: 'User unique identifier (MongoDB ObjectId)' 
  })
  _id: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ 
    example: 'USER', 
    description: 'User role',
    enum: UserRole
  })
  role: UserRole;

  @ApiProperty({ 
    example: '2025-10-23T00:00:00.000Z', 
    description: 'User creation timestamp' 
  })
  createdAt: string;

  @ApiProperty({ 
    example: '2025-10-23T00:00:00.000Z', 
    description: 'User last update timestamp' 
  })
  updatedAt: string;
}
