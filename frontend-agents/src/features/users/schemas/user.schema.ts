
import { z } from 'zod';
import { cpfValidation } from '../../../validations/cpf.validation';

export const userSchema = z.object({
    name: z
        .string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    cpf: cpfValidation,
    email: z
        .string()
        .email('Email inválido')
        .toLowerCase(),
    password: z
        .string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .max(100, 'Senha deve ter no máximo 100 caracteres')
        .optional()
        .or(z.literal('')),
    role: z.string()
        .min(1, 'Role é obrigatório')
        .refine((val) => val === 'admin' || val === 'user' || val === 'enterprise', {
            message: 'Role deve ser Admin, Usuário ou Empresa',
        }),
});

export type UserFormData = z.infer<typeof userSchema>;
