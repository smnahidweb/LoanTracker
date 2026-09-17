/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/src/components/layout/app-shell";
import { api } from "@/src/lib/api";
import { showError } from "@/src/lib/swal";
import PendingStaffs from "@/src/components/admin/PendingStaffs";
import ActiveManagers from "@/src/components/admin/ActiveManagers";


export default function AdminManagersPage() {
  const [pendingStaffs, setPendingStaffs] = useState([]);
  const [activeManagers, setActiveManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Pending Staffs
      const pendingRes = await api.get("/api/admin/pending-staffs");
      const pendingData = Array.isArray(pendingRes.data) 
        ? pendingRes.data 
        : pendingRes.data?.data || [];
      setPendingStaffs(pendingData);

      // 2. Fetch Active Managers
      const activeRes = await api.get("/api/admin/managers");
      const activeData = Array.isArray(activeRes.data) 
        ? activeRes.data 
        : activeRes.data?.data || [];
      setActiveManagers(activeData);
    } catch (err: any) {
      console.error("Failed to fetch managers data:", err);
      setPendingStaffs([]);
      setActiveManagers([]);
      showError("ডাটা লোড সমস্যা!", "ম্যানেজারদের তথ্য লোড করতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppShell role="ADMIN">
      <div className="space-y-8 max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ম্যানেজার ভূমিকা ও অনুমোদন</h1>
          <p className="text-xs text-stone-500 mt-1">
            স্টাফদের ম্যানেজার রোল প্রদান করুন এবং সক্রিয় ম্যানেজারদের তালিকা দেখুন
          </p>
        </div>

        {/* Pending Staffs Component */}
        <PendingStaffs
          staffs={pendingStaffs}
          loading={loading}
          actionLoading={actionLoading}
          onRefresh={fetchData}
          setActionLoading={setActionLoading}
        />

        {/* Active Managers Component */}
        <ActiveManagers managers={activeManagers} loading={loading} />
      </div>
    </AppShell>
  );
}