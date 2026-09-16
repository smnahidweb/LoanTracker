"use client";

import { UserRole } from "@/src/data_type/auth";
import { Bell, ChevronDown } from "lucide-react";

type HeaderProps = {
  role: UserRole;
};

export function Header({ role }: HeaderProps) {
  return (
    <header className="fixed left-60 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white px-6">
      {/* Left */}
      <div>
        <p className="text-sm text-muted">
          স্বাগতম
        </p>

        <p className="text-sm font-semibold text-foreground">
          {role === "ADMIN" ? "অ্যাডমিন প্যানেল" : "ম্যানেজার প্যানেল"}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-background hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </button>

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-background"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFEDD5] text-sm font-bold text-primary">
            {role === "ADMIN" ? "A" : "M"}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-foreground">
              {role === "ADMIN" ? "Admin" : "Manager"}
            </p>

            <p className="text-xs text-muted">
              {role === "ADMIN" ? "Owner" : "Staff"}
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-muted" />
        </button>
      </div>
    </header>
  );
}