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
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create a new user',
        description: 'Create a new user with any role (admin only). Use this to create ADMIN users.'
    })
    @ApiResponse({ status: 201, description: 'User successfully created', type: UserResponseDto })
    @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid' })
    @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role' })
    @ApiResponse({ status: 409, description: 'Email already registered' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users', description: 'Retrieve a list of all users (admin only)' })
    @ApiResponse({ status: 200, description: 'List of users returned successfully', type: [UserResponseDto] })
    @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid' })
    @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role' })
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID', description: 'Retrieve a single user by their ID (admin only)' })
    @ApiResponse({ status: 200, description: 'User found and returned', type: UserResponseDto })
    @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid' })
    @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findById(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a user', description: 'Update user information including role (admin only)' })
    @ApiResponse({ status: 200, description: 'User successfully updated', type: UserResponseDto })
    @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid' })
    @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 409, description: 'Email already in use' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a user', description: 'Remove a user from the system (admin only)' })
    @ApiResponse({ status: 204, description: 'User successfully deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid' })
    @ApiResponse({ status: 403, description: 'Forbidden - Requires ADMIN role' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
