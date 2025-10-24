import axios from '../../../api/axios';
import { Agent, CreateAgentRequest, UpdateAgentRequest, AgentStatus } from '../types/agent';

export interface AgentFilters {
    search?: string;
    status?: AgentStatus;
    department?: string;
    position?: string;
}

export const agentsService = {
    async getAll(filters?: AgentFilters): Promise<Agent[]> {
        const params = new URLSearchParams();
        
        if (filters?.search) params.append('search', filters.search);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.department) params.append('department', filters.department);
        if (filters?.position) params.append('position', filters.position);

        const response = await axios.get(`/agents${params.toString() ? `?${params.toString()}` : ''}`);
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
