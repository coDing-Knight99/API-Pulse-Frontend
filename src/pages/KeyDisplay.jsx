import { Copy } from "lucide-react";
import {X}  from "lucide-react";
import { useState } from "react";
import {toast,ToastContainer} from "react-toastify";
const KeyDisplay = ({ apikey, setKeyDisplay }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apikey);
        setCopied(true);
        toast.success("API key copied to clipboard!");
        setTimeout(() => setCopied(false), 10000); // Reset after 10 seconds
    };
    return (
        <div className="min-h-screen min-w-screen fixed flex items-center justify-center bg-[#050508]">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-800 bg-[#0B0B12] p-8 shadow-2xl">
                <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-200" onClick={() => {
                    if(copied){
                        setKeyDisplay(null);
                    }
                    else
                    {
                        toast.error("Please copy the API key before closing.");
                    }
                }}>
                    <div className="flex items-center gap-1 bg-red-100/20 text-red-400 px-2 py-1 rounded">
                        <X size={20} />
                    </div>
                </button>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        API Key Generated
                    </h1>
                    <p className="mt-2 text-slate-400">
                        Your API key has been created successfully.
                        Store it securely before leaving this page.
                    </p>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 mb-6">
                    <p className="text-sm font-medium text-emerald-400">
                        Security Notice
                    </p>
                    <p className="mt-1 text-slate-300">
                        This is the only time you'll be able to view this API
                        key. Save it somewhere safe.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-red-500/80 p-4 mb-6">
                    <p className="text-md font-bold text-white">Important Usage Tip: Use this API key in the Authorization header as "x-api-key" for authenticating your API requests</p>
                    </div>

                <div className="rounded-xl border border-slate-700 bg-[#111118] p-4">
                    <label className="mb-2 block text-sm text-slate-400">
                        API Key
                    </label>

                    <div className="flex items-center gap-3">
                        <code className="flex-1 overflow-x-auto rounded-lg bg-black px-4 py-3 text-sm text-emerald-400">
                            {apikey}
                        </code>

                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500"
                        >
                            <Copy size={18} />
                            Copy
                        </button>
                    </div>
                </div>

                <div className="mt-6 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                    <p className="text-sm text-yellow-300">
                        Never share your API key publicly or commit it to a
                        repository. If compromised, revoke it immediately and
                        generate a new one.
                    </p>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default KeyDisplay;