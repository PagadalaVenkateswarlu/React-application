import { NAV } from "../data/agents";
export default function Sidebar({ page, setPage }) {
  return (
    <nav className="side" aria-label="Main">
      <div className="brand">PTOF<span>Agents</span></div>
      {NAV.map((n) => (
        <button key={n} className={page === n ? "on" : ""} onClick={() => setPage(n)}>{n}</button>
      ))}
      <div className="gxp">GxP validated<br />Audit trail on</div>
    </nav>
  );
}
