import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus
} from 'lucide-react';
import { useBarberCRM } from '../context/BarberCRMContext';

export const ClientesPage: React.FC = () => {
  const { 
    clientes, 
    setSelectedRecord, 
    setIsNovoClienteOpen,
    openWhatsApp 
  } = useBarberCRM();

  const [search, setSearch] = useState('');
  const [filterFidelidade, setFilterFidelidade] = useState<string>('todos');

  const filtered = clientes.filter(c => {
    const matchesSearch = c.nome.toLowerCase().includes(search.toLowerCase()) ||
                          c.telefone.includes(search) ||
                          c.cortePreferido.toLowerCase().includes(search.toLowerCase());
    const matchesFidelidade = filterFidelidade === 'todos' || c.fidelidade === filterFidelidade;
    return matchesSearch && matchesFidelidade;
  });

  const totalGastoAcumulado = clientes.reduce((acc, curr) => acc + curr.totalGasto, 0);

  return (
    <div className="space-y-4 max-w-7xl mx-auto text-crm-text">
      
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-crm-border">
        
        <div>
          <h1 className="text-sm font-semibold text-crm-text">Clientes</h1>
          <p className="text-xs text-crm-muted tabular-nums">
            {filtered.length} clientes · R$ {totalGastoAcumulado.toFixed(2)} em faturamento acumulado
          </p>
        </div>

        <div className="flex items-center gap-2">
          
          <select
            value={filterFidelidade}
            onChange={(e) => setFilterFidelidade(e.target.value)}
            className="bg-crm-surface border border-crm-border rounded px-2.5 py-1 text-xs text-crm-text focus:outline-none"
          >
            <option value="todos">Todos os Clientes</option>
            <option value="vip">Clientes VIP</option>
            <option value="regular">Clientes Regulares</option>
            <option value="em_risco">Em Risco (15 a 20 dias)</option>
            <option value="sumido">Inativos (+20 dias)</option>
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
            onClick={() => setIsNovoClienteOpen(true)}
            className="px-2.5 py-1 rounded bg-crm-accent text-crm-surface text-xs font-medium flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Novo cliente
          </button>

        </div>

      </div>

      {/* Clientes Table */}
      <div className="border border-crm-border rounded bg-crm-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-crm-border bg-crm-ground text-crm-muted font-medium text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Cliente</th>
                <th className="py-2.5 px-3">Telefone</th>
                <th className="py-2.5 px-3">Corte preferido</th>
                <th className="py-2.5 px-3">Barbeiro</th>
                <th className="py-2.5 px-3">Última visita</th>
                <th className="py-2.5 px-3">Segmento</th>
                <th className="py-2.5 px-3 text-right">Total gasto</th>
                <th className="py-2.5 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-crm-border">
              {filtered.map(cli => {
                const isSumido = cli.diasSemVir > 20;

                return (
                  <tr
                    key={cli.id}
                    onClick={() => setSelectedRecord({ type: 'cliente', data: cli })}
                    className="hover:bg-crm-secondary transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 px-3 font-medium text-crm-text">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-crm-secondary border border-crm-border flex items-center justify-center text-[10px] font-medium text-crm-text">
                          {cli.nome.charAt(0)}
                        </div>
                        <span>{cli.nome}</span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 text-crm-muted tabular-nums">
                      {cli.telefone}
                    </td>

                    <td className="py-2.5 px-3 text-crm-text">
                      {cli.cortePreferido}
                    </td>

                    <td className="py-2.5 px-3 text-crm-muted">
                      {cli.barbeiroPreferido}
                    </td>

                    <td className="py-2.5 px-3 tabular-nums">
                      <span className={isSumido ? 'text-crm-text font-medium' : 'text-crm-muted'}>
                        {cli.ultimaVisita}
                      </span>
                      {cli.diasSemVir > 0 && (
                        <span className="text-crm-muted text-[10px] ml-1">
                          ({cli.diasSemVir}d)
                        </span>
                      )}
                    </td>

                    <td className="py-2.5 px-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium border border-crm-border bg-crm-ground text-crm-text">
                        {cli.fidelidade === 'vip' ? 'VIP' : cli.fidelidade === 'sumido' ? 'Inativo' : cli.fidelidade === 'em_risco' ? 'Em risco' : 'Regular'}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-right font-medium text-crm-text tabular-nums">
                      R$ {cli.totalGasto.toFixed(2)}
                    </td>

                    <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          const msg = isSumido 
                            ? `Olá ${cli.nome}, faz ${cli.diasSemVir} dias desde seu último corte. Gostaria de agendar esta semana na Barbearia Dom Barba?`
                            : `Olá ${cli.nome}, tudo certo? Estamos à disposição para seu próximo atendimento na Barbearia Dom Barba.`;
                          openWhatsApp(cli.telefone, msg);
                        }}
                        className="text-xs text-crm-muted hover:text-crm-text underline"
                      >
                        Mensagem
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
