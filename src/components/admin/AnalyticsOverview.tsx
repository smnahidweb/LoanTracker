"use client";

import { TrendingUp, Users, AlertCircle, CheckCircle } from "lucide-react";

interface AnalyticsProps {
  stats: {
    totalDisbursedLoan: string;
    activeLoansCount: number;
    monthlyCollection: string;
    collectionGrowth: string;
    pendingApprovalsCount: number;
    activeManagersCount: number;
    branchesCount: number;
  };
  loading: boolean;
}

export default function AnalyticsOverview({ stats, loading }: AnalyticsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-stone-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Disbursed Loan */}
      <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500">মোট বিতরণকৃত ঋণ</span>
          <div className="rounded-lg bg-orange-50 p-2 text-[#C2410C]">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-bold text-gray-900">{stats.totalDisbursedLoan}</p>
        <p className="mt-1 text-[11px] text-stone-500">মোট {stats.activeLoansCount} টি অ্যাক্টিভ ঋণ</p>
      </div>

      {/* Monthly Collection */}
      <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500">এই মাসের মোট আদায়</span>
          <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
            <CheckCircle className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-bold text-emerald-600">{stats.monthlyCollection}</p>
        <p className="mt-1 text-[11px] text-emerald-600 font-medium">{stats.collectionGrowth} বিগত মাস হতে</p>
      </div>

      {/* Pending Approvals */}
      <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500">অনুমোদনের অপেক্ষায়</span>
          <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
            <AlertCircle className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-bold text-amber-600">{stats.pendingApprovalsCount} টি</p>
        <p className="mt-1 text-[11px] text-stone-500">নতুন ঋণের আবেদন</p>
      </div>

      {/* Active Managers */}
      <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500">অ্যাক্টিভ ম্যানেজার</span>
          <div className="rounded-lg bg-stone-100 p-2 text-stone-600">
            <Users className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 text-2xl font-bold text-gray-900">{stats.activeManagersCount} জন</p>
        <p className="mt-1 text-[11px] text-stone-500">{stats.branchesCount} টি শাখায় কর্মরত</p>
      </div>
    </div>
  );
}