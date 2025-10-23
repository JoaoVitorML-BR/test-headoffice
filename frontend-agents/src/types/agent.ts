export enum AgentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
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
  status: AgentStatus;
  hireDate: string;
}

export interface UpdateAgentRequest {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  department?: string;
  status?: AgentStatus;
  hireDate?: string;
}
