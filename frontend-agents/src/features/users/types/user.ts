export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  ENTERPRISE = 'enterprise',
}

export interface User {
  _id: string;
  name: string;
  cpf: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface CreateUserRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
