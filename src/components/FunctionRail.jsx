import { functionCounts } from "../services/agentService";
export default function FunctionRail({ value, onPick }) {
  const c = functionCounts(), total = Object.values(c).reduce((a, b) => a + b, 0);
  const items = [["All functions", total], ...Object.entries(c)];
  return (
    <div className="rail" aria-label="Browse by function">
      {items.map(([k, n]) => (
        <button key={k} className={value === k ? "on" : ""} onClick={() => onPick(k)}>{k.replace("All functions", "All")} <b>{n}</b></button>
      ))}
    </div>
  );
}
