import React from 'react';
import { 
  useBarberCRM 
} from '../context/BarberCRMContext';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { 
    atendimentos, 
    clientes, 
    barbeiros, 
    setSelectedRecord, 
    setIsNovoAtendimentoOpen,
    openWhatsApp 
  } = useBarberCRM();

  const navigate = useNavigate();

  const totalFaturamentoHoje = atendimentos
    .filter(a => a.status === 'concluido' || a.status === 'em_atendimento')
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalAtendimentosHoje = atendimentos.length;
  const atendimentosConcluidos = atendimentos.filter(a => a.status === 'concluido').length;
  const ticketMedio = totalAtendimentosHoje > 0 ? totalFaturamentoHoje / (atendimentosConcluidos || 1) : 0;
  const clientesInativos = clientes.filter(c => c.diasSemVir > 20);

  const proximosAtendimentos = atendimentos.filter(a => a.status !== 'concluido').slice(0, 5);

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-crm-text">
      
      {/* Title */}
      <div>
        <h1 className="text-lg font-semibold text-crm-text">Visão Geral</h1>
        <p className="text-xs text-crm-muted">Operação e indicadores da Barbearia Dom Barba hoje.</p>
      </div>

      {/* KPI Row (Type-driven, no tinted circles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        <div className="p-4 rounded border border-crm-border bg-crm-surface">
          <div className="text-xs text-crm-muted font-medium">Faturamento hoje</div>
          <div className="text-2xl font-semibold text-crm-text mt-1.5 tabular-nums">
            R$ {totalFaturamentoHoje.toFixed(2)}
          </div>
          <div className="text-[11px] text-crm-muted mt-1">
            +18% em relação a ontem
          </div>
        </div>

        <div className="p-4 rounded border border-crm-border bg-crm-surface">
          <div className="text-xs text-crm-muted font-medium">Atendimentos concluídos</div>
          <div className="text-2xl font-semibold text-crm-text mt-1.5 tabular-nums">
            {atendimentosConcluidos} <span className="text-sm font-normal text-crm-muted">de {totalAtendimentosHoje}</span>
          </div>
          <div className="text-[11px] text-crm-muted mt-1">
            {totalAtendimentosHoje - atendimentosConcluidos} restantes na grade
          </div>
        </div>

        <div className="p-4 rounded border border-crm-border bg-crm-surface">
          <div className="text-xs text-crm-muted font-medium">Ticket médio</div>
          <div className="text-2xl font-semibold text-crm-text mt-1.5 tabular-nums">
            R$ {ticketMedio.toFixed(2)}
          </div>
          <div className="text-[11px] text-crm-muted mt-1">
            Combo Cabelo + Barba mais frequente
          </div>
        </div>

        <div className="p-4 rounded border border-crm-border bg-crm-surface">
          <div className="text-xs text-crm-muted font-medium">Clientes cadastrados</div>
          <div className="text-2xl font-semibold text-crm-text mt-1.5 tabular-nums">
            {clientes.length}
          </div>
          <div className="text-[11px] text-crm-muted mt-1">
            {clientesInativos.length} clientes sem corte há mais de 20 dias
          </div>
        </div>

      </div>

      {/* Cadeiras e Barbeiros */}
      <div className="border border-crm-border rounded bg-crm-surface">
        <div className="px-4 py-3 border-b border-crm-border flex items-center justify-between">
          <h2 className="text-xs font-semibold text-crm-text">Status das Cadeiras</h2>
          <button
            onClick={() => navigate('/profissionais')}
            className="text-xs text-crm-muted hover:text-crm-text transition-colors"
          >
            Ver detalhes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-crm-border">
          {barbeiros.map(b => (
            <div key={b.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={b.foto} alt={b.nome} className="w-9 h-9 rounded object-cover border border-crm-border" />
                <div>
                  <div className="text-xs font-semibold text-crm-text">{b.apelido}</div>
                  <div className="text-[11px] text-crm-muted">{b.cadeira}</div>
                  <div className="text-[11px] text-crm-muted mt-0.5">
                    {b.status === 'em_corte' ? 'Em atendimento' : b.status === 'disponivel' ? 'Cadeira disponível' : 'Em pausa'}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-medium text-crm-text tabular-nums">{b.cortesHoje} cortes</div>
                <div className="text-xs text-crm-muted tabular-nums">R$ {b.comissaoHoje.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade de Atendimentos do Dia */}
      <div className="border border-crm-border rounded bg-crm-surface">
        <div className="px-4 py-3 border-b border-crm-border flex items-center justify-between">
          <div>
            <h2 className="text-xs font-semibold text-crm-text">Próximos horários do dia</h2>
            <p className="text-[11px] text-crm-muted">Clique em uma linha para abrir o painel lateral de detalhes.</p>
          </div>
          <button
            onClick={() => setIsNovoAtendimentoOpen(true)}
            className="px-2.5 py-1 text-xs border border-crm-border rounded hover:bg-crm-secondary transition-colors"
          >
            + Agendar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-crm-border bg-crm-ground text-crm-muted font-medium text-[11px]">
              <tr>
                <th className="py-2 px-3">Horário</th>
                <th className="py-2 px-3">Cliente</th>
                <th className="py-2 px-3">Telefone</th>
                <th className="py-2 px-3">Serviço</th>
                <th className="py-2 px-3">Barbeiro</th>
                <th className="py-2 px-3 text-right">Valor</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3 text-right">WhatsApp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-crm-border">
              {proximosAtendimentos.map(atend => (
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
                      {atend.status === 'em_atendimento' ? 'Na Cadeira' : atend.status === 'confirmado' ? 'Confirmado' : 'Agendado'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        const msg = `Olá ${atend.clienteNome}, confirmamos seu horário hoje às ${atend.horario} com ${atend.barbeiroNome} na Barbearia Dom Barba.`;
                        openWhatsApp(atend.clienteTelefone, msg);
                      }}
                      className="text-xs text-crm-muted hover:text-crm-text underline"
                    >
                      Enviar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
