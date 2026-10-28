export type StatusAtendimento = 
  | 'agendado' 
  | 'confirmado' 
  | 'em_atendimento' 
  | 'concluido' 
  | 'no_show';

export type StatusFidelidade = 
  | 'vip' 
  | 'regular' 
  | 'em_risco' 
  | 'sumido';

export interface HistoricoCorte {
  id: string;
  data: string;
  servico: string;
  barbeiro: string;
  valor: number;
}

export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  foto?: string;
  cortePreferido: string;
  barbeiroPreferido: string;
  ultimaVisita: string;
  diasSemVir: number;
  fidelidade: StatusFidelidade;
  totalGasto: number;
  totalCortes: number;
  observacoes: string;
  historico: HistoricoCorte[];
}

export interface Atendimento {
  id: string;
  clienteId: string;
  clienteNome: string;
  clienteTelefone: string;
  barbeiroId: string;
  barbeiroNome: string;
  servicoId: string;
  servicoNome: string;
  data: string;
  horario: string;
  valor: number;
  status: StatusAtendimento;
  observacoes?: string;
}

export interface Barbeiro {
  id: string;
  nome: string;
  apelido: string;
  cadeira: string;
  foto: string;
  especialidade: string;
  cortesHoje: number;
  comissaoPercentual: number;
  comissaoHoje: number;
  status: 'disponivel' | 'em_corte' | 'pausa';
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracaoMinutos: number;
  categoria: 'Cabelo' | 'Barba' | 'Combo' | 'Tratamento';
}

export interface CampanhaWhatsApp {
  id: string;
  titulo: string;
  descricao: string;
  gatilho: string;
  destinatariosCount: number;
  templateMensagem: string;
  status: 'ativo' | 'pausado';
}
