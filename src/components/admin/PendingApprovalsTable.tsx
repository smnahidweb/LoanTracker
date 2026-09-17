"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface PendingLoan {
  id: string;
  applicantName: string;
  managerName: string;
  amount: string;
  date: string;
}

interface PendingApprovalsTableProps {
  loans: PendingLoan[];
  loading: boolean;
}

export default function PendingApprovalsTable({ loans, loading }: PendingApprovalsTableProps) {
  return (
    <div className="rounded-xl border border-stone-200/80 bg-white shadow-sm overflow-hidden">
      <div className="p-5 border-b border-stone-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900">অনুমোদনের জন্য পেন্ডিং ঋণ</h3>
          <p className="text-xs text-stone-500 mt-0.5">ম্যানেজারদের পাঠানো নতুন আবেদনসমূহ</p>
        </div>
        <Link
          href="/admin/approvals"
          className="text-xs font-semibold text-[#C2410C] hover:underline flex items-center gap-1"
        >
          সব দেখুন <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50/80 text-stone-500 border-b border-stone-100">
            <tr>
              <th className="py-3 px-5 font-semibold">আবেদনকারী</th>
              <th className="py-3 px-5 font-semibold">ম্যানেজার</th>
              <th className="py-3 px-5 font-semibold">অনুরোধকৃত পরিমাণ</th>
              <th className="py-3 px-5 font-semibold">তারিখ</th>
              <th className="py-3 px-5 font-semibold text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-700">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-stone-400">
                  ডাটা লোড হচ্ছে...
                </td>
              </tr>
            ) : loans.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-stone-400">
                  কোনো পেন্ডিং আবেদন নেই।
                </td>
              </tr>
            ) : (
              loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="py-3 px-5 font-medium text-gray-900">{loan.applicantName}</td>
                  <td className="py-3 px-5 text-stone-500">{loan.managerName}</td>
                  <td className="py-3 px-5 font-bold text-gray-900">{loan.amount}</td>
                  <td className="py-3 px-5 text-stone-400">{loan.date}</td>
                  <td className="py-3 px-5 text-right">
                    <Link
                      href={`/admin/approvals?id=${loan.id}`}
                      className="inline-block rounded-md bg-[#C2410C] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#a6370a] transition-all"
                    >
                      রিভিউ করুন
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}