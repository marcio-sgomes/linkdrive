# Métricas

Fonte automática: workflow **Progresso** (andamento, lead time, entregas, WIP, bugs). As demais saem do GitHub Insights, da Vercel e do Supabase.

## Projeto
| Métrica | Definição | Onde ver | Meta |
|---|---|---|---|
| Andamento | pontos fechados ÷ pontos totais | README / PROGRESSO.md | 100% ao fim da sprint 4 |
| Velocidade | pontos fechados por sprint | PROGRESSO.md | estável a partir da sprint 2 |
| Burndown | pontos restantes por dia | Projects (gráfico) | desce de forma contínua |
| Lead time | criação → fechamento da issue | PROGRESSO.md | ≤ 5 dias |
| Cycle time | início do trabalho → fechamento | Projects | ≤ 3 dias |
| Throughput | issues fechadas por semana | PROGRESSO.md | ≥ 6 |
| WIP | issues em andamento | PROGRESSO.md | ≤ 3 |
| Bugs abertos | issues `tipo:bug` abertas | PROGRESSO.md | 0 críticos |
| Retrabalho | issues reabertas ÷ fechadas | Issues | < 10% |

## Qualidade e entrega
| Métrica | Meta |
|---|---|
| Cobertura de testes (motor de cálculo) | ≥ 90% |
| Lighthouse PWA / Performance (mobile) | ≥ 90 |
| Tamanho do bundle inicial | ≤ 300 KB (gzip) |
| Frequência de deploy | a cada merge |
| Tempo de PR até produção | < 1 dia |
| Taxa de falha em mudanças | < 15% |
| Tempo de recuperação | < 1 hora |

## Prazo e custo
- Desvio de prazo = data real − data do milestone.
- Custo mensal de infraestrutura: meta R$ 0 (acompanhar limites gratuitos de Supabase e Vercel).

## Produto (SaaS)
| Métrica | Cálculo |
|---|---|
| Trials iniciados | assinaturas com status `trialing` criadas na semana |
| Ativação | motoristas com 1ª cotação em até 24h ÷ cadastros |
| Conversão trial → pago | assinaturas `active` ÷ trials encerrados |
| MRR | assinantes ativos × R$ 9,90 × 52 ÷ 12 |
| ARPU | receita semanal ÷ assinantes ativos |
| Churn semanal | cancelamentos + inadimplentes na semana ÷ ativos no início |
| Uso | cotações por motorista por semana; orçamentos enviados por WhatsApp |
| Rastreamento | links `/track` abertos ÷ corridas em andamento |
| Retenção | motoristas que voltam em 7 e 30 dias |

Os KPIs do painel `/admin` (RN-11) cobrem motoristas ativos, receita semanal e conversão. As demais serão consultas no Supabase.
