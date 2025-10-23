import api from './axios';
import type { LoginRequest, LoginResponse } from '../types/user';
import type { User } from '../types/user';

export const authService = {
    /**
     * Realiza login do usuário
     * @param credentials - Email e senha
     * @returns Token JWT e dados do usuário
     */
    login: async (credentials: LoginRequest): Promise<{ token: string; user: User }> => {
        const { data } = await api.post<LoginResponse>('/auth/login', credentials);

        const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));

        const user: User = {
            _id: tokenPayload.sub,
            name: tokenPayload.name,
            email: tokenPayload.email,
            role: tokenPayload.role,
            createdAt: tokenPayload.createdAt || new Date().toISOString(),
            updatedAt: tokenPayload.updatedAt || new Date().toISOString(),
        };

        return {
            token: data.access_token,
            user,
        };
    },
};
