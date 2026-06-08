import { useState, useEffect } from "react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  Copy,
  KeyRound,
  Plus,
  ShieldCheck,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import Navbar from "../components/Navbar";
const toneClasses = {
  purple: "bg-purple-500/12 text-purple-300 ring-purple-400/25",
  emerald: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  amber: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  rose: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
};

const statusClasses = {
  Active: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  Revoked: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
};

const apiKeyPlans = [
  {
    name: "Starter",
    price: "₹0",
    cadence: "/mo",
    description: "For testing and low-volume services.",
    tone: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  },
  {
    name: "Pro",
    price: "₹1,499",
    cadence: "/mo",
    description: "For production services with steady traffic.",
    tone: "border-purple-400/30 bg-purple-500/15 text-purple-200",
  },
  {
    name: "Enterprise",
    price: "₹4,999",
    cadence: "/mo",
    description: "For high-volume teams and critical APIs.",
    tone: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  },
];


function UsageChart({ values }) {
  const maxValue = Math.max(...values);

  return (
    <div className="flex h-24 items-end gap-2">
      {values.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="flex-1 rounded-t bg-purple-500/80"
          style={{ height: `${Math.max((value / maxValue) * 100, 8)}%` }}
        />
      ))}
    </div>
  );
}

function KeyCard({ apiKey,revokeKey }) {
  return (
    <article className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/10 transition hover:border-purple-400/25 hover:bg-[#101018]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-white">{apiKey.name}</h2>
            <span className={`rounded-lg px-2 py-1 text-xs font-semibold ring-1 ${statusClasses[apiKey.isActive ? 'Active' : 'Revoked']}`}>
              {apiKey.isActive ? 'Active' : 'Revoked'}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-400">
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {apiKey.isActive && (
            <Link
              to={`/api-keys/${apiKey._id}/analytics`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-purple-400/30 px-3 text-sm font-semibold text-purple-300 transition hover:bg-purple-400/10"
            >
              <BarChart3 size={16} />
              Analytics
          </Link>)}

        {apiKey.isActive && (
          <button
            onClick={() => {
              revokeKey(apiKey._id);
            }}
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-rose-400/30 px-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-400/10"
        >
          <Trash2 size={16} />
          Revoke key
        </button>)}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-3">
          <p className="text-xs font-medium text-slate-500">Name</p>
          <p className="mt-2 font-semibold text-white">{apiKey.name}</p>
        </div>
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-3">
          <p className="text-xs font-medium text-slate-500">Tier</p>
          <p className="mt-2 font-semibold text-white">{apiKey.tier}</p>
        </div>
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-3">
          <p className="text-xs font-medium text-slate-500">Created date</p>
          <p className="mt-2 font-semibold text-white">{new Date(apiKey.createDate).toISOString().split('T')[0]}</p>
        </div>
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-3">
          <p className="text-xs font-medium text-slate-500">Request count</p>
          <p className="mt-2 font-semibold text-white">{apiKey.requestsCount}</p>
        </div>
      </div>

      {/* <div className="mt-5 rounded-lg border border-[#20202a] bg-[#08080d] p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Usage chart</p>
          <span className="text-xs text-slate-500">Last 7 days</span>
        </div>
        <UsageChart values={apiKey.usage} />
      </div> */}
    </article>
  );
}

function GenerateKeyModal({ onClose, setLoader }) {
  const [apiKeyName, setApiKeyName] = useState("");
  const [apiKeyTier, setApiKeyTier] = useState("");
  const handleGenerate = async () => {
    try {
      await axios.post("http://localhost:3000/create-api-key", {
        name: apiKeyName,
        tier: apiKeyTier
      },{
        withCredentials: true,
      });
      setLoader(true);
      await fetchApiKeys();
      await fetchlogs();
      setLoader(false);
    }
    catch (error) {
      console.error("Error generating API key:", error);
    }
  };
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
      <section onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-[#20202a] bg-[#0b0b12] p-5 shadow-2xl shadow-black sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Generate Key</h2>
            <p className="mt-1 text-sm text-slate-400">Create a scoped API key for a tenant or service.</p>
          </div>
          <button

            type="button"
            aria-label="Close generate key modal"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#151521] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm">
            <span className="font-medium text-slate-300">Key name</span>
            <input
              value={apiKeyName}
              onChange={(e) => setApiKeyName(e.target.value)}
              type="text"
              placeholder="Production Orders Key"
              className="h-11 rounded-lg border border-[#20202a] bg-[#08080d] px-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10"
            />
          </label>

          <div className="grid gap-3">
            <div>
              <p className="text-sm font-medium text-slate-300">Select Tier</p>
              <p className="mt-1 text-xs text-slate-500">Prices are shown in INR.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {apiKeyPlans.map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => setApiKeyTier(plan.name)}
                  className={`rounded-lg border hover:${plan.tone}/70 p-4 ring-1 ring-inset ring-white/5 ${plan.tone} ${apiKeyTier === plan.name ? "shadow-lg shadow-purple-500/20 scale-105 transition-transform" : "cursor-pointer"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-white">{plan.name}</p>
                    {plan.name === "Pro" && (
                      <span className="rounded-full bg-purple-400/20 px-2 py-0.5 text-[11px] font-semibold text-purple-100">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-end gap-1">
                    <p className="text-2xl font-bold tracking-tight text-white">{plan.price}</p>
                    <p className="pb-1 text-xs text-slate-400">{plan.cadence}</p>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-400">{plan.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-[#20202a] px-4 text-sm font-semibold text-slate-300 transition hover:bg-[#151521] hover:text-white"
            >
            Cancel
          </button>
          <button
            type="button"
            onClick={async () => {
              setLoader(true);
              await handleGenerate();
              setLoader(false);
              onClose();
            }
          }
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-purple-500 px-4 text-sm font-semibold text-white transition hover:bg-purple-400"
          >
            <Zap size={16} />
            Generate key
          </button>
        </div>
      </section>
    </div>
  );
}

function RecentRequests({requests}) {
  return (
    <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/10">
      <Navbar/>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Recent requests</h2>
          <p className="mt-1 text-sm text-slate-400">Latest gateway traffic authenticated by API keys.</p>
        </div>
        <CalendarDays size={20} className="text-purple-300" />
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-[#20202a] text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-3 pr-4 font-semibold">Time</th>
              <th className="px-4 py-3 font-semibold">Key</th>
              <th className="px-4 py-3 font-semibold">Route</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="py-3 pl-4 font-semibold">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#20202a] text-slate-300">
            {requests.map((request) => (
              <tr key={request._id} className="transition hover:bg-[#101018]">
                <td className="py-3 pr-4 text-slate-500">{request.timestamp?new Date(request.timestamp).toLocaleString(): ""}</td>
                <td className="px-4 py-3 font-medium text-white">{request.apiKeyName}</td>
                <td className="px-4 py-3">{request.path}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                      request.statusCode >= 400
                      ? "bg-amber-400/10 text-amber-300"
                      : "bg-emerald-400/10 text-emerald-300"
                    }`}
                    >
                    {request.statusCode}
                  </span>
                </td>
                <td className="py-3 pl-4">{request.responseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function ApiKeys() {
  const [generateOpen, setGenerateOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [apiKeys, setApiKeys] = useState([]);
  const [apiLogs, setApiLogs] = useState([]);
  const fetchApiKeys = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api-keys", {
        withCredentials: true,
      });
      console.log("Fetched API keys:", response.data);
      setApiKeys(response.data.apiKeys);
    }
    catch (error) {
      console.error("Error fetching API keys:", error);
    }
  };
  const fetchlogs= async()=>{
    try {
      const response = await axios.get("http://localhost:3000/userLogs", {
        withCredentials: true,
      });
      console.log("Fetched API logs:", response.data);
      setApiLogs(response.data.logs);
    }
    catch (error) {
      console.error("Error fetching API logs:", error);
    }
  };
  const revokeKey = async (keyId) => {
    try {
      await axios.post("http://localhost:3000/revoke-api-key", { keyId }, {
        withCredentials: true,
      });
      setLoader(true);
      await fetchApiKeys();
      await fetchlogs();
      setLoader(false);
    }
    catch (error) {
      console.error("Error revoking API key:", error);
    }
  };
   
  useEffect(() => {
    setLoader(true);
    fetchApiKeys();
    fetchlogs();
    setLoader(false);
  }, []);
  return (
    <main className="lg:ml-72">
      {loader && <Loader />}
      <section className="mx-auto max-w-[1440px] space-y-8 px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-300">Access control</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">API Keys</h1>
            <p className="mt-1 text-sm text-slate-400">Generate, inspect, and revoke gateway access keys</p>
          </div>

          <button
            type="button"
            onClick={() => setGenerateOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-purple-500 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-950/30 transition hover:bg-purple-400"
          >
            <Plus size={18} />
            Generate Key
          </button>
        </div>

        <section className="grid gap-5 2xl:grid-cols-2">
          {apiKeys.map((apiKey) => (
            <KeyCard key={apiKey._id} apiKey={apiKey} revokeKey={revokeKey} />
          ))}
        </section>

        <RecentRequests requests={apiLogs?apiLogs:[]} />
      </section>

      {generateOpen && <GenerateKeyModal onClose={() => setGenerateOpen(false)} setLoader={setLoader} />}
    </main>
  );
}
