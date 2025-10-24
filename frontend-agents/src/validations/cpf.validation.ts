import { z } from 'zod';
import { isValidCPF, cleanCPF } from '../utils/cpf.validator';

export const cpfValidation = z
  .string()
  .min(1, 'CPF é obrigatório')
  .transform(cleanCPF)
  .refine(
    (cpf) => cpf.length === 11,
    'CPF deve ter 11 dígitos'
  )
  .refine(
    (cpf) => isValidCPF(cpf),
    'CPF inválido'
  );
