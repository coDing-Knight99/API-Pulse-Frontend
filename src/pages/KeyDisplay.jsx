import { Check, Copy, KeyRound, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import {toast,ToastContainer} from "react-toastify";

const KeyDisplay = ({ apikey, setKeyDisplay }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apikey);
        setCopied(true);
        toast.success("API key copied to clipboard!");
        setTimeout(() => setCopied(false), 10000);
    };

    const handleClose = () => {
        if (copied) {
            setKeyDisplay(null);
            return;
        }

        toast.error("Please copy the API key before closing.");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm">
            <section className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[#20202a] bg-[#0B0B12] p-5 shadow-2xl shadow-black/70 sm:p-6">
                <button
                    type="button"
                    aria-label="Close API key display"
                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#151521] hover:text-white"
                    onClick={handleClose}
                >
                    <X size={18} />
                </button>

                <div className="pr-10">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/25">
                        <ShieldCheck size={22} />
                    </span>
                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        API key generated
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Store this key securely now. It will not be shown again after this window is closed.
                    </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4">
                        <p className="text-sm font-semibold text-emerald-300">Security notice</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            Copy the key before leaving this screen and keep it in a secure secret manager.
                        </p>
                    </div>

                    <div className="rounded-lg border border-amber-400/20 bg-amber-400/10 p-4">
                        <p className="text-sm font-semibold text-amber-300">Header usage</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            Access service using gateway url https://api-pulse-0fic.onrender.com/service/ + your-service-name + / + your-endpoint
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            Send it with requests using the <span className="font-semibold text-white">x-api-key</span> header.
                        </p>
                    </div>
                </div>

                <div className="mt-6 rounded-lg border border-[#20202a] bg-[#08080d] p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                        <KeyRound size={16} className="text-purple-300" />
                        <span>API key</span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                        <code className="min-h-12 overflow-x-auto whitespace-nowrap rounded-lg border border-[#20202a] bg-black px-4 py-3 text-sm text-emerald-300">
                            {apikey}
                        </code>

                        <button
                            type="button"
                            onClick={copyToClipboard}
                            className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition ${
                                copied ? "bg-emerald-500 hover:bg-emerald-400" : "bg-purple-500 hover:bg-purple-400"
                            }`}
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                            {copied ? "Copied" : "Copy"}
                        </button>
                    </div>
                </div>

                <div className="mt-6 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                    <p className="text-sm leading-6 text-yellow-200">
                        Never share your API key publicly or commit it to a repository. If it is compromised, revoke it immediately and generate a new one.
                    </p>
                </div>

                <p className="mt-4 text-center text-xs text-slate-500">
                    You can close this window after copying the key.
                </p>
            </section>
            <ToastContainer/>
        </div>
    );
};

export default KeyDisplay;
