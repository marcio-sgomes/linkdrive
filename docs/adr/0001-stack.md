# ADR 0001 – Escolha da stack

- **Status:** aceita
- **Contexto:** produto SaaS de um desenvolvedor, com restrição de custo zero e necessidade de uso no celular sem loja de aplicativos.
- **Decisão:** PWA em React + Vite + Tailwind; Supabase (Postgres, Auth, Realtime, RLS); Leaflet com OSRM para mapas; Vercel para deploy; WhatsApp via `wa.me`.
- **Consequências:** instalação sem loja e deploy contínuo; limites de planos gratuitos a monitorar (ver riscos R2 e R6); rastreamento em segundo plano limitado no iOS (R3).
- **Decisão de design:** o visual segue as imagens de referência do projeto (fundo escuro `#212121`, claro `#F5F7FA`, botões em pílula), que prevalecem sobre o documento de especificação.
