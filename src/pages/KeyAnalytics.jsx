import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  KeyRound,
  ShieldAlert,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const statusFamilyColors = {
  "2xx": "#22c55e",
  "3xx": "#38bdf8",
  "4xx": "#f59e0b",
  "5xx": "#f43f5e",
  Other: "#8b5cf6",
};

const chartAxisTick = {
  fill: "#94a3b8",
  fontSize: 12,
  fontWeight: 500,
};

const toneClasses = {
  purple: "bg-purple-500/12 text-purple-300 ring-purple-400/25",
  cyan: "bg-cyan-400/10 text-cyan-300 ring-cyan-400/20",
  rose: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
  amber: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  emerald: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
};

const chartTooltipStyle = {
  backgroundColor: "#09090f",
  border: "1px solid #20202a",
  borderRadius: "8px",
  boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
  color: "#f8fafc",
};

const chartTooltipLabelStyle = {
  color: "#cbd5e1",
  fontSize: 12,
  fontWeight: 700,
};

const chartTooltipItemStyle = {
  fontSize: 12,
  fontWeight: 600,
};

const sampleKeyAnalytics = {
  key: {
    name: "Production Gateway Key",
    tier: "Pro",
    status: "Active",
    prefix: "apip_live_7K9F",
    createdAt: "2026-05-17T10:30:00.000Z",
  },
  metrics: {
    requests: 18420,
    errors: 326,
    avglatency: 142.74,
    rateLimited: 91,
    "statusCode:200": 15210,
    "statusCode:201": 1824,
    "statusCode:301": 169,
    "statusCode:400": 211,
    "statusCode:401": 82,
    "statusCode:429": 91,
    "statusCode:500": 31,
  },
  hourlyRequests: [
    { hour: 0, requests: 480 },
    { hour: 3, requests: 370 },
    { hour: 6, requests: 620 },
    { hour: 9, requests: 1380 },
    { hour: 12, requests: 1760 },
    { hour: 15, requests: 2140 },
    { hour: 18, requests: 1880 },
    { hour: 21, requests: 970 },
  ],
  hourlyLatency: [
    { hour: 0, latency: 118 },
    { hour: 3, latency: 126 },
    { hour: 6, latency: 132 },
    { hour: 9, latency: 148 },
    { hour: 12, latency: 161 },
    { hour: 15, latency: 154 },
    { hour: 18, latency: 139 },
    { hour: 21, latency: 128 },
  ],
  hourlyErrors: [
    { hour: 0, errors: 8 },
    { hour: 3, errors: 5 },
    { hour: 6, errors: 11 },
    { hour: 9, errors: 34 },
    { hour: 12, errors: 48 },
    { hour: 15, errors: 55 },
    { hour: 18, errors: 42 },
    { hour: 21, errors: 17 },
  ],
  dailyRequests: [
    { day: "Mon", requests: 2140 },
    { day: "Tue", requests: 2380 },
    { day: "Wed", requests: 2610 },
    { day: "Thu", requests: 2490 },
    { day: "Fri", requests: 2860 },
    { day: "Sat", requests: 1780 },
    { day: "Sun", requests: 1510 },
  ],
  dailyErrors: [
    { day: "Mon", errors: 34 },
    { day: "Tue", errors: 41 },
    { day: "Wed", errors: 38 },
    { day: "Thu", errors: 46 },
    { day: "Fri", errors: 57 },
    { day: "Sat", errors: 28 },
    { day: "Sun", errors: 21 },
  ],
  logs: [
    {
      id: "req-1",
      timestamp: "2026-06-05T09:18:00.000Z",
      method: "GET",
      path: "/v1/orders",
      statusCode: 200,
      responseTime: "124 ms",
      ip: "103.48.12.44",
    },
    {
      id: "req-2",
      timestamp: "2026-06-05T09:14:00.000Z",
      method: "POST",
      path: "/v1/payments",
      statusCode: 201,
      responseTime: "188 ms",
      ip: "103.48.12.45",
    },
    {
      id: "req-3",
      timestamp: "2026-06-05T09:08:00.000Z",
      method: "GET",
      path: "/v1/customers",
      statusCode: 429,
      responseTime: "96 ms",
      ip: "103.48.12.47",
    },
    {
      id: "req-4",
      timestamp: "2026-06-05T08:57:00.000Z",
      method: "DELETE",
      path: "/v1/orders/743",
      statusCode: 401,
      responseTime: "72 ms",
      ip: "103.48.12.51",
    },
  ],
};

