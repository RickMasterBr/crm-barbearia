import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Table as TableIcon, 
  Search, 
  Plus 
} from 'lucide-react';
import { useBarberCRM } from '../context/BarberCRMContext';
import { StatusAtendimento } from '../types';

export const AtendimentosPage: React.FC = () => {
  const { 
    atendimentos, 
    barbeiros, 
    setSelectedRecord, 
    setIsNovoAtendimentoOpen,
    updateAtendimentoStatus,
    openWhatsApp 
  } = useBarberCRM();

  const [viewType, setViewType] = useState<'kanban' | 'table'>('kanban');
  const [filterBarbeiro, setFilterBarbeiro] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filtered = atendimentos.filter(a => {
    const matchesBarbeiro = filterBarbeiro === 'todos' || a.barbeiroId === filterBarbeiro;
    const matchesSearch = a.clienteNome.toLowerCase().includes(search.toLowerCase()) ||
                          a.servicoNome.toLowerCase().includes(search.toLowerCase());
    return matchesBarbeiro && matchesSearch;
  });

  const COLUNAS_KANBAN: { id: StatusAtendimento; title: string }[] = [
    { id: 'agendado', title: 'Agendado' },
    { id: 'confirmado', title: 'Confirmado' },
    { id: 'em_atendimento', title: 'Na Cadeira' },
    { id: 'concluido', title: 'Concluído' },
    { id: 'no_show', title: 'Não compareceu' },
  ];

  const totalValor = filtered.reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <div className="space-y-4 max-w-7xl mx-auto text-crm-text">
      
      {/* Title */}
      <div>
        <h1 className="text-lg font-semibold text-crm-text">Atendimentos</h1>
        <p className="text-xs text-crm-muted">Pipeline de agendamentos e controle da grade de horários da barbearia.</p>
      </div>

      {/* Twenty CRM Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-crm-border">
        
        {/* Left: View Tabs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 border border-crm-border rounded p-0.5 bg-crm-surface">
            <button
              onClick={() => setViewType('kanban')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                viewType === 'kanban'
                  ? 'bg-crm-secondary text-crm-text font-medium'
                  : 'text-crm-muted hover:text-crm-text'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Kanban
            </button>
            <button
              onClick={() => setViewType('table')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                viewType === 'table'
                  ? 'bg-crm-secondary text-crm-text font-medium'
                  : 'text-crm-muted hover:text-crm-text'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              Tabela
            </button>
          </div>

          <div className="text-xs text-crm-muted tabular-nums">
            {filtered.length} atendimentos · R$ {totalValor.toFixed(2)}
          </div>
        </div>

        {/* Right: Filter & Search */}
        <div className="flex items-center gap-2">
          
          <select
            value={filterBarbeiro}
            onChange={(e) => setFilterBarbeiro(e.target.value)}
            className="bg-crm-surface border border-crm-border rounded px-2.5 py-1 text-xs text-crm-text focus:outline-none"
          >
            <option value="todos">Todos os Barbeiros</option>
            {barbeiros.map(b => (
              <option key={b.id} value={b.id}>{b.apelido}</option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-crm-muted" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-crm-surface border border-crm-border rounded pl-8 pr-3 py-1 text-xs text-crm-text placeholder-crm-muted focus:outline-none w-48"
            />
          </div>

          <button
            onClick={() => setIsNovoAtendimentoOpen(true)}
            className="px-2.5 py-1 rounded bg-crm-accent text-crm-surface text-xs font-medium flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Agendar
          </button>

        </div>

      </div>

      {/* VIEW: KANBAN BOARD */}
      {viewType === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 items-start">
          {COLUNAS_KANBAN.map(col => {
            const itensCol = filtered.filter(a => a.status === col.id);
            const totalCol = itensCol.reduce((acc, curr) => acc + curr.valor, 0);

            return (
              <div 
                key={col.id} 
                className="bg-crm-surface border border-crm-border rounded flex flex-col"
              >
                {/* Column Header */}
                <div className="p-3 border-b border-crm-border flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-crm-text">{col.title}</span>
                    <span className="text-[11px] text-crm-muted tabular-nums bg-crm-secondary px-1.5 py-0.5 rounded">
                      {itensCol.length}
                    </span>
                  </div>
                  <span className="text-[11px] text-crm-muted tabular-nums">
                    R$ {totalCol.toFixed(2)}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="p-2 space-y-2">
                  {itensCol.map(atend => (
                    <div
                      key={atend.id}
                      onClick={() => setSelectedRecord({ type: 'atendimento', data: atend })}
                      className="p-3 rounded border border-crm-border bg-crm-surface hover:bg-crm-secondary transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between text-xs mb-1">
                        <span className="font-medium text-crm-text truncate flex-1 mr-2">
                          {atend.clienteNome}
                        </span>
                        <span className="text-crm-text font-medium tabular-nums whitespace-nowrap">
                          R$ {atend.valor.toFixed(2)}
                        </span>
                      </div>

                      <div className="text-[11px] text-crm-muted mb-2">
                        {atend.servicoNome}
                      </div>

                      <div className="pt-2 border-t border-crm-border flex items-center justify-between text-[11px] text-crm-muted">
                        <span>{atend.barbeiroNome}</span>
                        <span className="tabular-nums font-medium text-crm-text">{atend.horario}</span>
                      </div>

                      {/* Quick Move Trigger */}
                      <div className="mt-2 pt-2 border-t border-crm-border flex justify-between gap-1 text-[11px]" onClick={(e) => e.stopPropagation()}>
                        {col.id === 'agendado' && (
                          <button
                            onClick={() => updateAtendimentoStatus(atend.id, 'confirmado')}
                            className="w-full py-0.5 rounded border border-crm-border hover:bg-crm-ground text-crm-text"
                          >
                            Confirmar
                          </button>
                        )}
                        {col.id === 'confirmado' && (
                          <button
                            onClick={() => updateAtendimentoStatus(atend.id, 'em_atendimento')}
                            className="w-full py-0.5 rounded border border-crm-border hover:bg-crm-ground text-crm-text"
                          >
                            Iniciar
                          </button>
                        )}
                        {col.id === 'em_atendimento' && (
                          <button
                            onClick={() => updateAtendimentoStatus(atend.id, 'concluido')}
                            className="w-full py-0.5 rounded border border-crm-border hover:bg-crm-ground text-crm-text"
                          >
                            Finalizar
                          </button>
                        )}
                      </div>

                    </div>
                  ))}

                  {itensCol.length === 0 && (
                    <div className="py-4 text-center text-xs text-crm-muted">
                      Vazio
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* VIEW: DATA TABLE */}
      {viewType === 'table' && (
        <div className="border border-crm-border rounded bg-crm-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-crm-border bg-crm-ground text-crm-muted font-medium text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Horário</th>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Telefone</th>
                  <th className="py-2.5 px-3">Serviço</th>
                  <th className="py-2.5 px-3">Barbeiro</th>
                  <th className="py-2.5 px-3 text-right">Valor</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-crm-border">
                {filtered.map(atend => (
                  <tr
                    key={atend.id}
                    onClick={() => setSelectedRecord({ type: 'atendimento', data: atend })}
                    className="hover:bg-crm-secondary transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-3 font-medium text-crm-text tabular-nums">
                      {atend.horario}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-crm-text">
                      {atend.clienteNome}
                    </td>
                    <td className="py-2.5 px-3 text-crm-muted tabular-nums">
                      {atend.clienteTelefone}
                    </td>
                    <td className="py-2.5 px-3 text-crm-text">
                      {atend.servicoNome}
                    </td>
                    <td className="py-2.5 px-3 text-crm-muted">
                      {atend.barbeiroNome}
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium text-crm-text tabular-nums">
                      R$ {atend.valor.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium border border-crm-border bg-crm-ground text-crm-text">
                        {atend.status === 'concluido' ? 'Concluído' : atend.status === 'em_atendimento' ? 'Na Cadeira' : atend.status === 'confirmado' ? 'Confirmado' : atend.status === 'no_show' ? 'Faltou' : 'Agendado'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          const msg = `Olá ${atend.clienteNome}, confirmamos seu horário hoje às ${atend.horario} na Barbearia Dom Barba.`;
                          openWhatsApp(atend.clienteTelefone, msg);
                        }}
                        className="text-xs text-crm-muted hover:text-crm-text underline"
                      >
                        WhatsApp
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
