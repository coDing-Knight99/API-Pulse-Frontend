import { ArrowLeft, Compass, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050508] px-4 py-10 text-white sm:px-6">
      <section className="w-full max-w-3xl overflow-hidden rounded-lg border border-[#20202a] bg-[#0b0b12] shadow-2xl shadow-black/20">
        <div className="border-b border-[#20202a] bg-[#08080d] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15 text-purple-200 ring-1 ring-purple-400/25">
              <Compass size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-300">Route Missing</p>
              <h1 className="text-xl font-bold text-white">Page not found</h1>
            </div>
          </div>
        </div>

        <div className="px-5 py-10 text-center sm:px-8 sm:py-14">
          <p className="text-7xl font-black tracking-tight text-white sm:text-8xl">404</p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
            The page you are looking for does not exist or may have been moved.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-purple-500 px-4 text-sm font-bold text-white transition hover:bg-purple-400"
            >
              <Home size={17} />
              Go to dashboard
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#20202a] px-4 text-sm font-bold text-slate-300 transition hover:bg-[#151521] hover:text-white"
            >
              <ArrowLeft size={17} />
              Go back
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
