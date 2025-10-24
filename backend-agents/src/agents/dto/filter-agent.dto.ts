import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AgentStatus } from '../../common/enums/agent-status.enum';

export class FilterAgentDto {
    @ApiPropertyOptional({
        description: 'Search by name, email, position, or department',
        example: 'João',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter by agent status',
        enum: AgentStatus,
        example: AgentStatus.ACTIVE,
    })
    @IsOptional()
    @IsEnum(AgentStatus)
    status?: AgentStatus;

    @ApiPropertyOptional({
        description: 'Filter by department',
        example: 'TI',
    })
    @IsOptional()
    @IsString()
    department?: string;

    @ApiPropertyOptional({
        description: 'Filter by position',
        example: 'Desenvolvedor',
    })
    @IsOptional()
    @IsString()
    position?: string;
}
