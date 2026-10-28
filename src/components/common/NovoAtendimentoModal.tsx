import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useBarberCRM } from '../../context/BarberCRMContext';

export const NovoAtendimentoModal: React.FC = () => {
  const { 
    isNovoAtendimentoOpen, 
    setIsNovoAtendimentoOpen, 
    clientes, 
    barbeiros, 
    servicos, 
    addAtendimento 
  } = useBarberCRM();

  const [clienteId, setClienteId] = useState(clientes[0]?.id || '');
  const [barbeiroId, setBarbeiroId] = useState(barbeiros[0]?.id || '');
  const [servicoId, setServicoId] = useState(servicos[0]?.id || '');
  const [horario, setHorario] = useState('14:00');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [observacoes, setObservacoes] = useState('');

  if (!isNovoAtendimentoOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cliente = clientes.find(c => c.id === clienteId);
    const barbeiro = barbeiros.find(b => b.id === barbeiroId);
    const servico = servicos.find(s => s.id === servicoId);

    if (!cliente || !barbeiro || !servico) return;

    addAtendimento({
      clienteId: cliente.id,
      clienteNome: cliente.nome,
      clienteTelefone: cliente.telefone,
      barbeiroId: barbeiro.id,
      barbeiroNome: barbeiro.apelido,
      servicoId: servico.id,
      servicoNome: servico.nome,
      horario,
      data,
      valor: servico.preco,
      status: 'agendado',
      observacoes: observacoes || undefined,
    });

    setIsNovoAtendimentoOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-crm-surface border border-crm-border rounded-lg text-crm-text">
        
        {/* Header */}
        <div className="p-4 border-b border-crm-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-crm-text">Novo atendimento</h3>
          <button
            onClick={() => setIsNovoAtendimentoOpen(false)}
            className="p-1 rounded hover:bg-crm-secondary text-crm-muted hover:text-crm-text transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 text-xs">
          
          <div>
            <label className="block text-crm-muted mb-1 font-medium">Cliente</label>
            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
              required
            >
              {clientes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nome} ({c.telefone})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-crm-muted mb-1 font-medium">Barbeiro</label>
              <select
                value={barbeiroId}
                onChange={(e) => setBarbeiroId(e.target.value)}
                className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
                required
              >
                {barbeiros.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.apelido} ({b.cadeira})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-crm-muted mb-1 font-medium">Serviço</label>
              <select
                value={servicoId}
                onChange={(e) => setServicoId(e.target.value)}
                className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
                required
              >
                {servicos.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.nome} — R$ {s.preco.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-crm-muted mb-1 font-medium">Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
                required
              />
            </div>

            <div>
              <label className="block text-crm-muted mb-1 font-medium">Horário</label>
              <input
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-crm-muted mb-1 font-medium">Observações</label>
            <input
              type="text"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Preferências do corte..."
              className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
            />
          </div>

          <div className="pt-3 border-t border-crm-border flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNovoAtendimentoOpen(false)}
              className="px-3 py-1.5 rounded border border-crm-border hover:bg-crm-secondary text-crm-text text-xs transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-crm-accent text-crm-surface text-xs font-medium transition-colors"
            >
              Criar atendimento
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
