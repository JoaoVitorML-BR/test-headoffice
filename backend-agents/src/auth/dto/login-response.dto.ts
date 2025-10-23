import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ 
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzE4ZDM5MGVmNWQyMzAwMTJhYmNkZWYiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzI5NjM2ODAwLCJleHAiOjE3Mjk2NDA0MDB9.signature', 
    description: 'JWT access token (use in Authorization: Bearer <token> header)' 
  })
  access_token: string;
}
