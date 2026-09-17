/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { api } from "@/src/lib/api";
import { showConfirm, showError, showSuccess } from "@/src/lib/swal";
import { UserCheck, UserX, Clock } from "lucide-react";

import Swal from "sweetalert2";

interface Staff {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface PendingStaffsProps {
  staffs?: Staff[];
  loading: boolean;
  actionLoading: string | null;
  onRefresh: () => void;
  setActionLoading: (id: string | null) => void;
}

export default function PendingStaffs({
  staffs = [],
  loading,
  actionLoading,
  onRefresh,
  setActionLoading,
}: PendingStaffsProps) {
  // Promote to Manager with Branch Selection
  const handleApprove = async (staffId: string, staffName: string) => {
    const { value: branch } = await Swal.fire({
      title: `<span class="text-base font-bold">${staffName}-কে ম্যানেজার করুন</span>`,
      text: "ম্যানেজারের ব্রাঞ্চের নাম প্রদান করুন:",
      input: "text",
      inputPlaceholder: "যেমন: ধানমন্ডি শাখা",
      showCancelButton: true,
      confirmButtonColor: "#C2410C",
      cancelButtonColor: "#78716c",
      confirmButtonText: "অনুমোদন ও রোল চেঞ্জ",
      cancelButtonText: "বাতিল",
      inputValidator: (value) => {
        if (!value) {
          return "ব্রাঞ্চের নাম দেওয়া বাধ্যতামূলক!";
        }
      },
    });

    if (branch) {
      try {
        setActionLoading(staffId);
        await api.patch(`/api/admin/assign-manager/${staffId}/role`, {
          role: "MANAGER",
          branch: branch,
        });
        showSuccess("সফল!", `${staffName}-কে ম্যানেজার হিসেবে অনুমোদন দেওয়া হয়েছে।`);
        onRefresh();
      } catch (err: any) {
        showError("ব্যর্থ হয়েছে!", err.response?.data?.message || "রোল আপডেট করা যায়নি।");
      } finally {
        setActionLoading(null);
      }
    }
  };

  // Reject / Remove Staff Request
  const handleReject = async (staffId: string, staffName: string) => {
    const isConfirmed = await showConfirm(
      "আবেদন বাতিল করবেন?",
      `${staffName}-এর ম্যানেজার হওয়ার আবেদনটি বাতিল করতে চান?`
    );

    if (isConfirmed) {
      try {
        setActionLoading(staffId);
        await api.delete(`/api/admin/users/${staffId}`);
        showSuccess("বাতিল করা হয়েছে", "আবেদনটি তালিকা থেকে সরিয়ে ফেলা হয়েছে।");
        onRefresh();
      } catch (err: any) {
        showError("ব্যর্থ হয়েছে!", err.response?.data?.message || "অপারেশন সফল হয়নি।");
      } finally {
        setActionLoading(null);
      }
    }
  };

  const safeStaffs = Array.isArray(staffs) ? staffs : [];

  return (
    <section className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
        <Clock className="h-5 w-5 text-amber-600" />
        <h2 className="text-base font-bold text-gray-800">
          অনুমোদনের অপেক্ষায় থাকা স্টাফ ({safeStaffs.length})
        </h2>
      </div>

      {loading ? (
        <p className="text-xs text-stone-500 py-4">ডাটা লোড হচ্ছে...</p>
      ) : safeStaffs.length === 0 ? (
        <p className="text-xs text-stone-400 py-4">কোনো পেন্ডিং অনুমোদন নেই।</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3">নাম</th>
                <th className="p-3">ইমেইল</th>
                <th className="p-3">রেজিস্ট্রেশনের তারিখ</th>
                <th className="p-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {safeStaffs.map((staff) => (
                <tr key={staff.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-3 font-semibold text-gray-900">{staff.name}</td>
                  <td className="p-3">{staff.email}</td>
                  <td className="p-3 text-stone-400">
                    {staff.createdAt ? new Date(staff.createdAt).toLocaleDateString("bn-BD") : "N/A"}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleApprove(staff.id, staff.name)}
                        disabled={actionLoading === staff.id}
                        className="flex items-center gap-1 bg-[#C2410C] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold hover:bg-[#a6370a] transition-all disabled:opacity-50"
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                        {actionLoading === staff.id ? "প্রসেসিং..." : "ম্যানেজার করুন"}
                      </button>
                      <button
                        onClick={() => handleReject(staff.id, staff.name)}
                        disabled={actionLoading === staff.id}
                        className="flex items-center gap-1 bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg text-[11px] font-semibold hover:bg-rose-100 transition-all disabled:opacity-50"
                      >
                        <UserX className="h-3.5 w-3.5" />
                        বাতিল
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}