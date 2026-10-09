import { useState } from "react";
export default function usePinned() {
  const [pins, setPins] = useState(() => { try { return JSON.parse(localStorage.getItem("ptof-pins")) || []; } catch { return []; } });
  const toggle = (id) => setPins((p) => {
    const n = p.includes(id) ? p.filter((x) => x !== id) : [...p, id];
    try { localStorage.setItem("ptof-pins", JSON.stringify(n)); } catch {}
    return n;
  });
  return [pins, toggle];
}
