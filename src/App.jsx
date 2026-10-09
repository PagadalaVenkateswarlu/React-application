import { useMemo, useState } from "react";
import { FILTERS } from "./data/agents";
import { queryAgents } from "./services/agentService";
import usePinned from "./hooks/usePinned";
import FunctionRail from "./components/FunctionRail";
import Sidebar from "./components/Sidebar";
import KpiGrid from "./components/KpiGrid";
import InsightsPanel from "./components/InsightsPanel";
import AgentTable from "./components/AgentTable";
import AgentDrawer from "./components/AgentDrawer";
import Copilot from "./components/Copilot";
import "./App.css";

function Login({ onLogin }) {
  const [u, setU] = useState("");
  return (
    <div className="login"><div className="login-card">
      <h1>PTOF Agents Console</h1><p>Sign in with your company account</p>
      <input placeholder="Work email" value={u} onChange={(e) => setU(e.target.value)} />
      <input placeholder="Password" type="password" />
      {/* Replace with SSO (OIDC/SAML); keep sessions in httpOnly cookies */}
      <button onClick={() => u && onLogin(u)}>Sign in</button>
    </div></div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Overview");
  const [f, setF] = useState({ plant: FILTERS.plant[0], function: FILTERS.function[0], period: FILTERS.period[1] });
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const [chat, setChat] = useState(false);
  const [seed, setSeed] = useState(null);
  const ask = (t) => setSeed({ t, n: Date.now() });

  const [ui, setUi] = useState({ status: "All", sort: "runs", group: false, page: 1, pageSize: 10 });
  const [pins, togglePin] = usePinned();
  const setFilter = (o) => { setF({ ...f, ...o }); setUi({ ...ui, page: 1 }); };

  // One query drives KPIs, insights and the agent table: no duplicates.
  const res = useMemo(() => queryAgents({ ...f, q, ...ui }), [f, q, ui]);
  const agents = res.matches;

  if (!user) return <Login onLogin={setUser} />;
  const ctx = `${f.plant}, ${f.function}, ${f.period}`;

  return (
    <div className="shell">
      <Sidebar page={page} setPage={setPage} />
      <div className="content">
        <header className="top">
          <input className="ask" placeholder="Ask PTOF AI: “Why did yield drop on Line 3?”" onFocus={() => setChat(true)} />
          <div className="user">{user} <button onClick={() => setUser(null)}>Sign out</button></div>
        </header>
        <div className="filters">
          {Object.entries(FILTERS).map(([k, o]) => (
            <label key={k}>{k}<select value={f[k]} onChange={(e) => setFilter({ [k]: e.target.value })}>{o.map((x) => <option key={x}>{x}</option>)}</select></label>
          ))}
          <input className="search" placeholder="Search agents" value={q} onChange={(e) => { setQ(e.target.value); setUi({ ...ui, page: 1 }); }} />
        </div>
        <main>
          <h1 className="title">{page}<small>{ctx}</small></h1>
          {page === "Overview" || page === "Agents" || page === "AI Insights" ? (
            <>
              {page !== "AI Insights" && <FunctionRail value={f.function} onPick={(k) => setFilter({ function: k })} />}
              {page !== "AI Insights" && <KpiGrid agents={agents} fn={f.function} />}
              <div className={page === "Overview" ? "two" : ""}>
                {page !== "AI Insights" && <AgentTable res={res} ui={ui} setUi={setUi} pins={pins} togglePin={togglePin} onOpen={setSel} />}
                {page !== "Agents" && <InsightsPanel fn={f.function} onAsk={ask} />}
              </div>
            </>
          ) : <p className="empty">{page} module: connect your API here.</p>}
        </main>
      </div>
      <AgentDrawer agent={sel} onClose={() => setSel(null)} onAsk={ask} />
      <Copilot open={chat} setOpen={setChat} seed={seed} ctx={ctx} />
    </div>
  );
}
