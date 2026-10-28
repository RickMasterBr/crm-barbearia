import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Cliente, 
  Atendimento, 
  Barbeiro, 
  Servico, 
  CampanhaWhatsApp, 
  StatusAtendimento 
} from '../types';
import { 
  INITIAL_CLIENTES, 
  INITIAL_ATENDIMENTOS, 
  INITIAL_BARBEIROS, 
  INITIAL_SERVICOS, 
  INITIAL_CAMPANHAS 
} from '../data/mockData';

interface DrawerRecord {
  type: 'atendimento' | 'cliente';
  data: any;
}

interface BarberCRMContextType {
  clientes: Cliente[];
  atendimentos: Atendimento[];
  barbeiros: Barbeiro[];
  servicos: Servico[];
  campanhas: CampanhaWhatsApp[];
  isDarkMode: boolean;
  toggleTheme: () => void;
  selectedRecord: DrawerRecord | null;
  setSelectedRecord: (record: DrawerRecord | null) => void;
  isNovoAtendimentoOpen: boolean;
  setIsNovoAtendimentoOpen: (open: boolean) => void;
  isNovoClienteOpen: boolean;
  setIsNovoClienteOpen: (open: boolean) => void;
  addAtendimento: (novo: Omit<Atendimento, 'id'>) => void;
  updateAtendimentoStatus: (id: string, status: StatusAtendimento) => void;
  addCliente: (novo: Partial<Cliente> & { nome: string; telefone: string }) => void;
  addServico: (novo: Omit<Servico, 'id'>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  openWhatsApp: (telefone: string, mensagem: string) => void;
}

const BarberCRMContext = createContext<BarberCRMContextType | undefined>(undefined);

export const BarberCRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    const saved = localStorage.getItem('barber_crm_clientes');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTES;
  });

  const [atendimentos, setAtendimentos] = useState<Atendimento[]>(() => {
    const saved = localStorage.getItem('barber_crm_atendimentos');
    return saved ? JSON.parse(saved) : INITIAL_ATENDIMENTOS;
  });

  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>(() => {
    const saved = localStorage.getItem('barber_crm_barbeiros');
    return saved ? JSON.parse(saved) : INITIAL_BARBEIROS;
  });

  const [servicos, setServicos] = useState<Servico[]>(() => {
    const saved = localStorage.getItem('barber_crm_servicos');
    return saved ? JSON.parse(saved) : INITIAL_SERVICOS;
  });

  const [campanhas, setCampanhas] = useState<CampanhaWhatsApp[]>(() => {
    const saved = localStorage.getItem('barber_crm_campanhas');
    return saved ? JSON.parse(saved) : INITIAL_CAMPANHAS;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DrawerRecord | null>(null);
  const [isNovoAtendimentoOpen, setIsNovoAtendimentoOpen] = useState(false);
  const [isNovoClienteOpen, setIsNovoClienteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('barber_crm_clientes', JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    localStorage.setItem('barber_crm_atendimentos', JSON.stringify(atendimentos));
  }, [atendimentos]);

  useEffect(() => {
    localStorage.setItem('barber_crm_barbeiros', JSON.stringify(barbeiros));
  }, [barbeiros]);

  useEffect(() => {
    localStorage.setItem('barber_crm_servicos', JSON.stringify(servicos));
  }, [servicos]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const addAtendimento = (novo: Omit<Atendimento, 'id'>) => {
    const id = `atend-${Date.now()}`;
    const item: Atendimento = { ...novo, id };
    setAtendimentos(prev => [item, ...prev]);
    showToast(`Atendimento de ${novo.clienteNome} criado.`);
  };

  const updateAtendimentoStatus = (id: string, status: StatusAtendimento) => {
    setAtendimentos(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
    showToast(`Status atualizado para ${status.replace('_', ' ')}.`);
    
    if (selectedRecord && selectedRecord.type === 'atendimento' && selectedRecord.data.id === id) {
      setSelectedRecord({
        ...selectedRecord,
        data: { ...selectedRecord.data, status }
      });
    }
  };

  const addCliente = (novo: Partial<Cliente> & { nome: string; telefone: string }) => {
    const id = `cli-${Date.now()}`;
    const novoCli: Cliente = {
      id,
      nome: novo.nome,
      telefone: novo.telefone,
      email: novo.email || '',
      cortePreferido: novo.cortePreferido || 'Degradê Navalhado',
      barbeiroPreferido: novo.barbeiroPreferido || 'Beto Navalha',
      ultimaVisita: 'Hoje',
      diasSemVir: 0,
      fidelidade: 'novo' as any,
      totalGasto: 0,
      totalCortes: 0,
      observacoes: novo.observacoes || '',
      historico: [],
    };
    setClientes(prev => [novoCli, ...prev]);
    showToast(`Cliente ${novo.nome} adicionado.`);
  };

  const addServico = (novo: Omit<Servico, 'id'>) => {
    const id = `serv-${Date.now()}`;
    setServicos(prev => [...prev, { ...novo, id }]);
    showToast(`Serviço ${novo.nome} adicionado.`);
  };

  const openWhatsApp = (telefone: string, mensagem: string) => {
    const limpo = telefone.replace(/\D/g, '');
    const num = limpo.startsWith('55') ? limpo : `55${limpo}`;
    const url = `https://wa.me/${num}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    showToast('Conversa aberta no WhatsApp.');
  };

  return (
    <BarberCRMContext.Provider
      value={{
        clientes,
        atendimentos,
        barbeiros,
        servicos,
        campanhas,
        isDarkMode,
        toggleTheme,
        selectedRecord,
        setSelectedRecord,
        isNovoAtendimentoOpen,
        setIsNovoAtendimentoOpen,
        isNovoClienteOpen,
        setIsNovoClienteOpen,
        addAtendimento,
        updateAtendimentoStatus,
        addCliente,
        addServico,
        toastMessage,
        showToast,
        openWhatsApp,
      }}
    >
      {children}
    </BarberCRMContext.Provider>
  );
};

export const useBarberCRM = () => {
  const context = useContext(BarberCRMContext);
  if (!context) {
    throw new Error('useBarberCRM deve ser usado dentro de um BarberCRMProvider');
  }
  return context;
};
