#!/usr/bin/env bash
# Cria labels, milestones e o backlog inicial no repositório atual.
# Uso: ./scripts/seed-github.sh AAAA-MM-DD   (data de início da Sprint 1)
# Requer: GitHub CLI (gh) autenticado, jq e bash com `date -d` (Linux, WSL ou Git Bash).
# Execute UMA vez; repetir duplica as issues.
set -euo pipefail

START="${1:?Informe a data de início da Sprint 1 (AAAA-MM-DD)}"
command -v gh >/dev/null || { echo "Instale o GitHub CLI: https://cli.github.com"; exit 1; }
command -v jq >/dev/null || { echo "Instale o jq: https://jqlang.org"; exit 1; }
cd "$(dirname "$0")"

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "Repositório: $REPO"

label() { gh label create "$1" --color "$2" --description "${3:-}" --force >/dev/null; }
for n in 1 2 3 5 8; do label "sp:$n" EDEDED "Story points"; done
label tipo:feature 28C6C0; label tipo:bug D73A4A; label tipo:infra 004D5B; label tipo:docs 0075CA
label area:frontend BFD4F2; label area:backend C5DEF5; label area:mapas D4C5F9; label area:produto F9D0C4
label status:em-andamento FAD218 "Em desenvolvimento (limite: 3)"
label status:em-revisao FBCA04 "Aguardando revisão ou teste"

for i in 1 2 3 4; do
  due=$(date -u -d "$START + $((i * 7)) days" +%Y-%m-%dT23:59:59Z)
  title=$(jq -r ".sprints[\"$i\"]" backlog.json)
  gh api "repos/$REPO/milestones" -f title="$title" -f due_on="$due" >/dev/null || echo "Milestone já existe: $title"
done

jq -c '.issues[]' backlog.json | while read -r row; do
  title=$(jq -r .title <<<"$row")
  sp=$(jq -r .sp <<<"$row")
  labels=$(jq -r '.labels | join(",")' <<<"$row"),sp:$sp
  milestone=$(jq -r --arg s "$(jq -r .sprint <<<"$row")" '.sprints[$s]' backlog.json)
  body=$(jq -r '"**Descrição**\n\(.desc)\n\n**Critérios de aceite**\n" + (.aceite | map("- [ ] " + .) | join("\n")) + "\n\n**Referência:** \(.ref)"' <<<"$row")
  gh issue create --title "$title" --body "$body" --label "$labels" --milestone "$milestone" </dev/null >/dev/null
  echo "Criada: $title"
done
echo "Pronto. Crie o quadro em Projects e rode o workflow Progresso."
