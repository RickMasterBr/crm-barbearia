import React, { useState } from 'react';
import { 
  Send, 
  Clock, 
  Copy
} from 'lucide-react';
import { useBarberCRM } from '../context/BarberCRMContext';

export const WhatsAppPage: React.FC = () => {
  const { campanhas, clientes, openWhatsApp, showToast } = useBarberCRM();
  const [selectedCampanha, setSelectedCampanha] = useState(campanhas[0]);
  const [testTelefone, setTestTelefone] = useState('(11) 98765-4321');
  const [testNome, setTestNome] = useState('Rodrigo');

  const getPreviewMessage = (template: string) => {
    return template
      .replace('{{nome}}', testNome)
      .replace('{{horario}}', '14:30')
      .replace('{{barbeiro}}', 'Beto Navalha')
      .replace('{{dias}}', '22');
  };

  const handleTestSend = () => {
    const msg = getPreviewMessage(selectedCampanha.templateMensagem);
    openWhatsApp(testTelefone, msg);
  };

  const clientesInativos = clientes.filter(c => c.diasSemVir > 20);

  return (
    <div className="space-y-5 max-w-6xl mx-auto text-crm-text">
      
      {/* Header */}
      <div>
        <h1 className="text-sm font-semibold text-crm-text">Automação de WhatsApp</h1>
        <p className="text-xs text-crm-muted">Mensagens pré-configuradas para confirmação de agenda e reativação de clientes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        
        {/* Left: Lista de Modelos (Col 7) */}
        <div className="md:col-span-7 space-y-3">
          <div className="text-xs font-medium text-crm-muted">
            Modelos de mensagem ativos
          </div>

          <div className="space-y-2">
            {campanhas.map(camp => {
              const isSelected = selectedCampanha.id === camp.id;

              return (
                <div
                  key={camp.id}
                  onClick={() => setSelectedCampanha(camp)}
                  className={`p-4 rounded border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-crm-surface border-crm-text'
                      : 'bg-crm-surface border-crm-border hover:bg-crm-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-semibold text-crm-text">{camp.titulo}</h3>
                    <span className="text-[10px] text-crm-muted font-medium border border-crm-border px-1.5 py-0.2 rounded bg-crm-ground">
                      {camp.status === 'ativo' ? 'Ativo' : 'Pausado'}
                    </span>
                  </div>

                  <p className="text-xs text-crm-muted mb-2">
                    {camp.descricao}
                  </p>

                  <div className="p-2.5 rounded bg-crm-ground border border-crm-border text-xs text-crm-text font-normal">
                    {camp.templateMensagem}
                  </div>

                  <div className="mt-2 text-[11px] text-crm-muted flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {camp.gatilho}
                    </span>
                    <span className="tabular-nums">
                      {camp.destinatariosCount} aptos hoje
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clientes inativos */}
          <div className="p-4 rounded border border-crm-border bg-crm-surface space-y-2">
            <div className="text-xs font-semibold text-crm-text">
              Clientes sem retorno há mais de 20 dias ({clientesInativos.length})
            </div>
            <p className="text-xs text-crm-muted">
              Envio direto para contato da barbearia:
            </p>
            <div className="divide-y divide-crm-border border border-crm-border rounded">
              {clientesInativos.map(c => (
                <div key={c.id} className="p-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-crm-text">{c.nome}</span>
                    <span className="text-crm-muted text-[11px] ml-2 tabular-nums">({c.diasSemVir} dias sem corte)</span>
                  </div>
                  <button
                    onClick={() => {
                      const msg = `Olá ${c.nome}, faz ${c.diasSemVir} dias do seu último corte com ${c.barbeiroPreferido}. Gostaria de agendar seu retorno na Barbearia Dom Barba?`;
                      openWhatsApp(c.telefone, msg);
                    }}
                    className="text-xs text-crm-muted hover:text-crm-text underline"
                  >
                    Enviar convite
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Painel de Teste e Pré-visualização (Col 5) */}
        <div className="md:col-span-5 border border-crm-border rounded bg-crm-surface p-4 space-y-4">
          
          <div>
            <div className="text-xs font-semibold text-crm-text">Pré-visualização da mensagem</div>
            <div className="text-[11px] text-crm-muted">Como a mensagem será formatada ao ser enviada:</div>
          </div>

          <div className="p-3.5 rounded border border-crm-border bg-crm-ground text-xs text-crm-text leading-relaxed">
            {getPreviewMessage(selectedCampanha.templateMensagem)}
          </div>

          <div className="space-y-2 pt-2 border-t border-crm-border text-xs">
            <div className="text-xs font-medium text-crm-text">Testar envio direto</div>
            
            <div>
              <label className="text-[11px] text-crm-muted block mb-1">Telefone para teste</label>
              <input
                type="text"
                value={testTelefone}
                onChange={(e) => setTestTelefone(e.target.value)}
                className="w-full bg-crm-surface border border-crm-border rounded px-2.5 py-1 text-xs text-crm-text focus:outline-none"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleTestSend}
                className="flex-1 py-1.5 rounded bg-crm-accent text-crm-surface font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-3 h-3" />
                Testar no WhatsApp
              </button>
              
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getPreviewMessage(selectedCampanha.templateMensagem));
                  showToast('Texto copiado.');
                }}
                className="px-2.5 py-1.5 rounded border border-crm-border hover:bg-crm-secondary text-crm-text text-xs"
                title="Copiar texto"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
