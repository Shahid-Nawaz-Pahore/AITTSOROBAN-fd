import React from "react";
import { Link, useNavigate } from "react-router";
import { ShieldCheck, Mail, Lock, Building2 } from "lucide-react";
import { Btn } from "../ui";

const Shell: React.FC<React.PropsWithChildren<{ title: string; subtitle: string }>> = ({
  title,
  subtitle,
  children,
}) => (
  <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
    {/* Left brand panel */}
    <div className="relative hidden w-1/2 flex-col justify-between bg-gray-900 p-12 text-white lg:flex">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500">
          <ShieldCheck size={22} />
        </div>
        <span className="text-lg font-bold">AITT</span>
      </div>
      <div>
        <h2 className="text-3xl font-bold leading-tight">
          On-chain trust for<br />legal compliance.
        </h2>
        <p className="mt-4 max-w-md text-gray-400">
          Submit, review and certify compliance documents — anchored on the Stellar blockchain and
          validated by qualified legal experts.
        </p>
      </div>
      <p className="text-xs text-gray-500">© 2026 AITT Transparency. All rights reserved.</p>
    </div>

    {/* Right form */}
    <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center lg:hidden">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
            <ShieldCheck size={24} />
          </div>
          <span className="text-lg font-bold text-gray-800 dark:text-white">AITT</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        <div className="mt-8 space-y-4">{children}</div>
      </div>
    </div>
  </div>
);

const Input: React.FC<{ icon: React.ReactNode; placeholder: string; type?: string }> = ({
  icon,
  placeholder,
  type = "text",
}) => (
  <div className="relative">
    <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
    />
  </div>
);

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Shell title="Welcome back" subtitle="Sign in to your AITT account">
      <Input icon={<Mail size={16} />} placeholder="Email address" type="email" />
      <Input icon={<Lock size={16} />} placeholder="Password" type="password" />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-500">
          <input type="checkbox" className="rounded border-gray-300" /> Remember me
        </label>
        <a className="text-brand-500 hover:underline" href="#">Forgot password?</a>
      </div>
      <Btn className="w-full" onClick={() => navigate("/company")}>Sign In</Btn>
      <p className="text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <Link to="/signup" className="font-medium text-brand-500 hover:underline">Register</Link>
      </p>
    </Shell>
  );
};

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Shell title="Create your account" subtitle="Register your company to get started">
      <Input icon={<Building2 size={16} />} placeholder="Company name" />
      <Input icon={<Mail size={16} />} placeholder="Work email" type="email" />
      <Input icon={<Lock size={16} />} placeholder="Password" type="password" />
      <p className="rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
        Note: new company registrations are reviewed by an administrator before activation.
      </p>
      <Btn className="w-full" onClick={() => navigate("/signin")}>Create Account</Btn>
      <p className="text-center text-sm text-gray-500">
        Already registered?{" "}
        <Link to="/signin" className="font-medium text-brand-500 hover:underline">Sign in</Link>
      </p>
    </Shell>
  );
};
