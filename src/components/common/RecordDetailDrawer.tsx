import React from 'react';
import { 
  X, 
  ExternalLink, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Clock, 
  User, 
  Scissors, 
  DollarSign
} from 'lucide-react';
import { useBarberCRM } from '../../context/BarberCRMContext';
import { useNavigate } from 'react-router-dom';
import { StatusAtendimento } from '../../types';

export const RecordDetailDrawer: React.FC = () => {
  const { selectedRecord, setSelectedRecord, updateAtendimentoStatus, openWhatsApp } = useBarberCRM();
  const navigate = useNavigate();

  if (!selectedRecord) return null;

  const { type, data } = selectedRecord;
  const isAtendimento = type === 'atendimento';

  const handleStatusChange = (newStatus: StatusAtendimento) => {
    if (isAtendimento) {
      updateAtendimentoStatus(data.id, newStatus);
    }
  };

  const handleWhatsAppClick = () => {
    if (isAtendimento) {
      const msg = `Olá ${data.clienteNome}, confirmamos seu horário na Barbearia Dom Barba hoje às ${data.horario} para ${data.servicoNome} com ${data.barbeiroNome}.`;
      openWhatsApp(data.clienteTelefone, msg);
    } else {
      const msg = `Olá ${data.nome}, tudo bem? Notamos que já faz alguns dias desde seu último corte (${data.cortePreferido}). Gostaria de agendar um horário para esta semana?`;
      openWhatsApp(data.telefone, msg);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'concluido': return 'Concluído';
      case 'em_atendimento': return 'Na Cadeira';
      case 'confirmado': return 'Confirmado';
      case 'agendado': return 'Agendado';
      case 'no_show': return 'Não compareceu';
      default: return status;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.target === e.currentTarget && setSelectedRecord(null)}
      >
        <div className="w-screen max-w-md bg-crm-surface border-l border-crm-border flex flex-col text-crm-text">
          
          {/* Header */}
          <div className="p-4 border-b border-crm-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded border border-crm-border bg-crm-secondary flex items-center justify-center text-crm-muted">
                {isAtendimento ? <Scissors className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-[11px] text-crm-muted">
                  {isAtendimento ? 'Atendimento' : 'Cliente'}
                </div>
                <h2 className="text-sm font-semibold text-crm-text">
                  {isAtendimento ? data.clienteNome : data.nome}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setSelectedRecord(null);
                  if (isAtendimento) {
                    navigate('/atendimentos');
                  } else {
                    navigate(`/clientes/${data.id}`);
                  }
                }}
                title="Expandir para página inteira"
                className="p-1 rounded hover:bg-crm-secondary text-crm-muted hover:text-crm-text transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 rounded hover:bg-crm-secondary text-crm-muted hover:text-crm-text transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2.5 border-b border-crm-border bg-crm-ground flex items-center gap-2">
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 py-1.5 px-3 rounded border border-crm-border bg-crm-surface text-crm-text hover:bg-crm-secondary text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Mensagem WhatsApp
            </button>

            {isAtendimento && (
              <select
                value={data.status}
                onChange={(e) => handleStatusChange(e.target.value as StatusAtendimento)}
                className="bg-crm-surface border border-crm-border text-xs text-crm-text rounded px-2 py-1.5 focus:outline-none"
              >
                <option value="agendado">Agendado</option>
                <option value="confirmado">Confirmado</option>
                <option value="em_atendimento">Na Cadeira</option>
                <option value="concluido">Concluído</option>
                <option value="no_show">Não compareceu</option>
              </select>
            )}
          </div>

          {/* Properties Table */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
            
            <div>
              <div className="text-[11px] font-medium text-crm-muted mb-2">
                Propriedades
              </div>
              <div className="border border-crm-border rounded divide-y divide-crm-border bg-crm-surface">
                
                <div className="flex items-center px-3 py-2">
                  <span className="w-28 text-crm-muted">Status</span>
                  <span className="font-medium text-crm-text">
                    {isAtendimento ? getStatusLabel(data.status) : (data.fidelidade === 'vip' ? 'VIP' : 'Regular')}
                  </span>
                </div>

                <div className="flex items-center px-3 py-2">
                  <span className="w-28 text-crm-muted">Telefone</span>
                  <span className="text-crm-text tabular-nums">
                    {isAtendimento ? data.clienteTelefone : data.telefone}
                  </span>
                </div>

                <div className="flex items-center px-3 py-2">
                  <span className="w-28 text-crm-muted">Barbeiro</span>
                  <span className="text-crm-text">
                    {isAtendimento ? data.barbeiroNome : data.barbeiroPreferido}
                  </span>
                </div>

                <div className="flex items-center px-3 py-2">
                  <span className="w-28 text-crm-muted">Serviço</span>
                  <span className="text-crm-text">
                    {isAtendimento ? data.servicoNome : data.cortePreferido}
                  </span>
                </div>

                <div className="flex items-center px-3 py-2">
                  <span className="w-28 text-crm-muted">Valor</span>
                  <span className="text-crm-text font-medium tabular-nums">
                    R$ {isAtendimento ? data.valor?.toFixed(2) : data.totalGasto?.toFixed(2)}
                  </span>
                </div>

                {isAtendimento && (
                  <>
                    <div className="flex items-center px-3 py-2">
                      <span className="w-28 text-crm-muted">Data</span>
                      <span className="text-crm-text tabular-nums">{data.data}</span>
                    </div>

                    <div className="flex items-center px-3 py-2">
                      <span className="w-28 text-crm-muted">Horário</span>
                      <span className="text-crm-text tabular-nums">{data.horario}</span>
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* Notas */}
            <div>
              <div className="text-[11px] font-medium text-crm-muted mb-2">
                Observações
              </div>
              <div className="p-3 border border-crm-border rounded bg-crm-ground text-crm-text text-xs leading-relaxed">
                {data.observacoes || 'Nenhuma observação cadastrada.'}
              </div>
            </div>

            {/* Histórico */}
            {!isAtendimento && data.historico && data.historico.length > 0 && (
              <div>
                <div className="text-[11px] font-medium text-crm-muted mb-2">
                  Histórico de atendimentos
                </div>
                <div className="border border-crm-border rounded divide-y divide-crm-border bg-crm-surface">
                  {data.historico.map((h: any) => (
                    <div key={h.id} className="p-2.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-medium text-crm-text">{h.servico}</div>
                        <div className="text-[11px] text-crm-muted">{h.barbeiro} • {h.data}</div>
                      </div>
                      <div className="font-medium text-crm-text tabular-nums">
                        R$ {h.valor.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-3 border-t border-crm-border bg-crm-ground text-right text-[11px] text-crm-muted">
            ID: {data.id}
          </div>

        </div>
      </div>
    </div>
  );
};
