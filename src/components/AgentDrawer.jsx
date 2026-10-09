export default function AgentDrawer({ agent, onClose, onAsk }) {
  if (!agent) return null;
  return (
    <aside className="drawer" role="dialog" aria-label={agent.name}>
      <button className="x" onClick={onClose} aria-label="Close">×</button>
      <h2>{agent.name}</h2>
      <p className="sm">{agent.fn} · {agent.plant}</p>
      <h3>Sub-agents</h3>
      {agent.subs.map((s) => <span key={s} className="chip">{s}</span>)}
      <h3>Connected data sources</h3>
      {agent.sources.map((s) => <span key={s} className="chip src">{s}</span>)}
      <div className="actions">
        <button className="primary" onClick={() => onAsk(`Run ${agent.name} for the current filters`)}>Run agent</button>
        <button onClick={() => onAsk(`Summarize last run of ${agent.name}`)}>Summarize last run</button>
      </div>
      <p className="sm">Every run is recorded in the audit trail. Approvals need e-signature.</p>
    </aside>
  );
}
