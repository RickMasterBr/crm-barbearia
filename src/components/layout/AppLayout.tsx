import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Users, 
  Scissors, 
  MessageSquare, 
  Search, 
  Plus, 
  Sun, 
  Moon, 
  ChevronDown, 
  Tag,
  Menu,
  X
} from 'lucide-react';
import { useBarberCRM } from '../../context/BarberCRMContext';
import { RecordDetailDrawer } from '../common/RecordDetailDrawer';
import { NovoAtendimentoModal } from '../common/NovoAtendimentoModal';
import { NovoClienteModal } from '../common/NovoClienteModal';

export const AppLayout: React.FC = () => {
  const { 
    isDarkMode, 
    toggleTheme, 
    setIsNovoAtendimentoOpen, 
    setIsNovoClienteOpen,
    toastMessage,
    atendimentos
  } = useBarberCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const atendimentosHoje = atendimentos.length;

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${isDarkMode ? 'dark' : 'light'}`}>
      
      {/* Mobile Top Header */}
      <div className="md:hidden h-12 border-b border-crm-border bg-crm-surface px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded hover:bg-crm-secondary text-crm-text"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <span className="text-xs font-semibold text-crm-text">Dom Barba</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsNovoAtendimentoOpen(true)}
            className="px-2 py-1 rounded bg-crm-accent text-crm-surface text-xs font-medium"
          >
            + Agendar
          </button>
        </div>
      </div>

      {/* Sidebar Twenty CRM */}
      <aside className={`
        ${mobileMenuOpen ? 'block fixed inset-0 z-40 bg-crm-surface' : 'hidden'} 
        md:flex md:static w-full md:w-60 flex-shrink-0 border-r border-crm-border bg-crm-surface flex-col justify-between select-none
      `}>
        <div>
          {/* Workspace Switcher */}
          <div className="p-3 border-b border-crm-border flex items-center justify-between">
            <button className="flex-1 flex items-center justify-between px-2 py-1.5 rounded hover:bg-crm-secondary transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-crm-text text-crm-surface flex items-center justify-center font-semibold text-xs">
                  <Scissors className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-crm-text tracking-tight">
                    Dom Barba
                  </div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-crm-muted" />
            </button>
            
            {mobileMenuOpen && (
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden p-1.5 text-crm-muted hover:text-crm-text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Trigger */}
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-crm-muted" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-crm-secondary border border-crm-border rounded pl-8 pr-7 py-1 text-xs text-crm-text placeholder-crm-muted focus:outline-none focus:ring-1 focus:ring-crm-accent"
              />
              <span className="absolute right-2 top-1.5 text-[10px] text-crm-muted font-medium">
                ⌘K
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-2 py-2 space-y-4">
            
            <div>
              <div className="px-2 mb-1 text-[11px] font-medium text-crm-muted">
                Espaço de trabalho
              </div>
              <div className="space-y-0.5">
                <NavLink
                  to="/"
                  end
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors ${
                      isActive
                        ? 'bg-crm-secondary text-crm-text font-medium'
                        : 'text-crm-muted hover:text-crm-text hover:bg-crm-secondary'
                    }`
                  }
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Visão Geral
                </NavLink>

                <NavLink
                  to="/atendimentos"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                      isActive
                        ? 'bg-crm-secondary text-crm-text font-medium'
                        : 'text-crm-muted hover:text-crm-text hover:bg-crm-secondary'
                    }`
                  }
                >
                  <div className="flex items-center gap-2">
                    <CalendarClock className="w-4 h-4" />
                    Atendimentos
                  </div>
                  <span className="text-[10px] text-crm-muted tabular-nums">
                    {atendimentosHoje}
                  </span>
                </NavLink>

                <NavLink
                  to="/clientes"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors ${
                      isActive
                        ? 'bg-crm-secondary text-crm-text font-medium'
                        : 'text-crm-muted hover:text-crm-text hover:bg-crm-secondary'
                    }`
                  }
                >
                  <Users className="w-4 h-4" />
                  Clientes
                </NavLink>

                <NavLink
                  to="/profissionais"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors ${
                      isActive
                        ? 'bg-crm-secondary text-crm-text font-medium'
                        : 'text-crm-muted hover:text-crm-text hover:bg-crm-secondary'
                    }`
                  }
                >
                  <Scissors className="w-4 h-4" />
                  Barbeiros
                </NavLink>

                <NavLink
                  to="/servicos"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2.5 py-1.5 rounded text-xs transition-colors ${
                      isActive
                        ? 'bg-crm-secondary text-crm-text font-medium'
                        : 'text-crm-muted hover:text-crm-text hover:bg-crm-secondary'
                    }`
                  }
                >
                  <Tag className="w-4 h-4" />
                  Serviços
                </NavLink>
              </div>
            </div>

            <div>
              <div className="px-2 mb-1 text-[11px] font-medium text-crm-muted">
                Comunicação
              </div>
              <div className="space-y-0.5">
                <NavLink
                  to="/whatsapp"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                      isActive
                        ? 'bg-crm-secondary text-crm-text font-medium'
                        : 'text-crm-muted hover:text-crm-text hover:bg-crm-secondary'
                    }`
                  }
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </div>
                </NavLink>
              </div>
            </div>

          </nav>
        </div>

        {/* Bottom Profile Bar */}
        <div className="p-2 border-t border-crm-border">
          <div className="flex items-center justify-between px-2 py-1.5 rounded">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-crm-secondary border border-crm-border flex items-center justify-center text-xs font-medium text-crm-text">
                C
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-crm-text">Carlos Silva</div>
                <div className="text-[10px] text-crm-muted">Gerente</div>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              title="Alternar tema claro / escuro"
              className="p-1 rounded text-crm-muted hover:text-crm-text hover:bg-crm-secondary transition-colors"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-crm-ground">
        
        {/* Desktop Top Header Toolbar */}
        <header className="hidden md:flex h-12 border-b border-crm-border bg-crm-surface px-5 items-center justify-between flex-shrink-0">
          
          <div className="flex items-center gap-2 text-xs">
            <span className="text-crm-muted">Barbearia Dom Barba</span>
            <span className="text-crm-border">/</span>
            <span className="font-medium text-crm-text">
              {location.pathname === '/' && 'Visão Geral'}
              {location.pathname === '/atendimentos' && 'Atendimentos'}
              {location.pathname === '/clientes' && 'Clientes'}
              {location.pathname.startsWith('/clientes/') && 'Detalhes do Cliente'}
              {location.pathname === '/profissionais' && 'Barbeiros'}
              {location.pathname === '/servicos' && 'Serviços'}
              {location.pathname === '/whatsapp' && 'Automação WhatsApp'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNovoClienteOpen(true)}
              className="px-2.5 py-1 rounded border border-crm-border text-crm-text hover:bg-crm-secondary text-xs font-medium transition-colors"
            >
              Novo cliente
            </button>

            <button
              onClick={() => setIsNovoAtendimentoOpen(true)}
              className="px-2.5 py-1 rounded bg-crm-accent text-crm-surface text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Novo atendimento
            </button>
          </div>

        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>

      </div>

      {/* Drawer */}
      <RecordDetailDrawer />

      {/* Modals */}
      <NovoAtendimentoModal />
      <NovoClienteModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-crm-surface border border-crm-border text-crm-text px-3.5 py-2.5 rounded text-xs font-medium shadow-sm">
          {toastMessage}
        </div>
      )}

    </div>
  );
};
