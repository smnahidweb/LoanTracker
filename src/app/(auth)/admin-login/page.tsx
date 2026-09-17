/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldCheck, KeyRound, ArrowRight, AlertCircle, Info } from "lucide-react";
import { api } from "@/src/lib/api";


const adminLoginSchema = z.object({
  email: z.string().email({ message: "সঠিক ইমেইল এড্রেস লিখুন" }),
  password: z.string().min(6, { message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে" }),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    setAuthError(null);

    try {
      // Direct Axios Post Request to: http://localhost:5000/api/auth/login
      const res = await api.post("/api/auth/login", data);

      if (res.status === 200) {
        // Successful login redirect to Admin Dashboard
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setAuthError(
        err.response?.data?.message || "অ্যাডমিন ক্রেডেনশিয়ালস সঠিক নয়।"
      );
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#FAF9F7] text-gray-900 font-sans flex flex-col justify-between overflow-hidden selection:bg-[#C2410C]/10 selection:text-[#C2410C]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] rounded-full bg-gradient-to-tr from-orange-100/40 via-stone-200/30 to-transparent blur-3xl opacity-70" />
      </div>

      <header className="relative z-10 w-full border-b border-stone-200/80 bg-white/60 backdrop-blur-md shrink-0">
        <div className="mx-auto flex h-16 max-w-[1550px] items-center justify-between px-6 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C2410C] font-bold text-white shadow-sm text-lg">
              L
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight tracking-tight">
                Loan Tracker
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                অ্যাডমিন পোর্টাল
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/80 px-3 py-1 text-xs text-gray-600 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="font-medium">সুরক্ষিত পোর্টাল</span>
          </div>
        </div>
      </header>

      <section className="relative z-10 flex-1 flex items-center justify-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-stone-200/90 bg-white/95 p-7 shadow-xl shadow-stone-200/40 backdrop-blur-sm">
            
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 border border-stone-200 px-2.5 py-1 text-xs font-semibold text-stone-700 mb-3">
                <KeyRound className="h-3.5 w-[#C2410C]" />
                অ্যাডমিন কন্ট্রোল এক্সেস
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                অ্যাডমিন প্যানেলে প্রবেশ
              </h2>
              <p className="mt-1 text-xs text-gray-500 font-medium">
                সিস্টেম অ্যাডমিনিস্ট্রেটর ক্রেডেনশিয়াল ব্যবহার করুন
              </p>
            </div>

            {authError && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  অ্যাডমিন ইমেইল
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="admin@lms.com"
                  className="w-full rounded-lg border border-stone-300 bg-stone-50/50 px-3.5 py-2 text-xs text-gray-900 outline-none focus:border-[#C2410C] focus:bg-white"
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] font-medium text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-stone-300 bg-stone-50/50 px-3.5 py-2 text-xs text-gray-900 outline-none focus:border-[#C2410C] focus:bg-white"
                />
                {errors.password && (
                  <p className="mt-1 text-[11px] font-medium text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full h-10 items-center justify-center gap-2 rounded-lg bg-[#C2410C] px-4 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#a6370a] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  "ভেরিফাই করা হচ্ছে..."
                ) : (
                  <>
                    প্যানেলে প্রবেশ করুন
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 rounded-lg bg-stone-50 p-3 border border-stone-200/60 flex items-start gap-2">
              <Info className="h-4 w-4 text-stone-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-stone-500 leading-relaxed">
                এটি শুধুমাত্র সিস্টেম অ্যাডমিনদের জন্য।
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 w-full border-t border-stone-200/80 bg-white/60 backdrop-blur-md shrink-0 py-3 text-center text-xs text-gray-500">
        Loan Tracker © 2026 | সিস্টেম অ্যাডমিনিস্ট্রেশন প্যানেল
      </footer>
    </main>
  );
}