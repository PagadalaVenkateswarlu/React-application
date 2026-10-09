// Agent registry: ONE line per agent. Add new agents here (or load from your API).
// [id, name, function, plant, status, sub-agents, extra data sources]
const SRC = {
  Manufacturing: ["MES", "Historian", "SCADA"], Quality: ["QMS", "LIMS", "eBMR"],
  "Supply chain": ["SAP", "Warehouse", "Market feed"], Sales: ["CRM", "SAP"], Engineering: ["CMMS", "IoT", "SCADA"],
};
const R = [
  ["a01", "KPI Analyzer", "Manufacturing", "Hyderabad OSD", "Live", ["OEE Tracker", "Yield Monitor", "Downtime Reasoner"], ["SAP", "LIMS"]],
  ["a02", "Batch Yield Optimizer", "Manufacturing", "Vizag API", "Live", ["Loss Analysis", "Parameter Tuning"]],
  ["a03", "Process Deviation Monitor", "Manufacturing", "Hyderabad OSD", "Live", ["Alarm Triage", "Trend Alerts"]],
  ["a04", "Line Scheduler", "Manufacturing", "Baddi Sterile", "Live", ["Changeover Planner"]],
  ["a05", "Granulation Advisor", "Manufacturing", "Hyderabad OSD", "Attention", ["Moisture Control", "Endpoint Detection"]],
  ["a06", "Packaging Line Assistant", "Manufacturing", "Baddi Sterile", "Draft", ["Serialization Check"]],
  ["a07", "Batch Record Reviewer", "Quality", "Vizag API", "Live", ["Deviation Finder", "BMR Completeness"]],
  ["a08", "CAPA Assistant", "Quality", "Baddi Sterile", "Attention", ["Root Cause", "Effectiveness Check"]],
  ["a09", "Deviation Investigator", "Quality", "Hyderabad OSD", "Live", ["Similar Case Search", "Impact Assessment"]],
  ["a10", "Stability Study Tracker", "Quality", "Vizag API", "Live", ["Pull Schedule", "Trend Report"]],
  ["a11", "Audit Readiness", "Quality", "All plants", "Live", ["Gap Scanner", "Inspection Q&A"]],
  ["a12", "Change Control Assistant", "Quality", "All plants", "Live", ["Impact Review"]],
  ["a13", "Lab Results Reviewer", "Quality", "Hyderabad OSD", "Draft", ["OOS Screening"]],
  ["a14", "Demand Forecaster", "Supply chain", "All plants", "Live", ["SKU Forecast", "Safety Stock"]],
  ["a15", "Inventory Optimizer", "Supply chain", "Vizag API", "Live", ["Reorder Points", "Expiry Watch"]],
  ["a16", "Supplier Risk Monitor", "Supply chain", "All plants", "Attention", ["Lead Time Alerts", "Vendor Scorecard"]],
  ["a17", "Cold Chain Monitor", "Supply chain", "Baddi Sterile", "Live", ["Excursion Alerts"]],
  ["a18", "Procurement Assistant", "Supply chain", "Hyderabad OSD", "Draft", ["PO Drafting"]],
  ["a19", "Sales Insights", "Sales", "All plants", "Draft", ["Region Trends"]],
  ["a20", "Tender Assistant", "Sales", "All plants", "Live", ["Bid Drafting", "Price Benchmark"]],
  ["a21", "Market Trend Analyzer", "Sales", "All plants", "Live", ["Competitor Watch"]],
  ["a22", "Equipment Health", "Engineering", "Hyderabad OSD", "Live", ["Vibration Alerts", "PM Scheduler"]],
  ["a23", "Maintenance Planner", "Engineering", "Vizag API", "Live", ["Work Order Priority", "Spare Parts"]],
  ["a24", "Calibration Tracker", "Engineering", "Baddi Sterile", "Live", ["Due Date Alerts"]],
  ["a25", "Energy Optimizer", "Engineering", "Vizag API", "Draft", ["Boiler Efficiency"]],
  ["a26", "Utilities Monitor", "Engineering", "Hyderabad OSD", "Live", ["Water System", "HVAC"]],
];
export const AGENTS = R.map(([id, name, fn, plant, status, subs, extra = []], i) => ({
  id, name, fn, plant, status, subs, sources: [...SRC[fn], ...extra],
  runs: status === "Draft" ? 0 : 40 + ((i * 53) % 380),
  health: status === "Draft" ? 0 : status === "Attention" ? 58 + i : 84 + (i % 15),
  last: status === "Draft" ? "-" : `${5 + ((i * 7) % 50)} min ago`,
}));
