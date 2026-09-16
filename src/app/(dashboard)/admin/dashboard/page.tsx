import { AppShell } from "@/src/components/layout/app-shell";
import { TrendingUp, Users, AlertCircle, ArrowUpRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <AppShell role="ADMIN">
      <div className="space-y-6">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            ড্যাশবোর্ড
          </h1>
          <p className="mt-1 text-sm text-muted">
            সিস্টেমের সামগ্রিক কার্যক্রম ও পোর্টফোলিও
          </p>
        </div>

        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">মোট বিতরণকৃত ঋণ</span>
              <div className="rounded-lg bg-orange-50 p-2 text-[#C2410C]">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">৳ ১২,৫০,০০০</p>
            <p className="mt-1 text-[11px] text-muted">মোট ১২০ টি অ্যাক্টিভ ঋণ</p>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">এই মাসের মোট আদায়</span>
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-600">৳ ৩,৪৫,০০০</p>
            <p className="mt-1 text-[11px] text-emerald-600 font-medium">+১২% বিগত মাস হতে</p>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">অনুমোদনের অপেক্ষায়</span>
              <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                <AlertCircle className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-amber-600">৫ টি</p>
            <p className="mt-1 text-[11px] text-muted">নতুন ঋণের আবেদন</p>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">অ্যাক্টিভ ম্যানেজার</span>
              <div className="rounded-lg bg-stone-100 p-2 text-stone-600">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">৬ জন</p>
            <p className="mt-1 text-[11px] text-muted">৩ টি শাখায় কর্মরত</p>
          </div>
        </div>

        {/* Pending Approvals Quick Table */}
        <div className="rounded-xl border border-stone-200/80 bg-white shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">অনুমোদনের জন্য পেন্ডিং ঋণ</h3>
              <p className="text-xs text-muted mt-0.5">ম্যানেজারদের পাঠানো নতুন আবেদনসমূহ</p>
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
                <tr>
                  <td className="py-3 px-5 font-medium text-foreground">মো: আরিফ শেখ</td>
                  <td className="py-3 px-5 text-stone-500">সাকিব আহমেদ</td>
                  <td className="py-3 px-5 font-bold text-foreground">৳ ৫০,০০০</td>
                  <td className="py-3 px-5 text-stone-400">১৬ সেপ্টেম্বর, ২০২৬</td>
                  <td className="py-3 px-5 text-right">
                    <Link
                      href="/admin/approvals"
                      className="inline-block rounded-md bg-[#C2410C] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#a6370a] transition-all"
                    >
                      রিভিউ করুন
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}