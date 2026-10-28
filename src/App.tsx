import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BarberCRMProvider } from './context/BarberCRMContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { AtendimentosPage } from './pages/AtendimentosPage';
import { ClientesPage } from './pages/ClientesPage';
import { ClienteDetalhesPage } from './pages/ClienteDetalhesPage';
import { ProfissionaisPage } from './pages/ProfissionaisPage';
import { ServicosPage } from './pages/ServicosPage';
import { WhatsAppPage } from './pages/WhatsAppPage';

export const App: React.FC = () => {
  return (
    <BarberCRMProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="atendimentos" element={<AtendimentosPage />} />
            <Route path="clientes" element={<ClientesPage />} />
            <Route path="clientes/:id" element={<ClienteDetalhesPage />} />
            <Route path="profissionais" element={<ProfissionaisPage />} />
            <Route path="servicos" element={<ServicosPage />} />
            <Route path="whatsapp" element={<WhatsAppPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BarberCRMProvider>
  );
};
