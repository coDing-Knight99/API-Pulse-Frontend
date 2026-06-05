import { Braces, Clock3, Copy, Gauge } from "lucide-react";

function highlightedJson(value) {
  return JSON.stringify(value, null, 2)
    .split("\n")
    .map((line, lineIndex) => (
      <span key={lineIndex} className="block">
        {line.split(/("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(?=\s*:)|"(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"|true|false|null|-?\d+(?:\.\d+)?)/g).map((part, partIndex) => {
          let className = "text-slate-300";

          if (/^"/.test(part) && /"$/.test(part) && line.includes(`${part}:`)) {
            className = "text-purple-300";
          } else if (/^"/.test(part)) {
            className = "text-emerald-300";
          } else if (/true|false/.test(part)) {
            className = "text-amber-300";
          } else if (/null/.test(part)) {
            className = "text-rose-300";
          } else if (/^-?\d/.test(part)) {
            className = "text-sky-300";
          }

          return (
            <span key={`${lineIndex}-${partIndex}`} className={className}>
              {part}
            </span>
          );
        })}
      </span>
    ));
}

export default function ApiSandboxResponseViewer({ response }) {
  const statusTone =
    response.status >= 500
      ? "bg-rose-400/10 text-rose-300 ring-rose-400/20"
      : response.status >= 400
        ? "bg-amber-400/10 text-amber-300 ring-amber-400/20"
        : "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20";

  return (
    <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-5 shadow-2xl shadow-black/10 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-300">Response</p>
          <h2 className="mt-1 text-xl font-bold text-white">Viewer</h2>
        </div>
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#20202a] px-3 text-sm font-semibold text-slate-300 transition hover:bg-[#151521] hover:text-white"
        >
          <Copy size={16} />
          Copy JSON
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Gauge size={16} />
            <p className="text-xs font-semibold uppercase tracking-wide">Status</p>
          </div>
          <span className={`mt-3 inline-flex rounded-lg px-2 py-1 text-sm font-bold ring-1 ${statusTone}`}>
            {response.status} {response.statusText}
          </span>
        </div>
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock3 size={16} />
            <p className="text-xs font-semibold uppercase tracking-wide">Latency</p>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">{response.latency} ms</p>
        </div>
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Braces size={16} />
            <p className="text-xs font-semibold uppercase tracking-wide">Payload</p>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">{response.size}</p>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-[#20202a] bg-[#08080d]">
        <div className="flex items-center justify-between border-b border-[#20202a] px-4 py-3">
          <p className="text-sm font-semibold text-white">JSON response</p>
          <span className="rounded-lg bg-purple-500/15 px-2 py-1 text-xs font-semibold text-purple-200 ring-1 ring-purple-400/25">
            application/json
          </span>
        </div>
        <pre className="max-h-[34rem] overflow-auto p-4 font-mono text-sm leading-6">
          <code>{highlightedJson(response.body)}</code>
        </pre>
      </div>
    </section>
  );
}
