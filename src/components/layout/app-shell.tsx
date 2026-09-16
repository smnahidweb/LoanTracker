import type { ReactNode } from "react";

import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { UserRole } from "@/src/data_type/auth";

type AppShellProps = {
  children: ReactNode;
  role: UserRole;
};

export function AppShell({
  children,
  role,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} />

      <div className="ml-60">
        <Header role={role} />

        <main className="min-h-screen pt-16">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}