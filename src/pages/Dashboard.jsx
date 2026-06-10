import {
  Activity,
  AlertTriangle,
  Clock3,
  KeyRound,
  Loader,
  Server,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import RequestsChart from "../components/RequestsChart.jsx";
import StatusCodePieChart from "../components/StatusPieChart.jsx";
import Navbar from "../components/Navbar.jsx";

const Base_URL = import.meta.env.VITE_API_BASE_URL;
const metrics = [
  {
    label: "Total Requests",
    value: "1.28M",
    change: "+12.4%",
    trend: "up",
    icon: Activity,
    tone: "purple",
  },
  {
    label: "Average Latency",
    value: "184 ms",
    change: "-8.1%",
    trend: "down",
    icon: Clock3,
    tone: "emerald",
  },
  {
    label: "Error Rate",
    value: "1.7%",
    change: "+0.3%",
    trend: "up",
    icon: AlertTriangle,
    tone: "rose",
  },
  {
    label: "Active Services",
    value: "42",
    change: "+5",
    trend: "up",
    icon: Server,
    tone: "amber",
  },
];

const requestData = [
  { label: "Mon", value: 42000 },
  { label: "Tue", value: 56000 },
  { label: "Wed", value: 49000 },
  { label: "Thu", value: 73000 },
  { label: "Fri", value: 68000 },
  { label: "Sat", value: 82000 },
  { label: "Sun", value: 96000 },
];

const statusCodes = [
  { label: "2xx Success", value: 78, color: "#a855f7" },
  { label: "3xx Redirect", value: 9, color: "#7c3aed" },
  { label: "4xx Client", value: 10, color: "#f59e0b" },
  { label: "5xx Server", value: 3, color: "#fb7185" },
];

const secondaryMetrics = [
  {
    label: "Total API Keys",
    value: "318",
    change: "+24",
    trend: "up",
    icon: KeyRound,
    tone: "violet",
  },
  {
    label: "Rate Limit Hits",
    value: "8,942",
    change: "+6.8%",
    trend: "up",
    icon: ShieldAlert,
    tone: "orange",
  },
];

const toneClasses = {
  purple: "bg-purple-500/12 text-purple-300 ring-purple-400/25",
  emerald: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  rose: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
  amber: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  violet: "bg-violet-400/10 text-violet-300 ring-violet-400/20",
  orange: "bg-orange-400/10 text-orange-300 ring-orange-400/20",
};



function MetricTile({ metric }) {
  const Icon = metric.icon;
  const TrendIcon = metric.trend === "down" ? TrendingDown : TrendingUp;
  const lowerIsBetter = metric.label === "Error Rate" || metric.label === "Rate Limit Hits";
  const isPositive = lowerIsBetter ? metric.trend === "down" : metric.trend === "up";

  return (
    <article className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{metric.label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">{metric.value}</p>
        </div>
        <div className={`rounded-lg p-3 ring-1 ${toneClasses[metric.tone]}`}>
          <Icon size={20} />
        </div>
      </div>

      <div
        className={`mt-5 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
          isPositive ? "bg-emerald-400/10 text-emerald-300" : "bg-rose-400/10 text-rose-300"
        }`}
      >
        <TrendIcon size={14} />
        <span>{metric.change} vs last week</span>
      </div>
    </article>
  );
}



function StatusPieChart() {
  const total = statusCodes.reduce((sum, status) => sum + status.value, 0);
  const circumference = 263.89;
  const segments = statusCodes.reduce((items, status) => {
    const previousOffset = items.reduce((sum, item) => sum + item.dash, 0);
    const dash = (status.value / total) * circumference;

    return [...items, { ...status, dash, offset: previousOffset }];
  }, []);

  return (
    <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-5">
      <h2 className="text-lg font-semibold text-white">Status Codes</h2>
      <p className="mt-1 text-sm text-slate-400">Response distribution by code family</p>

      <div className="mt-6 flex flex-col items-center gap-6">
        <svg viewBox="0 0 120 120" className="h-48 w-48 -rotate-90" role="img">
          <circle cx="60" cy="60" r="42" fill="none" stroke="#20202a" strokeWidth="18" />
          {segments.map((status) => (
            <circle
              key={status.label}
              cx="60"
              cy="60"
              r="42"
              fill="none"
              stroke={status.color}
              strokeDasharray={`${status.dash} ${circumference - status.dash}`}
              strokeDashoffset={-status.offset}
              strokeLinecap="round"
              strokeWidth="18"
            />
          ))}
        </svg>

        <div className="grid w-full gap-3">
          {statusCodes.map((status) => (
            <div key={status.label} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: status.color }} />
                <span>{status.label}</span>
              </div>
              <span className="font-semibold text-white">{status.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Dashboard() {
  let [UserMetrics, setUserMetrics] = useState(null);
  let [hourlyRequests, setHourlyRequests] = useState([]);
  let [requests, setRequests] = useState(0);
  let [errorRate, setErrorRate] = useState(0);
  let [avgLatency, setAvgLatency] = useState(0);
  let [rateLimits, setRateLimits] = useState(0);
useEffect(()=> {
  const fetchUserMetrics = async () => {
  try {
    const response = await axios.get(`${Base_URL}/metrics/user`,{
      withCredentials: true
    });
    // Update state with real metrics data
    setUserMetrics(response.data);
    if(response.data.userGlobal.requests !== undefined)
    setRequests(response.data.userGlobal.requests);
    if(response.data.userGlobal.requests > 0) 
    setErrorRate((((response.data.userGlobal.errors || 0) / Math.max(response.data.userGlobal.requests, 1)) * 100).toFixed(2));
    if(response.data.userGlobal.avglatency !== undefined) {
      setAvgLatency((response.data.userGlobal.avglatency).toFixed(2)  );
    }
    if(response.data.userGlobal.rateLimited !== undefined) {
      setRateLimits(response.data.userGlobal.rateLimited);
    }
    console.log("Fetched user metrics:", response.data);
    const hourlyData = await axios.get(`${Base_URL}/metrics/userhourlyrequests`,{
      withCredentials: true
    });
    setHourlyRequests(hourlyData.data);
  } catch (error) {
    console.error("Error fetching user metrics:", error);
  }};
  fetchUserMetrics();
}, []);
  return (
    <main className="lg:ml-72">
      <section className="mx-auto max-w-[1440px] space-y-8 px-4 py-7 sm:px-6 lg:px-8">
        <Navbar/>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-300">Gateway overview</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">Traffic Metrics</h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Monitor request volume, latency, errors, and rate limits across today's API traffic.
          </p>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {/* {metrics.map((metric) => (
            <MetricTile key={metric.label} metric={metric} />
          ))} */}
          <div className="min-h-36 rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/10 transition hover:border-purple-400/30 hover:bg-[#101018]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Requests</p>
                <p className="mt-4 text-3xl font-bold tracking-tight text-white">{requests}</p>
              </div>
              <div className="rounded-lg bg-purple-500/12 p-3 text-purple-300 ring-1 ring-purple-400/25">
                <Activity size={20} />
              </div>
            </div>
          </div>
          <div className="min-h-36 rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/10 transition hover:border-emerald-400/30 hover:bg-[#101018]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">Average Latency</p>
                <p className="mt-4 text-3xl font-bold tracking-tight text-white">{avgLatency+" ms"}</p>
              </div>
              <div className="rounded-lg bg-emerald-400/10 p-3 text-emerald-300 ring-1 ring-emerald-400/20">
                <Clock3 size={20} />
              </div>
            </div>
          </div>
          <div className="min-h-36 rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/10 transition hover:border-rose-400/30 hover:bg-[#101018]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">Error Rate</p>
                <p className="mt-4 text-3xl font-bold tracking-tight text-white">{errorRate+"%"}</p>
              </div>
              <div className="rounded-lg bg-rose-400/10 p-3 text-rose-300 ring-1 ring-rose-400/20">
                <AlertTriangle size={20} />
              </div>
            </div>
          </div>
          <div className="min-h-36 rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/10 transition hover:border-amber-400/30 hover:bg-[#101018]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">Rate Limit hits</p>
                <p className="mt-4 text-3xl font-bold tracking-tight text-white">{rateLimits}</p>
              </div>
              <div className="rounded-lg bg-amber-400/10 p-3 text-amber-300 ring-1 ring-amber-400/20">
                <ShieldAlert size={20} />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(360px,1fr)]">
          <RequestsChart data={hourlyRequests} />
          <StatusCodePieChart data={UserMetrics ? UserMetrics.userGlobal : null} title="Status Codes Distribution" />
        </section>
       

      </section>
    </main>
  );
}
