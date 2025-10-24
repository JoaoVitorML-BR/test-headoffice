import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { FilterAgentDto } from './dto/filter-agent.dto';
import { AgentResponseDto } from './dto/agent-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Agents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) { }

  @Post()
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new agent', description: 'Create a new agent (admin only)' })
  @ApiResponse({ status: 201, description: 'Agent successfully created', type: AgentResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all agents', description: 'Retrieve a list of all agents with optional filters' })
  @ApiResponse({ status: 200, description: 'List of agents returned successfully', type: [AgentResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid' })
  findAll(@Query() filterDto: FilterAgentDto) {
    return this.agentsService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get agent by ID', description: 'Retrieve a single agent by their ID' })
  @ApiResponse({ status: 200, description: 'Agent found and returned', type: AgentResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid' })
  @ApiResponse({ status: 404, description: 'Agent not found' })
  findById(@Param('id') id: string) {
    return this.agentsService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update an agent', description: 'Update agent information (admin only)' })
  @ApiResponse({ status: 200, description: 'Agent successfully updated', type: AgentResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role' })
  @ApiResponse({ status: 404, description: 'Agent not found' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentsService.update(id, updateAgentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an agent', description: 'Remove an agent from the system (admin only)' })
  @ApiResponse({ status: 204, description: 'Agent successfully deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role' })
  @ApiResponse({ status: 404, description: 'Agent not found' })
  remove(@Param('id') id: string) {
    return this.agentsService.remove(id);
  }
}
