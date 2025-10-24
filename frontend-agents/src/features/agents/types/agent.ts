
export enum AgentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: AgentStatus;
  hireDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgentRequest {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: AgentStatus; // 'active' | 'inactive'
  hireDate?: string;
}

export interface UpdateAgentRequest {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  department?: string;
  status?: AgentStatus; // 'active' | 'inactive'
  hireDate?: string;
}