function ChartEmptyState() {
  return (
    <div className="flex h-full min-h-52 items-center justify-center rounded-lg border border-dashed border-[#20202a] bg-[#08080d]/70 px-4 text-center">
      <p className="text-sm font-medium text-slate-500">No chart data available yet.</p>
    </div>
  );
}

function MetricCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="min-h-36 rounded-lg border border-[#20202a] bg-[#0b0b12] p-5 shadow-2xl shadow-black/10 transition hover:border-purple-400/25 hover:bg-[#101018]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-400">{item.label}</p>
          <p className="mt-4 text-3xl font-bold tracking-tight text-white">{item.value}</p>
        </div>
        <div className={`rounded-lg p-3 ring-1 ${toneClasses[item.tone]}`}>
          <Icon size={20} />
        </div>
      </div>
    </article>
  );
}

function ChartPanel({ title, description, children }) {
  return (
    <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-5 shadow-2xl shadow-black/10">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        <BarChart3 size={20} className="shrink-0 text-purple-300" />
      </div>
      <div className="h-72 w-full sm:h-80">{children}</div>
    </section>
  );
}

function statusClass(status) {
  if (status >= 500) return "bg-rose-400/10 text-rose-300";
  if (status === 429) return "bg-cyan-400/10 text-cyan-300";
  if (status >= 400) return "bg-amber-400/10 text-amber-300";
  return "bg-emerald-400/10 text-emerald-300";
}

function getStatusCodePieData(metrics) {
  if (!metrics) return [];

  const groupedStatuses = Object.entries(metrics)
    .filter(([key]) => key.startsWith("statusCode:"))
    .reduce((acc, [key, value]) => {
      const statusCode = Number(key.replace("statusCode:", ""));
      const family =
        statusCode >= 200 && statusCode < 600
          ? `${Math.floor(statusCode / 100)}xx`
          : "Other";

      acc[family] = (acc[family] || 0) + Number(value || 0);
      return acc;
    }, {});

  return Object.entries(groupedStatuses)
    .map(([name, value]) => ({
      name,
      value,
      color: statusFamilyColors[name] || statusFamilyColors.Other,
    }))
    .filter((item) => item.value > 0);
}

