"use client";

import { CheckCircle2, User, Mail, Phone, Building2 } from "lucide-react";

interface Manager {
  id: string;
  name: string;
  email: string;
  phone?: string;
  branch?: string;
}

interface ActiveManagersProps {
  managers: Manager[];
  loading: boolean;
}

export default function ActiveManagers({ managers, loading }: ActiveManagersProps) {
  return (
    <section className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        <h2 className="text-base font-bold text-gray-800">
          সক্রিয় ম্যানেজারবৃন্দ ({managers.length})
        </h2>
      </div>

      {loading ? (
        <p className="text-xs text-stone-500 py-4">ডাটা লোড হচ্ছে...</p>
      ) : managers.length === 0 ? (
        <p className="text-xs text-stone-400 py-4">কোনো সক্রিয় ম্যানেজার পাওয়া যায়নি।</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3">নাম</th>
                <th className="p-3">ইমেইল</th>
                <th className="p-3">ফোন</th>
                <th className="p-3">ব্রাঞ্চ</th>
                <th className="p-3 text-right">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {managers.map((manager) => (
                <tr key={manager.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-3 font-semibold text-gray-900 flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-stone-400" />
                    {manager.name}
                  </td>
                  <td className="p-3">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3 text-stone-400" />
                      {manager.email}
                    </span>
                  </td>
                  <td className="p-3">
                    {manager.phone ? (
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-stone-400" />
                        {manager.phone}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-3 font-medium text-stone-800">
                    {manager.branch ? (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-3 w-3 text-[#C2410C]" />
                        {manager.branch}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                      ম্যানেজার
                    </span>
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