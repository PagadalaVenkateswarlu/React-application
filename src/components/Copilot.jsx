import { useEffect, useState } from "react";
export default function Copilot({ open, setOpen, seed, ctx }) {
  const [msgs, setMsgs] = useState([{ r: "ai", t: "Hi, ask about KPIs, deviations, batches, or run an agent." }]);
  const [v, setV] = useState("");
  const send = (t) => {
    if (!t.trim()) return;
    // Replace the setTimeout with a call to your backend LLM endpoint (stream the reply).
    setMsgs((m) => [...m, { r: "me", t }]);
    setTimeout(() => setMsgs((m) => [...m, { r: "ai", t: `(Demo) Working on "${t}" for ${ctx}. Connect your AI API to get live answers with source links.` }]), 500);
    setV("");
  };
  useEffect(() => { if (seed) { setOpen(true); send(seed.t); } }, [seed]);
  if (!open) return null;
  return (
    <aside className="copilot" aria-label="AI assistant">
      <header>PTOF AI <button onClick={() => setOpen(false)} aria-label="Close">×</button></header>
      <div className="msgs">{msgs.map((m, i) => <p key={i} className={m.r}>{m.t}</p>)}</div>
      <div className="chips">
        {["Why did yield drop?", "Open deviations by plant", "Which SKUs may stock out?"].map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}
      </div>
      <input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(v)} placeholder="Ask PTOF AI" />
    </aside>
  );
}
