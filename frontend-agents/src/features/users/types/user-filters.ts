import { UserRole } from './user';

export interface UserFilters {
    search?: string;
    cpf?: string;
    role?: UserRole;
}