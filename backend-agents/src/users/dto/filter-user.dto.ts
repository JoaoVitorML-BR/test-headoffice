import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/user-role.enum';

export class FilterUserDto {
    @ApiPropertyOptional({
        description: 'Search by name or email',
        example: 'João',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter by CPF (partial or complete, without formatting)',
        example: '12345678900',
    })
    @IsOptional()
    @IsString()
    cpf?: string;

    @ApiPropertyOptional({
        description: 'Filter by user role',
        enum: UserRole,
        example: UserRole.USER,
    })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}