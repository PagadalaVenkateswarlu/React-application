import { KPI_DEFS } from "../data/agents";
function Spark({ d }) {
  const mx = Math.max(...d), mn = Math.min(...d);
  const pts = d.map((v, i) => `${(i / (d.length - 1)) * 100},${28 - ((v - mn) / (mx - mn || 1)) * 26}`).join(" ");
  return <svg viewBox="0 0 100 30" className="spark" aria-hidden="true"><polyline points={pts} fill="none" strokeWidth="2" /></svg>;
}
export default function KpiGrid({ agents, fn }) {
  const tiles = KPI_DEFS.filter((k) => k.always || fn === "All functions" || k.fn?.includes(fn));
  return (
    <section className="kpis" aria-label="Key indicators">
      {tiles.map((k) => (
        <div key={k.key} className={`kpi ${k.tone || ""}`}>
          <span className="kpi-label">{k.label}</span>
          <strong className="kpi-value">{k.calc(agents)}</strong>
          <span className="delta">{k.delta} vs previous</span>
          <Spark d={k.spark} />
        </div>
      ))}
    </section>
  );
}
