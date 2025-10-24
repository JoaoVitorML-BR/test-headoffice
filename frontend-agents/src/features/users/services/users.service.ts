import api from '../../../api/axios';
import { User, CreateUserRequest, UpdateUserRequest } from '../types/user';

export const usersService = {
    async getAll(): Promise<User[]> {
        const { data } = await api.get('/users');
        return data;
    },

    async getById(id: string): Promise<User> {
        const { data } = await api.get(`/users/${id}`);
        return data;
    },

    async create(userData: CreateUserRequest): Promise<User> {
        const { data} = await api.post('/users', userData);
        return data;
    },

    async update(id: string, userData: UpdateUserRequest): Promise<User> {
        const { data } = await api.patch(`/users/${id}`, userData);
        return data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/users/${id}`);
    },
};
