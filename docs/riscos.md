# Registro de riscos

Probabilidade e impacto: B (baixo), M (médio), A (alto).

| # | Risco | Prob. | Impacto | Mitigação | Gatilho |
|---|---|---|---|---|---|
| R1 | Não existe API oficial de preço Uber/99 | A | M | Estimativa por fórmula ou digitação manual do valor | Antes da sprint 2 |
| R2 | Limites do servidor OSRM público | M | A | Cache de rotas; hospedar OSRM próprio se necessário | Erros 429 ou lentidão |
| R3 | Rastreamento em segundo plano em iOS/PWA | A | A | Teste de viabilidade no início da sprint 3; plano B com a tela do motorista aberta | Falha em teste real |
| R4 | Escolha do gateway PIX/cartão | M | A | Decidir até o fim da sprint 2; avaliar taxas e recorrência semanal | Sprint 3 sem decisão |
| R5 | LGPD e dados de localização | M | A | Consentimento explícito, retenção mínima, política de privacidade | Antes de usuários reais |
| R6 | Limites do plano gratuito do Supabase | M | M | Monitorar uso; limpar telemetria antiga | 70% da cota |
| R7 | Crescimento de escopo | A | M | Backlog priorizado; tudo novo vai para a próxima sprint | Issue sem sprint |
| R8 | Um único desenvolvedor (ponto único de falha) | M | A | Documentar decisões em ADR; manter `main` sempre estável | Atraso > 1 semana |
