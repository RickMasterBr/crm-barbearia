# 💈 Barbearia Dom Barba - CRM & Gestão Inteligente

Protótipo SPA de alta fidelidade desenvolvido especificamente para demonstração comercial em barbearias, inspirado na arquitetura visual e excelência de interface do Salesforce e Twenty CRM.

---

## 🚀 Como Rodar Localmente

Para rodar em sua máquina agora:
```bash
npm run dev
```
Acesse no seu navegador: `http://localhost:5173`

Para testar o build de produção:
```bash
npm run build
npm run preview
```

---

## 🌐 Como Subir na Vercel (1 Minuto)

Este projeto já está 100% configurado para a **Vercel** (inclui `vercel.json` para roteamento SPA sem erro 404).

### Opção 1: Direto pelo Terminal com a CLI da Vercel
```bash
npx vercel
```
Basta pressionar Enter nas perguntas padrão e seu link estará no ar em menos de 60 segundos!

### Opção 2: Pelo GitHub
1. Crie um repositório no seu GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Barbearia CRM Demo"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/crm-barbearia.git
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com) e clique em **"Add New Project"**.
3. Importe o repositório — a Vercel detectará automaticamente o **Vite** e fará o deploy com 1 clique!

---

## ✂️ Funcionalidades para Impressionar o Cliente na Reunião

1. **Dashboard Executivo:** Faturamento do dia, total de cortes, ticket médio e taxa de fidelidade.
2. **Pipeline de Atendimentos (Kanban / Tabela):** Estágios de *Agendado*, *Confirmado*, *Na Cadeira (Cortando)*, *Concluído* e *Não Compareceu*.
3. **Ficha Completa do Cliente (Drawer Lateral):** Ao clicar em qualquer cliente, abre o painel lateral no padrão Salesforce com histórico de cortes, preferências e notas.
4. **Disparo de WhatsApp Integrado:** Botões com links reais que abrem o WhatsApp Web com mensagens personalizadas pré-digitadas.
5. **Automação de Retenção:** Identificação automática de clientes sumidos há mais de 20 dias com mensagem de resgate pronta.
6. **Persistência Local (localStorage):** Todas as alterações feitas durante a demo (novo agendamento, mudança de status) permanecem salvas no navegador mesmo se recarregar a página.
