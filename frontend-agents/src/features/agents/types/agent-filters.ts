import { AgentStatus } from './agent';

export interface AgentFilters {
    search?: string;
    status?: AgentStatus;
    department?: string;
    position?: string;
}