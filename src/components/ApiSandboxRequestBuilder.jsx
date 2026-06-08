import { ChevronDown, Plus, Send, Trash2 } from "lucide-react";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const methodClasses = {
  GET: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  POST: "bg-purple-500/15 text-purple-200 ring-purple-400/25",
  PUT: "bg-sky-400/10 text-sky-300 ring-sky-400/20",
  PATCH: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  DELETE: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
};

export default function ApiSandboxRequestBuilder({
  method,
  setMethod,
  url,
  setUrl,
  queryParams,
  setQueryParams,
  headers,
  setHeaders,
  body,
  setBody,
  onSend,
}) {
  function updateHeader(index, field, value) {
    setHeaders((currentHeaders) =>
      currentHeaders.map((header, headerIndex) =>
        headerIndex === index ? { ...header, [field]: value } : header,
      ),
    );
  }

  function addHeader() {
    setHeaders((currentHeaders) => [...currentHeaders, { key: "", value: "" }]);
  }

  function removeHeader(index) {
    setHeaders((currentHeaders) => currentHeaders.filter((_, headerIndex) => headerIndex !== index));
  }

  function updateQueryParam(index, field, value) {
    setQueryParams((currentParams) =>
      currentParams.map((param, paramIndex) =>
        paramIndex === index ? { ...param, [field]: value } : param,
      ),
    );
  }

  function addQueryParam() {
    setQueryParams((currentParams) => [...currentParams, { key: "", value: "" }]);
  }

  function removeQueryParam(index) {
    setQueryParams((currentParams) => currentParams.filter((_, paramIndex) => paramIndex !== index));
  }

  return (
    <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-5 shadow-2xl shadow-black/10 sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
        <div className="grid gap-2 xl:w-44">
          <span className="text-sm font-semibold text-slate-300">Method</span>
          <div className="relative">
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className={`h-12 w-full appearance-none rounded-lg border border-[#20202a] bg-[#08080d] px-4 pr-10 text-sm font-bold outline-none ring-1 transition focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/20 ${methodClasses[method]}`}
            >
              {methods.map((item) => (
                <option key={item} value={item} className="bg-[#08080d] text-slate-100">
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        <label className="grid flex-1 gap-2">
          <span className="text-sm font-semibold text-slate-300">Request URL</span>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value.trim())}
            type="text"
            placeholder="https://api.example.com/v1/users"
            className="h-12 w-full rounded-lg border border-[#20202a] bg-[#08080d] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10"
          />
        </label>

        <button
          type="button"
          onClick={onSend}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-purple-500 px-5 text-sm font-semibold text-white shadow-lg shadow-purple-950/30 transition hover:bg-purple-400"
        >
          <Send size={17} />
          Send
        </button>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Query Params</h2>
              <p className="mt-1 text-xs text-slate-500">Append URL parameters as key-value pairs.</p>
            </div>
            <button
              type="button"
              onClick={addQueryParam}
              aria-label="Add query parameter"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#20202a] text-slate-300 transition hover:border-purple-400/40 hover:bg-[#151521] hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="mt-4 grid gap-3">
            {queryParams.map((param, index) => (
              <div key={index} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_2.25rem]">
                <input
                  value={param.key}
                  onChange={(event) => updateQueryParam(index, "key", event.target.value)}
                  type="text"
                  placeholder="Parameter"
                  className="h-10 rounded-lg border border-[#20202a] bg-[#0b0b12] px-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-purple-400/70"
                />
                <input
                  value={param.value}
                  onChange={(event) => updateQueryParam(index, "value", event.target.value)}
                  type="text"
                  placeholder="Value"
                  className="h-10 rounded-lg border border-[#20202a] bg-[#0b0b12] px-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-purple-400/70"
                />
                <button
                  type="button"
                  onClick={() => removeQueryParam(index)}
                  aria-label="Remove query parameter"
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-[#20202a] text-slate-500 transition hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-300"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Headers</h2>
              <p className="mt-1 text-xs text-slate-500">Add key-value pairs for the request.</p>
            </div>
            <button
              type="button"
              onClick={addHeader}
              aria-label="Add header"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#20202a] text-slate-300 transition hover:border-purple-400/40 hover:bg-[#151521] hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="mt-4 grid gap-3">
            {headers.map((header, index) => (
              <div key={index} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_2.25rem]">
                <input
                  value={header.key}
                  onChange={(event) => updateHeader(index, "key", event.target.value)}
                  type="text"
                  placeholder="Header"
                  className="h-10 rounded-lg border border-[#20202a] bg-[#0b0b12] px-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-purple-400/70"
                />
                <input
                  value={header.value}
                  onChange={(event) => updateHeader(index, "value", event.target.value)}
                  type="text"
                  placeholder="Value"
                  className="h-10 rounded-lg border border-[#20202a] bg-[#0b0b12] px-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-purple-400/70"
                />
                <button
                  type="button"
                  onClick={() => removeHeader(index)}
                  aria-label="Remove header"
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-[#20202a] text-slate-500 transition hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-300"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <label className="grid gap-3 rounded-lg border border-[#20202a] bg-[#08080d] p-4 xl:col-span-2">
          <span>
            <span className="block text-sm font-semibold text-white">JSON Body</span>
            <span className="mt-1 block text-xs text-slate-500">Available for POST, PUT, PATCH, and DELETE requests.</span>
          </span>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            spellCheck="false"
            className="min-h-56 resize-y rounded-lg border border-[#20202a] bg-[#0b0b12] p-4 font-mono text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10"
          />
        </label>
      </div>
    </section>
  );
}
