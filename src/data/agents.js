// Single source of truth. Replace with API calls (see README).
export const FILTERS = {
  plant: ["All plants", "Hyderabad OSD", "Vizag API", "Baddi Sterile"],
  function: ["All functions", "Manufacturing", "Quality", "Supply chain", "Sales", "Engineering"],
  period: ["Today", "7 days", "30 days", "Quarter"],
};
export const NAV = ["Overview", "Agents", "AI Insights", "Data sources", "Compliance", "Admin"];

export { AGENTS } from "./registry";

const S = (n) => Array.from({ length: 12 }, (_, i) => n + Math.round(Math.sin(i * 1.3) * n * 0.05 + i * n * 0.004));
export const KPI_DEFS = [
  { key: "agents", label: "Active agents", always: true, calc: (a) => a.filter((x) => x.status !== "Draft").length, delta: "+2", spark: S(20) },
  { key: "runs", label: "AI runs", always: true, calc: (a) => a.reduce((s, x) => s + x.runs, 0), delta: "+8%", spark: S(60) },
  { key: "attn", label: "Needs attention", always: true, tone: "warn", calc: (a) => a.filter((x) => x.status === "Attention").length, delta: "+1", spark: S(10) },
  { key: "oee", label: "Avg OEE %", fn: ["Manufacturing", "Engineering"], calc: () => 78.4, delta: "+1.2", spark: S(78) },
  { key: "yield", label: "Batch yield %", fn: ["Manufacturing"], calc: () => 96.1, delta: "-0.3", tone: "warn", spark: S(96) },
  { key: "dev", label: "Open deviations", fn: ["Quality"], tone: "warn", calc: () => 12, delta: "-3", spark: S(14) },
  { key: "rft", label: "Right-first-time %", fn: ["Quality"], calc: () => 91.7, delta: "+0.9", spark: S(91) },
  { key: "otif", label: "OTIF %", fn: ["Supply chain", "Sales"], calc: () => 94.3, delta: "+0.5", spark: S(94) },
  { key: "stock", label: "Stock-out risk SKUs", fn: ["Supply chain"], tone: "warn", calc: () => 7, delta: "+2", spark: S(6) },
  { key: "mtbf", label: "MTBF (hrs)", fn: ["Engineering"], calc: () => 640, delta: "+24", spark: S(620) },
];

export const INSIGHTS = [
  { id: "i1", fn: "Manufacturing", sev: "High", conf: 92, text: "Line 3 tablet press: yield dropped 0.8% over 3 batches. Likely cause: compression force drift.", agent: "KPI Analyzer" },
  { id: "i2", fn: "Quality", sev: "Medium", conf: 85, text: "4 deviations share the same root cause (cleaning validation, Baddi Sterile).", agent: "CAPA Assistant" },
  { id: "i3", fn: "Supply chain", sev: "Medium", conf: 88, text: "7 SKUs forecast to stock out within 21 days. API lead time increased.", agent: "Demand Forecaster" },
  { id: "i4", fn: "Engineering", sev: "Low", conf: 79, text: "Granulator vibration trending up. Schedule PM in the next 10 days.", agent: "Equipment Health" },
];
