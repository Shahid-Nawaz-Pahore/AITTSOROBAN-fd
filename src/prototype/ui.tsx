// Shared UI primitives for the AITT prototype (design-only)
import React from "react";
import { STATUS_META, DocStatus } from "./mockData";

export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => (
  <div
    className={`rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
  >
    {children}
  </div>
);

export const SectionTitle: React.FC<{ title: string; subtitle?: string; right?: React.ReactNode }> = ({
  title,
  subtitle,
  right,
}) => (
  <div className="mb-5 flex items-end justify-between gap-4">
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
    {right}
  </div>
);

export const StatusBadge: React.FC<{ status: DocStatus }> = ({ status }) => {
  const m = STATUS_META[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${m.classes}`}>
      {m.label}
    </span>
  );
};

export const Btn: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline" | "ghost" | "success" | "danger";
  }
> = ({ variant = "primary", className = "", children, ...rest }) => {
  const styles: Record<string, string> = {
    primary: "bg-brand-500 text-white hover:bg-brand-600",
    success: "bg-success-500 text-white hover:bg-success-600",
    danger: "bg-error-500 text-white hover:bg-error-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.05]",
    ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/[0.05]",
  };
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const StatCard: React.FC<{
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  accent?: string;
}> = ({ label, value, icon, accent = "bg-brand-50 text-brand-500" }) => (
  <Card className="p-5">
    <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>{icon}</div>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{value}</p>
  </Card>
);

export const Rating: React.FC<{ value: number }> = ({ value }) => (
  <span className="text-warning-400">
    {"★".repeat(value)}
    <span className="text-gray-300 dark:text-gray-600">{"★".repeat(Math.max(0, 5 - value))}</span>
  </span>
);

export const Mono: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`font-mono text-xs text-gray-500 dark:text-gray-400 ${className}`}>{children}</span>
);

// Demo banner shown on every prototype screen
export const DemoBanner: React.FC = () => (
  <div className="mb-6 flex items-center gap-2 rounded-xl border border-warning-200 bg-warning-50 px-4 py-2.5 text-sm text-warning-700">
    <span className="font-semibold">Prototype</span>
    <span className="text-warning-600">— design preview with sample data. Not connected to the live system.</span>
  </div>
);
