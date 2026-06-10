import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import logo from "../assets/APIPulse.png";
import {
  Activity,
  Bell,
  Braces,
  Gauge,
  KeyRound,
  LogOut,
  Menu,
  Search,
  Server,
  X,
} from "lucide-react";
const Base_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";
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
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const logout = () => {
    try{
      const response = axios.post(`${Base_URL}/logout`,{},{
        withCredentials: true,
      });
      console.log(response);
        toast("Logged out successfully!",{className:"font-bold text-lg"});
        navigate("/login",{replace:true});
    }catch(error)
    {
      console.error("Logout failed:", error);
      toast("Logout failed",{className:"font-bold text-lg"});
    }
  }
  const userdata= async () => {
    try{
      const response = await axios.get(`${Base_URL}/userdata`,{
        withCredentials: true,
      });
      console.log(response);
      setUsername(response.data.username);
      setEmail(response.data.email);
    }catch(error)
    {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    userdata();
  }, [username,email]);
  return (
    <div className="flex h-full flex-col bg-[#050508]">
      

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 pb-4 lg:pt-4">
        <div className="flex items-center justify-center">
          <img src={logo} alt="API-Pulse" className="h-45 w-45" />
        </div>
        <p className="p-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
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
        <div className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500 text-sm font-bold text-white">
              {username.charAt(0).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-white">{username}</span>
              <span className="block truncate text-xs text-slate-500">{email}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={logout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#20202a] px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-purple-400/30 hover:bg-[#151521] hover:text-white"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
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

        <header className="lg:hidden sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#20202a] bg-[#050508]/95 px-4 backdrop-blur lg:ml-72 lg:px-6">
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
