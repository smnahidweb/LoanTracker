import {
  LayoutDashboard,
  Users,
  HandCoins,
  Wallet,
  ClipboardCheck,
  FileText,
  BarChart3,
  ShieldCheck,
  Settings,
  UserCog,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import { UserRole } from "../data_type/auth";


export type NavigationItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const navigation: Record<UserRole, NavigationItem[]> = {
  ADMIN: [
    {
      title: "ড্যাশবোর্ড",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "ম্যানেজার",
      href: "/admin/managers",
      icon: UserCog,
    },
    {
      title: "গ্রাহক",
      href: "/admin/customers",
      icon: Users,
    },
    {
      title: "ঋণ",
      href: "/admin/loans",
      icon: HandCoins,
    },
    {
      title: "আদায়",
      href: "/admin/collections",
      icon: Wallet,
    },
    {
      title: "অনুমোদন",
      href: "/admin/approvals",
      icon: ClipboardCheck,
    },
    {
      title: "রিপোর্ট",
      href: "/admin/reports",
      icon: FileText,
    },
    {
      title: "অ্যানালিটিক্স",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "অডিট লগ",
      href: "/admin/audit-logs",
      icon: ShieldCheck,
    },
    {
      title: "সেটিংস",
      href: "/admin/settings",
      icon: Settings,
    },
  ],

  MANAGER: [
    {
      title: "ড্যাশবোর্ড",
      href: "/manager/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "গ্রাহক",
      href: "/manager/customers",
      icon: Users,
    },
    {
      title: "ঋণ",
      href: "/manager/loans",
      icon: HandCoins,
    },
    {
      title: "আদায়",
      href: "/manager/collections",
      icon: Wallet,
    },
    {
      title: "রিপোর্ট",
      href: "/manager/reports",
      icon: FileText,
    },
  ],
};