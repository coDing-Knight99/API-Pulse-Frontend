import { AlertTriangle, Server, Trash2, X } from "lucide-react";

const ServiceDeleteConfirm = ({ service, onConfirm, onCancel }) => {
  const serviceName = service?.service_name || "this service";
  const serviceUrl = service?.url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-service-title"
      onClick={onCancel}
    >
      <section
        className="w-full max-w-md rounded-lg border border-rose-400/20 bg-[#0b0b12] p-5 shadow-2xl shadow-black/60 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-rose-400/10 text-rose-300 ring-1 ring-rose-400/25">
              <AlertTriangle size={22} />
            </span>
            <div>
              <h2 id="delete-service-title" className="text-xl font-bold text-white">
                Delete service?
              </h2>
              <p className="mt-1 text-sm text-slate-400">This removes the service from your registry.</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close delete service confirmation"
            onClick={onCancel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#151521] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 rounded-lg border border-[#20202a] bg-[#08080d] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <Server size={16} className="text-purple-300" />
            <span className="break-all">{serviceName}</span>
          </div>
          {serviceUrl && <p className="mt-2 break-all text-xs text-slate-500">{serviceUrl}</p>}
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-400">
          Deleting a service can affect routes, logs, and analytics linked to it. Make sure no active clients depend on it.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#20202a] px-4 text-sm font-semibold text-slate-300 transition hover:bg-[#151521] hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-rose-500 px-4 text-sm font-semibold text-white transition hover:bg-rose-400"
          >
            <Trash2 size={16} />
            Delete service
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServiceDeleteConfirm;
