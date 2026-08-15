# INTEGRATION — Frontend (2 arquivos, 4 pontos de encaixe)

Os componentes seguem shadcn/ui + Tailwind + React Query (o padrão do CRM).

## 1. Copiar os arquivos

| De (pack) | Para (projeto) |
|---|---|
| `frontend/InstagramConfigTab.tsx` | `src/components/settings/InstagramConfigTab.tsx` |
| `frontend/InstagramCampaigns.tsx` | `src/pages/marketing/InstagramCampaigns.tsx` |

## 2. Rota (`src/App.tsx`)

```tsx
const InstagramCampaigns = React.lazy(() => import("./pages/marketing/InstagramCampaigns"));
// junto das outras rotas /marketing:
<Route path="/marketing/instagram" element={<ProtectedRoute><React.Suspense fallback={<div />}><InstagramCampaigns /></React.Suspense></ProtectedRoute>} />
```

## 3. Menu (`src/components/layout/AppSidebar.tsx`)

Na seção **Marketing**, depois de "Campanhas WhatsApp" (ícone `Instagram` do
lucide-react — confira se já está no import):

```tsx
{ title: "Campanhas Instagram", url: "/marketing/instagram", icon: Instagram },
```

## 4. Configurações (`src/pages/SettingsUnified.tsx`)

Import:
```tsx
import { InstagramConfigTab } from "@/components/settings/InstagramConfigTab";
```

Item na seção `integracoes` (depois de "Meta Ads / Lead Ads"):
```tsx
{
  id: "instagram",
  label: "Instagram Oficial (API Meta)",
  icon: Instagram,
  description: "Conecte a conta do Instagram para inbox, agente de IA e campanhas comentário → DM. Inclui gatilhos de palavra-chave e modo teste.",
  adminOnly: true,
},
```

Case no render:
```tsx
case "instagram":
  return <InstagramConfigTab />;
```

## 5. Tipos (se o projeto usa database.types.ts gerado)

Depois das migrations, regenere APENAS se o build reclamar de tabelas
`instagram_comment_campaigns` / `ig_dm_keyword_triggers` ausentes:

```bash
supabase gen types typescript --linked --schema public > /tmp/types.ts
```

⚠️ NÃO substitua o arquivo inteiro às cegas: em projetos grandes o arquivo
gerado (500KB+) estoura a inferência do tsc. Injete só os blocos das tabelas
novas dentro de `Tables: {}` do arquivo existente.

## 6. Validar

`npm run build` tem que passar. Depois abra `/marketing/instagram` — deve
mostrar o aviso de "nenhuma conta conectada" com link pra Configurações.
