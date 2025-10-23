import axios from './axios';
import { Agent, CreateAgentRequest, UpdateAgentRequest } from '../types/agent';

export const agentsService = {
    async getAll(): Promise<Agent[]> {
        const response = await axios.get('/agents');
        return response.data;
    },

    async getById(id: string): Promise<Agent> {
        const response = await axios.get(`/agents/${id}`);
        return response.data;
    },

    async create(data: CreateAgentRequest): Promise<Agent> {
        const response = await axios.post('/agents', data);
        return response.data;
    },

    async update(id: string, data: UpdateAgentRequest): Promise<Agent> {
        const response = await axios.patch(`/agents/${id}`, data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await axios.delete(`/agents/${id}`);
    },
};
