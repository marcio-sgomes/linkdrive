# Definição de pronto e de preparado

## Preparada para a sprint (DoR)
- Tem história clara e critérios de aceite verificáveis
- Referência a RN/RF quando existir
- Estimativa em story points (1, 2, 3, 5 ou 8; acima de 8, dividir)
- Sem dependência bloqueante aberta

## Pronta (DoD)
- Critérios de aceite atendidos
- Pull request revisado e integrado em `main`
- CI verde (build e lint)
- Testado no celular, nos temas claro e escuro, com uso de uma mão
- Migração de banco aplicada e RLS conferida, se houver
- Sem segredos no código
- Documentação ou CHANGELOG atualizados quando mudar comportamento
