import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useBarberCRM } from '../context/BarberCRMContext';

export const ServicosPage: React.FC = () => {
  const { servicos, addServico } = useBarberCRM();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [duracao, setDuracao] = useState('30');
  const [categoria, setCategoria] = useState<'Cabelo' | 'Barba' | 'Combo' | 'Tratamento'>('Cabelo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !preco) return;

    addServico({
      nome,
      descricao: descricao || 'Serviço profissional de barbearia.',
      preco: parseFloat(preco),
      duracaoMinutos: parseInt(duracao, 10),
      categoria,
    });

    setIsModalOpen(false);
    setNome('');
    setDescricao('');
    setPreco('');
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto text-crm-text">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-crm-border">
        <div>
          <h1 className="text-sm font-semibold text-crm-text">Tabela de Serviços</h1>
          <p className="text-xs text-crm-muted">Preços de tabela, duração de cadeira e categorias de atendimento.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-2.5 py-1 rounded bg-crm-accent text-crm-surface text-xs font-medium flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Novo serviço
        </button>
      </div>

      {/* Grid de Serviços */}
      <div className="border border-crm-border rounded bg-crm-surface overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-crm-border bg-crm-ground text-crm-muted font-medium text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Serviço</th>
              <th className="py-2.5 px-3">Categoria</th>
              <th className="py-2.5 px-3">Duração</th>
              <th className="py-2.5 px-3">Descrição</th>
              <th className="py-2.5 px-3 text-right">Preço</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-crm-border">
            {servicos.map(s => (
              <tr key={s.id} className="hover:bg-crm-secondary transition-colors">
                <td className="py-2.5 px-3 font-medium text-crm-text">
                  {s.nome}
                </td>
                <td className="py-2.5 px-3">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium border border-crm-border bg-crm-ground text-crm-text">
                    {s.categoria}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-crm-muted tabular-nums">
                  {s.duracaoMinutos} min
                </td>
                <td className="py-2.5 px-3 text-crm-muted max-w-xs truncate">
                  {s.descricao}
                </td>
                <td className="py-2.5 px-3 text-right font-medium text-crm-text tabular-nums">
                  R$ {s.preco.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Novo Serviço */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-crm-surface border border-crm-border rounded-lg text-crm-text">
            <div className="p-4 border-b border-crm-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-crm-text">Cadastrar novo serviço</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-crm-muted hover:text-crm-text">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-crm-muted mb-1 font-medium">Nome do serviço</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Alinhamento de Barba"
                  className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-crm-muted mb-1 font-medium">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="45.00"
                    className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-crm-muted mb-1 font-medium">Duração (minutos)</label>
                  <input
                    type="number"
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                    placeholder="30"
                    className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-crm-muted mb-1 font-medium">Categoria</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value as any)}
                  className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
                >
                  <option value="Cabelo">Cabelo</option>
                  <option value="Barba">Barba</option>
                  <option value="Combo">Combo</option>
                  <option value="Tratamento">Tratamento</option>
                </select>
              </div>

              <div>
                <label className="block text-crm-muted mb-1 font-medium">Descrição</label>
                <textarea
                  rows={2}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição do serviço..."
                  className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent resize-none"
                />
              </div>

              <div className="pt-3 border-t border-crm-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-crm-text border border-crm-border hover:bg-crm-secondary text-xs rounded transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-crm-accent text-crm-surface font-medium text-xs rounded transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
