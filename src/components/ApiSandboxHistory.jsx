import { History } from "lucide-react";

const methodTone = {
  GET: "bg-emerald-400/10 text-emerald-300",
  POST: "bg-purple-500/15 text-purple-200",
  PUT: "bg-sky-400/10 text-sky-300",
  PATCH: "bg-amber-400/10 text-amber-300",
  DELETE: "bg-rose-400/10 text-rose-300",
};
const BASE_URL = import.meta.env.BASE_URL;

export default function ApiSandboxHistory({ items, onSelect }) {
  return (
    <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-5 shadow-2xl shadow-black/10 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Request History</h2>
          <p className="mt-1 text-sm text-slate-400">Recent sandbox calls with status and timing.</p>
        </div>
        <History size={20} className="text-purple-300" />
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-[#20202a] text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-3 pr-4 font-semibold">Time</th>
              <th className="px-4 py-3 font-semibold">Method</th>
              <th className="px-4 py-3 font-semibold">Endpoint</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#20202a] text-slate-300">
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelect(item)}
                className="cursor-pointer transition hover:bg-[#101018]"
              >
                <td className="py-3 pr-4 text-slate-500">{(new Date(item.updatedAt)).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-lg px-2 py-1 text-xs font-bold ${methodTone[item.method]}`}>
                    {item.method}
                  </span>
                </td>
                <td className="max-w-md truncate px-4 py-3 font-medium text-slate-200">{item.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
