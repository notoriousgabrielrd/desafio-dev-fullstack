import { z } from 'zod';

export const formSchema = z.object({
  nomeCompleto: z.string().min(1, 'Nome completo é obrigatório.'),
  email: z.string().email('Email inválido.'),
  telefone: z.string().min(1, 'Telefone é obrigatório.'),
  file: z.instanceof(File, 'O arquivo é obrigatório.'),
});
