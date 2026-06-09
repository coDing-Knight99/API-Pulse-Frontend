const ApiKeyRevokeConfirmation = ({ apiKey, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
        <div className="max-w-md w-full rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/60 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Confirm API Key Revocation</h2>
            <p className="text-slate-400 mb-6">Are you sure you want to revoke the API key <code className="bg-[#111118] px-2 py-1 rounded text-sm text-emerald-400">{apiKey}</code>? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
                <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-[#20202a] text-sm font-semibold text-slate-300 hover:bg-[#151521] hover:text-white transition">Cancel</button>
                <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-500 text-sm font-semibold text-white hover:bg-red-400 transition">Revoke</button>
            </div>
        </div>
        </div>
    );
};

export default ApiKeyRevokeConfirmation;