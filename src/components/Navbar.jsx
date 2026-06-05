import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  Bell,
  Braces,
  ChevronDown,
  Gauge,
  KeyRound,
  LogIn,
  Menu,
  Search,
  Server,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", route: "/", icon: Gauge, eyebrow: "Overview" },
  { label: "Services", route: "/services", icon: Server, eyebrow: "Registry" },
  { label: "API Keys", route: "/api-keys", icon: KeyRound, eyebrow: "Access" },
  { label: "Sandbox", route: "/api-sandbox", icon: Braces, eyebrow: "Test APIs" },
];

const routeTitles = {
  "/": { title: "Dashboard", section: "Gateway" },
  "/services": { title: "Services", section: "Service registry" },
  "/api-keys": { title: "API Keys", section: "Access control" },
  "/api-sandbox": { title: "API Sandbox", section: "Developer tools" },
  "/login": { title: "Login", section: "Account" },
};

function getCurrentRoute(pathname) {
  if (pathname.startsWith("/services/") && pathname.endsWith("/analytics")) {
    return { title: "Service Analytics", section: "Service registry" };
  }

  if (pathname.startsWith("/api-keys/") && pathname.endsWith("/analytics")) {
    return { title: "Key Analytics", section: "Access control" };
  }

  return routeTitles[pathname] ?? routeTitles["/"];
}

function isActiveRoute(pathname, route) {
  if (route === "/") return pathname === "/";

  return pathname.startsWith(route);
}

function NavItem({ item, active, onNavigate }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={() => onNavigate(item.route)}
      className={`group relative flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
        active
          ? "border-purple-400/25 bg-purple-500/15 text-white shadow-lg shadow-purple-950/20"
          : "border-transparent text-slate-300 hover:border-[#20202a] hover:bg-[#151521] hover:text-white"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 transition ${
          active
            ? "bg-purple-500 text-white ring-purple-300/30"
            : "bg-[#0b0b12] text-slate-500 ring-[#20202a] group-hover:text-slate-200"
        }`}
      >
        <Icon size={18} />
      </span>

      <span className="min-w-0">
        <span className="block text-sm font-semibold">{item.label}</span>
        <span className={`block text-xs ${active ? "text-purple-200" : "text-slate-500"}`}>
          {item.eyebrow}
        </span>
      </span>

      {active && <span className="absolute right-3 h-8 w-1 rounded-full bg-purple-300" />}
    </button>
  );
}

function SidebarContent({ pathname, onNavigate }) {
  return (
    <div className="flex h-full flex-col bg-[#050508]">
      <button
        type="button"
        onClick={() => onNavigate("/")}
        className="flex h-20 items-center gap-3 border-b border-[#20202a] px-5 text-left transition hover:bg-[#0b0b12]"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-500 text-white shadow-lg shadow-purple-950/30">
          <Activity size={23} strokeWidth={2.5} />
        </span>
        <span>
          <span className="block text-base font-bold leading-5 text-white">API-Pulse</span>
          <span className="block text-xs text-slate-500">Gateway Control</span>
        </span>
      </button>

      <div className="px-4 py-5">
        <div className="relative">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="search"
            placeholder="Search workspace"
            className="h-11 w-full rounded-lg border border-[#20202a] bg-[#0b0b12] pl-10 pr-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 pb-4">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Navigate
        </p>
        {navItems.map((item) => (
          <NavItem
            key={item.route}
            item={item}
            active={isActiveRoute(pathname, item.route)}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="border-t border-[#20202a] p-4">
        <button
          type="button"
          onClick={() => onNavigate("/login")}
          className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
            pathname === "/login"
              ? "border-purple-400/25 bg-purple-500/15 text-white"
              : "border-[#20202a] bg-[#0b0b12] text-slate-300 hover:border-purple-400/30 hover:bg-[#151521] hover:text-white"
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#151521] text-purple-300 ring-1 ring-purple-400/20">
            <LogIn size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold">Login</span>
            <span className="block text-xs text-slate-500">Account access</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentRoute = getCurrentRoute(pathname);

  function handleNavigate(route) {
    navigate(route);
    setMobileOpen(false);
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-[#20202a] bg-[#050508] lg:block">
        <SidebarContent pathname={pathname} onNavigate={handleNavigate} />
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#20202a] bg-[#050508]/95 px-4 backdrop-blur lg:ml-72 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#20202a] text-slate-200 transition hover:bg-[#151521] lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div>
            <p className="text-sm font-medium text-slate-500">{currentRoute.section}</p>
            <h1 className="text-lg font-semibold text-white sm:text-xl">{currentRoute.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-[#20202a] text-slate-400 transition hover:bg-[#151521] hover:text-white sm:inline-flex"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#20202a] text-slate-400 transition hover:bg-[#151521] hover:text-white"
          >
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-400" />
          </button>
          <button
            type="button"
            onClick={() => handleNavigate("/login")}
            className="flex h-10 items-center gap-2 rounded-lg border border-[#20202a] bg-[#0b0b12] px-2 text-sm text-slate-200 transition hover:border-purple-400/40 hover:bg-[#151521] sm:px-3"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500 text-xs font-bold text-white">
              D
            </span>
            <span className="hidden sm:inline">Dhruv</span>
            <ChevronDown size={15} className="hidden text-slate-500 sm:block" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/75 backdrop-blur-sm"
          />
          <aside className="relative h-full w-[min(21rem,88vw)] border-r border-[#20202a] shadow-2xl shadow-black">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#151521] hover:text-white"
            >
              <X size={20} />
            </button>
            <SidebarContent pathname={pathname} onNavigate={handleNavigate} />
          </aside>
        </div>
      )}
    </>
  );
}
