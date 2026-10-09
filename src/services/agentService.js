import { AGENTS } from "../data/agents";
// Server-ready contract. Today it filters in memory; later replace the body with
// fetch("/api/agents?plant=..&function=..&q=..&status=..&sort=..&page=..&pageSize=..")
// and fetch("/api/kpis?...") so 500+ agents never load into the browser at once.
export function queryAgents({ plant, function: fn, q = "", status = "All", sort = "runs", group = false, page = 1, pageSize = 10 }) {
  const base = AGENTS.filter((a) =>
    (plant === "All plants" || a.plant === plant || a.plant === "All plants") &&
    (fn === "All functions" || a.fn === fn) &&
    (a.name + a.subs.join(" ")).toLowerCase().includes(q.toLowerCase()));
  const counts = { All: base.length };
  base.forEach((a) => (counts[a.status] = (counts[a.status] || 0) + 1));
  const matches = base.filter((a) => status === "All" || a.status === status);
  matches.sort((a, b) => (group && a.fn !== b.fn ? a.fn.localeCompare(b.fn) : sort === "name" ? a.name.localeCompare(b.name) : b[sort] - a[sort]));
  const pages = Math.max(1, Math.ceil(matches.length / pageSize));
  const cur = Math.min(page, pages);
  return { matches, rows: matches.slice((cur - 1) * pageSize, cur * pageSize), counts, pages, page: cur };
}
export function functionCounts() {
  const c = {}; AGENTS.forEach((a) => (c[a.fn] = (c[a.fn] || 0) + 1)); return c;
}
