import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  ShieldCheck,
  FileSearch,
  LayoutDashboard,
  Building2,
  Scale,
  Vote,
  FileCheck2,
  Upload,
  FileText,
  ListChecks,
  ChevronDown,
  Menu,
  X,
  BadgeCheck,
} from "lucide-react";
import { Role } from "./mockData";
import { useRole, ROLE_LABELS, ROLE_HOME } from "./RoleContext";

interface NavLink {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NAV: Record<Role, NavLink[]> = {
  public: [
    { to: "/verify", label: "Verify Document", icon: <FileSearch size={18} /> },
    { to: "/registry", label: "Public Registry", icon: <BadgeCheck size={18} /> },
  ],
  company: [
    { to: "/company", label: "My Documents", icon: <FileText size={18} /> },
    { to: "/company/submit", label: "Submit Document", icon: <Upload size={18} /> },
    { to: "/company/templates", label: "Templates", icon: <FileCheck2 size={18} /> },
    { to: "/registry", label: "Public Registry", icon: <BadgeCheck size={18} /> },
  ],
  expert: [
    { to: "/expert", label: "Review Queue", icon: <ListChecks size={18} /> },
    { to: "/expert/history", label: "My Reviews", icon: <Scale size={18} /> },
  ],
  admin: [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/admin/documents", label: "Documents", icon: <FileText size={18} /> },
    { to: "/admin/companies", label: "Companies", icon: <Building2 size={18} /> },
    { to: "/admin/experts", label: "Legal Experts", icon: <Scale size={18} /> },
    { to: "/admin/governance", label: "Governance", icon: <Vote size={18} /> },
  ],
};

const RoleSwitcher: React.FC = () => {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const roles: Role[] = ["public", "company", "expert", "admin"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        <span className="hidden text-xs text-gray-400 sm:inline">Viewing as</span>
        <span>{ROLE_LABELS[role]}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-100 px-3 py-2 text-xs font-semibold uppercase text-gray-400 dark:border-gray-700">
            Preview a role
          </div>
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                navigate(ROLE_HOME[r]);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/[0.05] ${
                role === r ? "text-brand-500 font-medium" : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {ROLE_LABELS[r]}
              {role === r && <span className="text-brand-500">●</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const PrototypeLayout: React.FC = () => {
  const { role } = useRole();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = NAV[role];

  const isActive = (to: string) =>
    location.pathname === to || (to !== "/" && location.pathname.startsWith(to + "/"));

  const Sidebar = (
    <aside className="flex h-full w-[260px] flex-col bg-gray-900 text-gray-300">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
          <ShieldCheck size={20} />
        </div>
        <div>
          <p className="text-base font-bold text-white">AITT</p>
          <p className="text-[10px] uppercase tracking-wider text-gray-500">Compliance Verify</p>
        </div>
      </div>

      <div className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
        {ROLE_LABELS[role]}
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive(l.to)
                ? "bg-brand-500 text-white"
                : "text-gray-400 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {l.icon}
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 px-5 py-4 text-[11px] leading-relaxed text-gray-500">
        Stellar / Soroban<br />
        On-chain document verification
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">{Sidebar}</div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full">{Sidebar}</div>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              AI Legal Compliance — Document Verification & Certification
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher />
          </div>
        </header>

        <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrototypeLayout;
