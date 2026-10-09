import { INSIGHTS } from "../data/agents";
export default function InsightsPanel({ fn, onAsk }) {
  const list = INSIGHTS.filter((i) => fn === "All functions" || i.fn === fn);
  return (
    <section className="panel insights">
      <h2>AI insights <small>{list.length} new</small></h2>
      {list.length === 0 && <p className="empty">No new insights for this function.</p>}
      {list.map((i) => (
        <article key={i.id} className={`insight ${i.sev.toLowerCase()}`}>
          <p>{i.text}</p>
          <div className="meta">
            <span>{i.sev} priority</span><span>{i.conf}% confidence</span><span>{i.agent}</span>
            <button onClick={() => onAsk(`Explain: ${i.text}`)}>Ask AI why</button>
          </div>
        </article>
      ))}
    </section>
  );
}
