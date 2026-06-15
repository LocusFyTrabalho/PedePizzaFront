
import api from '../api';

export interface NovoFuncionario {
  id: null;
  name: string;
  email: string;
  salary: number;
  workedHours: null;
}

export interface NovoAcesso {
  login: string;
  password: string;
  role: string; 
}

export async function criarFuncionario(dados: Omit<NovoFuncionario, 'id' | 'workedHours'>) {
  const response = await api.post('/employee', { id: null, ...dados, workedHours: null });
  return response.data;
}

export async function criarAcesso(dados: NovoAcesso) {
  const response = await api.post('/auth/register', dados);
  return response.data;
}