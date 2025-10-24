
import { z } from 'zod';
import { cpfValidation } from '../../../validations/cpf.validation';

const brazilPhoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;

export const agentSchema = z.object({
    name: z
        .string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    cpf: cpfValidation,
    email: z
        .string()
        .email('Email inválido')
        .toLowerCase(),
    phone: z
        .string()
        .regex(brazilPhoneRegex, 'Telefone deve ser válido e no formato brasileiro'),
    position: z
        .string()
        .min(2, 'Cargo deve ter no mínimo 2 caracteres')
        .max(100, 'Cargo deve ter no máximo 100 caracteres'),
    department: z
        .string()
        .min(2, 'Departamento deve ter no mínimo 2 caracteres')
        .max(100, 'Departamento deve ter no máximo 100 caracteres'),
    status: z.string()
        .min(1, 'Status é obrigatório')
        .refine((val) => val === 'active' || val === 'inactive', {
            message: 'Status deve ser Ativo ou Inativo',
        }),
    hireDate: z.string().optional(),
});

export type AgentFormData = z.infer<typeof agentSchema>;
