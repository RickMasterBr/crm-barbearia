import React from 'react';
import { useBarberCRM } from '../context/BarberCRMContext';

export const ProfissionaisPage: React.FC = () => {
  const { barbeiros, atendimentos } = useBarberCRM();

  const totalComissaoGeral = barbeiros.reduce((acc, curr) => acc + curr.comissaoHoje, 0);
  const totalCortesGeral = barbeiros.reduce((acc, curr) => acc + curr.cortesHoje, 0);

  return (
    <div className="space-y-5 max-w-6xl mx-auto text-crm-text">
      
      {/* Header */}
      <div>
        <h1 className="text-sm font-semibold text-crm-text">Barbeiros e Cadeiras</h1>
        <p className="text-xs text-crm-muted">Escala de atendimento e controle de comissões da equipe.</p>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 border border-crm-border rounded bg-crm-surface">
          <div className="text-xs text-crm-muted font-medium">Cadeiras ativas</div>
          <div className="text-xl font-semibold text-crm-text mt-1 tabular-nums">
            {barbeiros.length} barbeiros
          </div>
          <div className="text-[11px] text-crm-muted mt-0.5">Escala completa</div>
        </div>

        <div className="p-4 border border-crm-border rounded bg-crm-surface">
          <div className="text-xs text-crm-muted font-medium">Comissões acumuladas hoje</div>
          <div className="text-xl font-semibold text-crm-text mt-1 tabular-nums">
            R$ {totalComissaoGeral.toFixed(2)}
          </div>
          <div className="text-[11px] text-crm-muted mt-0.5">Média de R$ {(totalComissaoGeral / (barbeiros.length || 1)).toFixed(2)} por cadeira</div>
        </div>

        <div className="p-4 border border-crm-border rounded bg-crm-surface">
          <div className="text-xs text-crm-muted font-medium">Atendimentos realizados hoje</div>
          <div className="text-xl font-semibold text-crm-text mt-1 tabular-nums">
            {totalCortesGeral} cortes
          </div>
          <div className="text-[11px] text-crm-muted mt-0.5">Média de 35 min por cliente</div>
        </div>
      </div>

      {/* Grid de Barbeiros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {barbeiros.map((barb) => {
          const cortesDoBarbeiro = atendimentos.filter(a => a.barbeiroId === barb.id);

          return (
            <div 
              key={barb.id} 
              className="border border-crm-border rounded bg-crm-surface p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <img 
                    src={barb.foto} 
                    alt={barb.nome} 
                    className="w-12 h-12 rounded object-cover border border-crm-border"
                  />
                  <span className="px-2 py-0.5 text-[11px] font-medium rounded border border-crm-border bg-crm-ground text-crm-text">
                    {barb.status === 'em_corte' ? 'Em atendimento' : barb.status === 'disponivel' ? 'Cadeira disponível' : 'Em pausa'}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-crm-text">{barb.nome}</h3>
                <div className="text-xs text-crm-muted">{barb.cadeira} · {barb.especialidade}</div>

                {/* Métricas */}
                <div className="mt-4 pt-3 border-t border-crm-border grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[11px] text-crm-muted block">Cortes hoje</span>
                    <span className="font-semibold text-crm-text tabular-nums">{barb.cortesHoje}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-crm-muted block">Comissão ({barb.comissaoPercentual}%)</span>
                    <span className="font-semibold text-crm-text tabular-nums">R$ {barb.comissaoHoje.toFixed(2)}</span>
                  </div>
                </div>

                {/* Agenda */}
                <div className="mt-4 pt-3 border-t border-crm-border">
                  <div className="text-[11px] font-medium text-crm-muted mb-2">
                    Agenda do dia ({cortesDoBarbeiro.length})
                  </div>
                  <div className="space-y-1">
                    {cortesDoBarbeiro.slice(0, 3).map(a => (
                      <div key={a.id} className="p-1.5 rounded bg-crm-ground text-xs flex items-center justify-between text-crm-text">
                        <span className="tabular-nums text-crm-muted">{a.horario}</span>
                        <span className="truncate max-w-[120px] font-medium">{a.clienteNome}</span>
                        <span className="text-[10px] text-crm-muted">{a.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="mt-4 pt-3 border-t border-crm-border text-right text-[11px] text-crm-muted">
                Avaliação média: 4.9/5.0
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
