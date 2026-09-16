import { AppShell } from "@/src/components/layout/app-shell";
import { Wallet, Users, ArrowUpRight, Plus, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default function ManagerDashboardPage() {
  return (
    <AppShell role="MANAGER">
      <div className="space-y-6">
        {/* Title Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              ড্যাশবোর্ড
            </h1>
            <p className="mt-1 text-sm text-muted">
              আজকের কার্যক্রমের সংক্ষিপ্ত বিবরণ
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/manager/collections/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#C2410C] px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#a6370a] transition-all"
            >
              <Plus className="h-4 w-4" />
              নতুন আদায় এন্ট্রি
            </Link>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">আজকের আদায় Target</span>
              <div className="rounded-lg bg-orange-50 p-2 text-[#C2410C]">
                <Wallet className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">৳ ২৫,০০০</p>
            <p className="mt-1 text-[11px] text-muted">সর্বমোট নির্ধারিত কিস্তি</p>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">আজকের আদায়কৃত</span>
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-600">৳ ১৮,৫০৩</p>
            <p className="mt-1 text-[11px] text-emerald-600 font-medium">৭৪% কালেকশন সম্পন্ন</p>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">বকেয়া কিস্তি</span>
              <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-amber-600">৳ ৬,৪৯৭</p>
            <p className="mt-1 text-[11px] text-muted">৮ জন গ্রাহক বাকি</p>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">মোট সক্রিয় গ্রাহক</span>
              <div className="rounded-lg bg-stone-100 p-2 text-stone-600">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">৪৫ জন</p>
            <p className="mt-1 text-[11px] text-muted">এই ফিল্ডে বরাদ্দকৃত</p>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="rounded-xl border border-stone-200/80 bg-white shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">সাম্প্রতিক আদায় সংগ্রাহ</h3>
              <p className="text-xs text-muted mt-0.5">আজকে এন্ট্রি করা কিস্তিসমূহ</p>
            </div>
            <Link
              href="/manager/collections"
              className="text-xs font-semibold text-[#C2410C] hover:underline flex items-center gap-1"
            >
              সব দেখুন <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50/80 text-stone-500 border-b border-stone-100">
                <tr>
                  <th className="py-3 px-5 font-semibold">গ্রাহকের নাম</th>
                  <th className="py-3 px-5 font-semibold">ঋণ অ্যাকাউন্ট</th>
                  <th className="py-3 px-5 font-semibold">পরিমাণ</th>
                  <th className="py-3 px-5 font-semibold">সময়</th>
                  <th className="py-3 px-5 font-semibold">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                <tr>
                  <td className="py-3 px-5 font-medium text-foreground">রহিম উদ্দিন</td>
                  <td className="py-3 px-5 font-mono text-stone-500">#LN-8042</td>
                  <td className="py-3 px-5 font-bold text-emerald-600">৳ ৫০০</td>
                  <td className="py-3 px-5 text-stone-400">১০:১৫ AM</td>
                  <td className="py-3 px-5">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      সফল
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-5 font-medium text-foreground">কবির হোসেন</td>
                  <td className="py-3 px-5 font-mono text-stone-500">#LN-8019</td>
                  <td className="py-3 px-5 font-bold text-emerald-600">৳ ১,০০০</td>
                  <td className="py-3 px-5 text-stone-400">১১:৩০ AM</td>
                  <td className="py-3 px-5">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      সফল
                    </span>
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