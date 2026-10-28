import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useBarberCRM } from '../../context/BarberCRMContext';

export const NovoClienteModal: React.FC = () => {
  const { 
    isNovoClienteOpen, 
    setIsNovoClienteOpen, 
    barbeiros, 
    addCliente 
  } = useBarberCRM();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cortePreferido, setCortePreferido] = useState('Degradê / Fade');
  const [barbeiroPreferido, setBarbeiroPreferido] = useState(barbeiros[0]?.apelido || 'Beto Navalha');
  const [observacoes, setObservacoes] = useState('');

  if (!isNovoClienteOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !telefone.trim()) return;

    addCliente({
      nome,
      telefone,
      email: email || undefined,
      cortePreferido,
      barbeiroPreferido,
      observacoes: observacoes || undefined,
    });

    setIsNovoClienteOpen(false);
    setNome('');
    setTelefone('');
    setEmail('');
    setObservacoes('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-crm-surface border border-crm-border rounded-lg text-crm-text">
        
        {/* Header */}
        <div className="p-4 border-b border-crm-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-crm-text">Novo cliente</h3>
          <button
            onClick={() => setIsNovoClienteOpen(false)}
            className="p-1 rounded hover:bg-crm-secondary text-crm-muted hover:text-crm-text transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 text-xs">
          
          <div>
            <label className="block text-crm-muted mb-1 font-medium">Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do cliente"
              className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-crm-muted mb-1 font-medium">WhatsApp / Telefone</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
                required
              />
            </div>

            <div>
              <label className="block text-crm-muted mb-1 font-medium">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cliente@email.com"
                className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-crm-muted mb-1 font-medium">Corte preferido</label>
              <input
                type="text"
                value={cortePreferido}
                onChange={(e) => setCortePreferido(e.target.value)}
                className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
              />
            </div>

            <div>
              <label className="block text-crm-muted mb-1 font-medium">Barbeiro preferido</label>
              <select
                value={barbeiroPreferido}
                onChange={(e) => setBarbeiroPreferido(e.target.value)}
                className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent"
              >
                {barbeiros.map(b => (
                  <option key={b.id} value={b.apelido}>
                    {b.apelido}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-crm-muted mb-1 font-medium">Observações</label>
            <textarea
              rows={3}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Preferências de corte ou notas de atendimento..."
              className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1.5 text-xs text-crm-text focus:outline-none focus:ring-1 focus:ring-crm-accent resize-none"
            />
          </div>

          <div className="pt-3 border-t border-crm-border flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNovoClienteOpen(false)}
              className="px-3 py-1.5 rounded border border-crm-border hover:bg-crm-secondary text-crm-text text-xs transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-crm-accent text-crm-surface text-xs font-medium transition-colors"
            >
              Salvar cliente
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
