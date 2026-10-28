import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageSquare, 
  Scissors 
} from 'lucide-react';
import { useBarberCRM } from '../context/BarberCRMContext';

export const ClienteDetalhesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { clientes, atendimentos, openWhatsApp, setIsNovoAtendimentoOpen } = useBarberCRM();

  const cliente = clientes.find(c => c.id === id);

  if (!cliente) {
    return (
      <div className="p-8 text-center text-crm-muted text-xs">
        <p>Cliente não encontrado.</p>
        <button 
          onClick={() => navigate('/clientes')}
          className="mt-3 px-3 py-1.5 border border-crm-border text-crm-text rounded text-xs"
        >
          Voltar para clientes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-5xl mx-auto text-crm-text">
      
      {/* Back button */}
      <button
        onClick={() => navigate('/clientes')}
        className="flex items-center gap-1.5 text-xs text-crm-muted hover:text-crm-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Voltar para a lista de clientes
      </button>

      {/* Record Header */}
      <div className="border border-crm-border rounded bg-crm-surface p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-crm-secondary border border-crm-border flex items-center justify-center text-base font-semibold text-crm-text">
              {cliente.nome.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-crm-text">{cliente.nome}</h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-medium border border-crm-border bg-crm-ground text-crm-text">
                  {cliente.fidelidade === 'vip' ? 'Cliente VIP' : 'Cliente Regular'}
                </span>
              </div>
              <div className="text-xs text-crm-muted mt-0.5 tabular-nums">
                {cliente.telefone} {cliente.email && `· ${cliente.email}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const msg = `Olá ${cliente.nome}, confirmamos seu horário na Barbearia Dom Barba com ${cliente.barbeiroPreferido}.`;
                openWhatsApp(cliente.telefone, msg);
              }}
              className="px-3 py-1.5 rounded border border-crm-border hover:bg-crm-secondary text-crm-text text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </button>

            <button
              onClick={() => setIsNovoAtendimentoOpen(true)}
              className="px-3 py-1.5 rounded bg-crm-accent text-crm-surface text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Scissors className="w-3.5 h-3.5" />
              Agendar atendimento
            </button>
          </div>
        </div>

        {/* Property Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-crm-border text-xs">
          <div>
            <span className="text-crm-muted block text-[11px]">Total faturado</span>
            <span className="font-semibold text-crm-text tabular-nums">R$ {cliente.totalGasto.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-crm-muted block text-[11px]">Total de cortes</span>
            <span className="font-semibold text-crm-text tabular-nums">{cliente.totalCortes}</span>
          </div>
          <div>
            <span className="text-crm-muted block text-[11px]">Barbeiro preferido</span>
            <span className="font-semibold text-crm-text">{cliente.barbeiroPreferido}</span>
          </div>
          <div>
            <span className="text-crm-muted block text-[11px]">Última visita</span>
            <span className="font-semibold text-crm-text tabular-nums">{cliente.ultimaVisita}</span>
          </div>
        </div>
      </div>

      {/* Grid: Preferências e Histórico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Left: Preferências */}
        <div className="border border-crm-border rounded bg-crm-surface p-4 space-y-3">
          <h2 className="text-xs font-semibold text-crm-text">Preferências</h2>
          
          <div className="border border-crm-border rounded p-2.5 bg-crm-ground text-xs">
            <span className="text-crm-muted text-[11px] block">Corte preferido</span>
            <span className="font-medium text-crm-text">{cliente.cortePreferido}</span>
          </div>

          <div className="border border-crm-border rounded p-2.5 bg-crm-ground text-xs">
            <span className="text-crm-muted text-[11px] block">Observações do cliente</span>
            <p className="text-crm-text mt-0.5 leading-relaxed">
              {cliente.observacoes || 'Nenhuma observação especial.'}
            </p>
          </div>
        </div>

        {/* Right: Histórico */}
        <div className="md:col-span-2 border border-crm-border rounded bg-crm-surface p-4">
          <h2 className="text-xs font-semibold text-crm-text mb-3">Histórico de atendimentos</h2>

          <div className="border border-crm-border rounded divide-y divide-crm-border">
            {cliente.historico.map(h => (
              <div key={h.id} className="p-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-crm-text">{h.servico}</div>
                  <div className="text-crm-muted text-[11px]">Atendido por {h.barbeiro} em {h.data}</div>
                </div>
                <div className="font-medium text-crm-text tabular-nums">
                  R$ {h.valor.toFixed(2)}
                </div>
              </div>
            ))}

            {cliente.historico.length === 0 && (
              <div className="p-6 text-center text-xs text-crm-muted">
                Nenhum atendimento anterior registrado.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
