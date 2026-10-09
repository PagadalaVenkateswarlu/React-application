# PTOF Agents Console

React JS + JSX (Vite). Landing page with a top filter bar driving KPI tiles and one agent table.

## Run
    npm install
    npm run dev        # local
    npm run build      # production build in dist/

## Structure
- src/data/agents.js : filters, agents, KPI definitions (replace with API calls)
- src/App.jsx        : layout, filters, state
- src/components/    : Sidebar, KpiGrid, InsightsPanel, AgentTable, AgentDrawer, Copilot (AI chat)
- src/App.css        : styles

## Before production
- Replace the login stub with SSO (httpOnly cookie sessions)
- Load agents/KPIs from your API
- Add pagination and role-based access

## Scaling to hundreds of agents
- Registry: src/data/registry.js (one line per agent); 26 agents today
- Service layer: src/services/agentService.js - swap the in-memory body for your API (server-side filter, sort, pagination)
- UI: function rail with counts, status tabs, group-by-function, pinning (favorites), pagination
- KPIs should come from a /kpis endpoint over the full filtered set, not from the visible page
