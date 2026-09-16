"use client";

import { UserRole } from "@/src/data_type/auth";
import { navigation } from "@/src/lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  role: UserRole;
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const items = navigation[role];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-border bg-background">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-border px-5">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            Loan Tracker
          </h1>

          <p className="text-xs text-muted">
            Loan Management System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex h-10 items-center gap-3 rounded-lg px-3",
                "text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#FFEDD5] text-primary font-semibold"
                  : "text-muted hover:bg-white hover:text-foreground",
              ].join(" ")}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-3">
        <div className="rounded-lg bg-white px-3 py-2">
          <p className="text-xs text-muted">Logged in as</p>

          <p className="text-sm font-semibold text-foreground">
            {role === "ADMIN" ? "অ্যাডমিন" : "ম্যানেজার"}
          </p>
        </div>
      </div>
    </aside>
  );
}