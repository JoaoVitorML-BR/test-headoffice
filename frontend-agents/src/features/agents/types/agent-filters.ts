import { AgentStatus } from './agent';

export interface AgentFilters {
    search?: string;
    cpf?: string;
    status?: AgentStatus;
    department?: string;
    position?: string;
}