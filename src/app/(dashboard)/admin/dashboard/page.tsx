"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/src/components/layout/app-shell";
import AnalyticsOverview from "@/src/components/admin/AnalyticsOverview";
import PendingApprovalsTable from "@/src/components/admin/PendingApprovalsTable";
import ActiveManagers from "@/src/components/admin/ActiveManagers";



export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalDisbursedLoan: "৳ 0",
    activeLoansCount: 120,
    monthlyCollection: "৳ 0",
    collectionGrowth: "0%",
    pendingApprovalsCount: 0,
    activeManagersCount: 0,
    branchesCount: 0,
  });

  const [pendingLoans, setPendingLoans] = useState([
    {
      id: "1",
      applicantName: "-",
      managerName: "-",
      amount: "৳ 0",
      date: "-",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Backend integration when route/endpoint is ready
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // const res = await api.get("/api/admin/dashboard-stats");
        // setStats(res.data.stats);
        // setPendingLoans(res.data.pendingLoans);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AppShell role="ADMIN">
      <div className="space-y-6">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
          <p className="mt-1 text-xs text-stone-500">
            সিস্টেমের সামগ্রিক কার্যক্রম ও পোর্টফোলিও
          </p>
        </div>

        {/* Analytics Section */}
        <AnalyticsOverview stats={stats} loading={loading} />

     
        {/* Pending Approvals Table */}
        <PendingApprovalsTable loans={pendingLoans} loading={loading} />
      </div>
    </AppShell>
  );
}