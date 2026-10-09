const STATUSES = ["All", "Live", "Attention", "Draft"];
export default function AgentTable({ res, ui, setUi, pins, togglePin, onOpen }) {
  const { rows, matches, counts, pages, page } = res;
  const set = (o) => setUi({ ...ui, page: 1, ...o });
  let lastFn = null;
  return (
    <section className="panel">
      <h2>Agents <small>{matches.length} of {counts.All}</small>
        <label className="grp"><input type="checkbox" checked={ui.group} onChange={(e) => set({ group: e.target.checked })} /> Group by function</label>
        <select className="sortsel" value={ui.sort} onChange={(e) => set({ sort: e.target.value })} aria-label="Sort agents">
          <option value="runs">Most runs</option><option value="health">Best health</option><option value="name">Name</option>
        </select>
      </h2>
      <div className="tabs">
        {STATUSES.map((s) => (
          <button key={s} className={ui.status === s ? "on" : ""} onClick={() => set({ status: s })}>{s} <b>{counts[s] || 0}</b></button>
        ))}
      </div>
      {rows.length === 0 ? <p className="empty">No agents match these filters. Clear the search or choose another status.</p> : (
        <div className="scroll"><table>
          <thead><tr><th></th><th>Agent</th><th>Function</th><th>Plant</th><th>Sources</th><th>Health</th><th>Last run</th><th>Status</th></tr></thead>
          <tbody>{rows.map((a) => {
            const head = ui.group && a.fn !== lastFn; lastFn = a.fn;
            return [
              head && <tr key={"h" + a.fn} className="grouprow"><td colSpan={8}>{a.fn}</td></tr>,
              <tr key={a.id} className="row" tabIndex={0} onClick={() => onOpen(a)} onKeyDown={(e) => e.key === "Enter" && onOpen(a)}>
                <td><button className={`star ${pins.includes(a.id) ? "on" : ""}`} aria-label="Pin agent" onClick={(e) => { e.stopPropagation(); togglePin(a.id); }}>★</button></td>
                <td><b>{a.name}</b><div className="sm">{a.subs.length} sub-agents</div></td>
                <td>{a.fn}</td><td>{a.plant}</td><td>{a.sources.length}</td>
                <td><div className="bar"><i style={{ width: `${a.health}%` }} className={a.health < 70 ? "low" : ""} /></div></td>
                <td>{a.last}</td>
                <td><span className={`pill ${a.status.toLowerCase()}`}>{a.status}</span></td>
              </tr>,
            ];
          })}</tbody>
        </table></div>)}
      <div className="pager">
        <span>Rows</span>
        <select value={ui.pageSize} onChange={(e) => set({ pageSize: +e.target.value })}>{[10, 25, 50].map((n) => <option key={n}>{n}</option>)}</select>
        <button disabled={page <= 1} onClick={() => setUi({ ...ui, page: page - 1 })}>Prev</button>
        <span>Page {page} of {pages}</span>
        <button disabled={page >= pages} onClick={() => setUi({ ...ui, page: page + 1 })}>Next</button>
      </div>
    </section>
  );
}
