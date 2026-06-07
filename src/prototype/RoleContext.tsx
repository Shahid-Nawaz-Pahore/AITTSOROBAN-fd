import React, { createContext, useContext, useState } from "react";
import { Role } from "./mockData";

interface RoleCtx {
  role: Role;
  setRole: (r: Role) => void;
}

const Ctx = createContext<RoleCtx>({ role: "public", setRole: () => {} });

export const RoleProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [role, setRole] = useState<Role>("public");
  return <Ctx.Provider value={{ role, setRole }}>{children}</Ctx.Provider>;
};

export const useRole = () => useContext(Ctx);

export const ROLE_LABELS: Record<Role, string> = {
  public: "Public Visitor",
  company: "Company",
  expert: "Legal Expert",
  admin: "Main Admin",
};

export const ROLE_HOME: Record<Role, string> = {
  public: "/verify",
  company: "/company",
  expert: "/expert",
  admin: "/admin",
};