export default function KeyAnalytics({ keyId: keyIdProp, analyticsData }) {
  const params = useParams();
  const keyId = keyIdProp ?? params.keyId ?? "selected-key";
  const [keyAnalytics] = useState(analyticsData ?? sampleKeyAnalytics);
  const metrics = keyAnalytics.metrics;
  const totalRequests = metrics.requests || 0;
  const totalErrors = metrics.errors || 0;
  const errorRate = totalRequests ? ((totalErrors / totalRequests) * 100).toFixed(2) : "0.00";
  const successRate = (100 - Number(errorRate)).toFixed(2);

  const metricCards = [
    { label: "Total Requests", value: totalRequests.toLocaleString(), icon: Activity, tone: "purple" },
    { label: "Average Latency", value: `${metrics.avglatency.toFixed(2)} ms`, icon: Clock3, tone: "cyan" },
    { label: "Error Rate", value: `${errorRate}%`, icon: AlertTriangle, tone: "rose" },
    { label: "Rate-Limited Requests", value: metrics.rateLimited.toLocaleString(), icon: ShieldAlert, tone: "amber" },
    { label: "Success Rate", value: `${successRate}%`, icon: CheckCircle2, tone: "emerald" },
  ];

  const statusCodePieData = useMemo(() => getStatusCodePieData(metrics), [metrics]);

  return (
    <main className="lg:ml-72">
      <section className="mx-auto max-w-[1440px] space-y-8 px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-300">API key analytics</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Key Performance</h1>
            <p className="mt-1 text-sm text-slate-400">Per-key traffic, latency, failures, and rate-limit activity.</p>
          </div>

          <div className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-4 shadow-2xl shadow-black/10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15 text-purple-300 ring-1 ring-purple-400/25">
                <KeyRound size={18} />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-white">{keyAnalytics.key.name}</p>
                  <span className="rounded-lg bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                    {keyAnalytics.key.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {keyAnalytics.key.prefix} · {keyAnalytics.key.tier} · {keyId}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {metricCards.map((item) => (
            <MetricCard key={item.label} item={item} />
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          <ChartPanel title="Hourly Request Volume" description="Request count authenticated by this key.">
            {keyAnalytics.hourlyRequests.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={keyAnalytics.hourlyRequests} margin={{ top: 12, right: 20, left: 0, bottom: 10 }}>
                  <defs>
                    <linearGradient id="keyRequestVolume" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#20202a" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={chartAxisTick} />
                  <YAxis axisLine={false} tickLine={false} tick={chartAxisTick} width={42} />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    labelStyle={chartTooltipLabelStyle}
                    itemStyle={{ ...chartTooltipItemStyle, color: "#c084fc" }}
                    cursor={{ stroke: "#a855f7", strokeWidth: 1, strokeDasharray: "4 4" }}
                    formatter={(value) => [value.toLocaleString(), "Requests"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="#a855f7"
                    strokeWidth={3}
                    fill="url(#keyRequestVolume)"
                    dot={false}
                    activeDot={{ r: 6, fill: "#c084fc", stroke: "#ffffff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState />
            )}
          </ChartPanel>

          <ChartPanel title="Status Code Distribution" description="Response share by status code family.">
            {statusCodePieData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
                  <Pie
                    data={statusCodePieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="54%"
                    outerRadius="78%"
                    paddingAngle={3}
                    stroke="#0b0b12"
                    strokeWidth={3}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusCodePieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    labelStyle={chartTooltipLabelStyle}
                    itemStyle={chartTooltipItemStyle}
                    formatter={(value, name) => [value.toLocaleString(), name]}
                  />
                  <Legend
                    iconType="circle"
                    verticalAlign="bottom"
                    height={28}
                    formatter={(value) => (
                      <span className="text-xs font-semibold text-slate-300">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState />
            )}
          </ChartPanel>

          <ChartPanel title="Hourly Average Latency" description="Average response time in milliseconds.">
            {keyAnalytics.hourlyLatency.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={keyAnalytics.hourlyLatency} margin={{ top: 12, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid stroke="#20202a" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={chartAxisTick} />
                  <YAxis axisLine={false} tickLine={false} tick={chartAxisTick} width={42} />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    labelStyle={chartTooltipLabelStyle}
                    itemStyle={{ ...chartTooltipItemStyle, color: "#22d3ee" }}
                    cursor={{ stroke: "#22d3ee", strokeWidth: 1, strokeDasharray: "4 4" }}
                    formatter={(value) => [`${Number(value).toFixed(2)} ms`, "Latency"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="latency"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={{ r: 3, fill: "#22d3ee", stroke: "#0b0b12", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#67e8f9", stroke: "#ffffff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState />
            )}
          </ChartPanel>

          <ChartPanel title="Hourly Errors" description="Failed requests authenticated by this key.">
            {keyAnalytics.hourlyErrors.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={keyAnalytics.hourlyErrors} margin={{ top: 12, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid stroke="#20202a" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={chartAxisTick} />
                  <YAxis axisLine={false} tickLine={false} tick={chartAxisTick} width={42} />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    labelStyle={chartTooltipLabelStyle}
                    itemStyle={{ ...chartTooltipItemStyle, color: "#fb7185" }}
                    cursor={{ stroke: "#fb7185", strokeWidth: 1, strokeDasharray: "4 4" }}
                    formatter={(value) => [value.toLocaleString(), "Errors"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="errors"
                    stroke="#fb7185"
                    strokeWidth={3}
                    dot={{ r: 3, fill: "#fb7185", stroke: "#0b0b12", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#fda4af", stroke: "#ffffff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState />
            )}
          </ChartPanel>

          <ChartPanel title="Daily Request Volume" description="Last 7 days of requests for this key.">
            {keyAnalytics.dailyRequests.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={keyAnalytics.dailyRequests} margin={{ top: 12, right: 20, left: 0, bottom: 10 }}>
                  <defs>
                    <linearGradient id="keyDailyRequestVolume" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#20202a" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={chartAxisTick} />
                  <YAxis axisLine={false} tickLine={false} tick={chartAxisTick} width={42} />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    labelStyle={chartTooltipLabelStyle}
                    itemStyle={{ ...chartTooltipItemStyle, color: "#c084fc" }}
                    cursor={{ stroke: "#a855f7", strokeWidth: 1, strokeDasharray: "4 4" }}
                    formatter={(value) => [value.toLocaleString(), "Requests"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="#a855f7"
                    strokeWidth={3}
                    fill="url(#keyDailyRequestVolume)"
                    dot={false}
                    activeDot={{ r: 6, fill: "#c084fc", stroke: "#ffffff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState />
            )}
          </ChartPanel>

          <ChartPanel title="Daily Errors" description="Last 7 days of failed requests for this key.">
            {keyAnalytics.dailyErrors.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={keyAnalytics.dailyErrors} margin={{ top: 12, right: 20, left: 0, bottom: 10 }}>
                  <defs>
                    <linearGradient id="keyDailyErrorVolume" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#f87171" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#f87171" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#20202a" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={chartAxisTick} />
                  <YAxis axisLine={false} tickLine={false} tick={chartAxisTick} width={42} />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    labelStyle={chartTooltipLabelStyle}
                    itemStyle={{ ...chartTooltipItemStyle, color: "#f87171" }}
                    cursor={{ stroke: "#f87171", strokeWidth: 1, strokeDasharray: "4 4" }}
                    formatter={(value) => [value.toLocaleString(), "Errors"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="errors"
                    stroke="#f87171"
                    strokeWidth={3}
                    fill="url(#keyDailyErrorVolume)"
                    dot={false}
                    activeDot={{ r: 6, fill: "#fda4af", stroke: "#ffffff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState />
            )}
          </ChartPanel>
        </section>

        <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent Key Requests</h2>
              <p className="mt-1 text-sm text-slate-400">Latest request activity authenticated by this API key.</p>
            </div>
            <Activity size={20} className="text-purple-300" />
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="border-b border-[#20202a] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-3 pr-4 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Method</th>
                  <th className="px-4 py-3 font-semibold">Path</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Latency</th>
                  <th className="py-3 pl-4 font-semibold">Client IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#20202a] text-slate-300">
                {keyAnalytics.logs.map((request) => (
                  <tr key={request.id} className="transition hover:bg-[#101018]">
                    <td className="py-3 pr-4 text-slate-500">
                      {request.timestamp
                        ? new Date(request.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                        : null}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-purple-400/10 px-2 py-1 text-xs font-semibold text-purple-300">
                        {request.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-200">{request.path}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-lg px-2 py-1 text-xs font-semibold ${statusClass(request.statusCode)}`}>
                        {request.statusCode}
                      </span>
                    </td>
                    <td className="px-4 py-3">{request.responseTime}</td>
                    <td className="py-3 pl-4 text-slate-400">{request.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
