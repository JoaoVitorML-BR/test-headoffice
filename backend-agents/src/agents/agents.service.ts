import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent, AgentDocument } from './schemas/agent.schema';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { FilterAgentDto } from './dto/filter-agent.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(Agent.name) private agentModel: Model<AgentDocument>,
  ) { }

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const existing = await this.agentModel
      .findOne({ email: createAgentDto.email.toLowerCase?.() ?? createAgentDto.email })
      .lean()
      .exec();
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    try {
      const createdAgent = new this.agentModel(createAgentDto);
      return await createdAgent.save();
    } catch (err: any) {
      if (err?.code === 11000 && err?.keyPattern?.email) {
        throw new ConflictException('Email already in use');
      }
      throw err;
    }
  }

  async findAll(filterDto?: FilterAgentDto): Promise<Agent[]> {
    const filter: any = {};

    if (filterDto?.status) {
      filter.status = filterDto.status;
    }

    if (filterDto?.department) {
      filter.department = { $regex: new RegExp(filterDto.department, 'i') };
    }

    if (filterDto?.position) {
      filter.position = { $regex: new RegExp(filterDto.position, 'i') };
    }

    if (filterDto?.search) {
      filter.$or = [
        { name: { $regex: new RegExp(filterDto.search, 'i') } },
        { email: { $regex: new RegExp(filterDto.search, 'i') } },
        { position: { $regex: new RegExp(filterDto.search, 'i') } },
        { department: { $regex: new RegExp(filterDto.search, 'i') } },
      ];
    }

    return this.agentModel.find(filter).exec();
  }

  async findById(id: string): Promise<Agent> {
    const agent = await this.agentModel.findById(id).exec();
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }
    return agent;
  }

  async update(id: string, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    if (updateAgentDto.email) {
      const emailLower = updateAgentDto.email.toLowerCase?.() ?? updateAgentDto.email;
      const exists = await this.agentModel
        .findOne({ email: emailLower, _id: { $ne: id } })
        .lean()
        .exec();
      if (exists) {
        throw new ConflictException('Email already in use');
      }
      (updateAgentDto as any).email = emailLower;
    }

    let updatedAgent: Agent | null = null;
    try {
      updatedAgent = await this.agentModel
        .findByIdAndUpdate(id, updateAgentDto, { new: true, runValidators: true, context: 'query' })
        .exec();
    } catch (err: any) {
      if (err?.code === 11000 && err?.keyPattern?.email) {
        throw new ConflictException('Email already in use');
      }
      throw err;
    }

    if (!updatedAgent) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }

    return updatedAgent;
  }

  async remove(id: string): Promise<void> {
    const result = await this.agentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }
  }
}
