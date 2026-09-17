/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldCheck, UserPlus, Building2, AlertCircle, CheckCircle2, LogIn } from "lucide-react";
import { api } from "@/src/lib/api";


const registerSchema = z.object({
  name: z.string().min(2, { message: "সম্পূর্ণ নাম অন্তত ২ অক্ষরের হতে হবে" }),
  email: z.string().email({ message: "সঠিক ইমেইল এড্রেস লিখুন" }),
  password: z.string().min(6, { message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে" }),
  phone: z.string().min(11, { message: "সঠিক ১১ ডিজিটের ফোন নম্বর দিন" }),
  branch: z.string().min(2, { message: "ব্রাঞ্চের নাম উল্লেখ করুন" }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function ManagerRegisterPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      branch: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setAuthError(null);

    try {
      // Backend (Port 5000) Hit via src/lib/api.ts
      await api.post("/api/auth/register-manager", data);

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/manager-login");
      }, 2000);
    } catch (err: any) {
      setAuthError(
        err.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে। ডাটা যাচাই করুন।"
      );
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#FAF9F7] text-gray-900 font-sans flex flex-col justify-between overflow-hidden selection:bg-[#C2410C]/10 selection:text-[#C2410C]">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] rounded-full bg-gradient-to-tr from-orange-100/40 via-stone-200/30 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full border-b border-stone-200/80 bg-white/60 backdrop-blur-md shrink-0">
        <div className="mx-auto flex h-16 max-w-[1550px] items-center justify-between px-6 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C2410C] font-bold text-white text-lg">
              ঋ
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">Loan Tracker</h1>
              <p className="text-[11px] text-gray-500 font-medium">স্টাফ অনবোর্ডিং</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/80 px-3 py-1 text-xs text-gray-600 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="font-medium">সুরক্ষিত পোর্টাল</span>
          </div>
        </div>
      </header>

      {/* Main Form Section */}
      <section className="relative z-10 flex-1 flex items-center justify-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-lg">
          <div className="rounded-2xl border border-stone-200/90 bg-white/95 p-7 shadow-xl backdrop-blur-sm">
            
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 border border-stone-200 px-2.5 py-1 text-xs font-semibold text-stone-700 mb-3">
                <Building2 className="h-3.5 w-[#C2410C]" />
                ম্যানেজার একাউন্ট রেজিস্ট্রেশন
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                নতুন একাউন্টের আবেদন করুন
              </h2>
              <p className="mt-1 text-xs text-gray-500 font-medium">
                রেজিস্ট্রেশনের পর একাউন্ট অ্যাপ্রুভ হলে লগইন করতে পারবেন
              </p>
            </div>

            {/* Notifications */}
            {isSuccess && (
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>রেজিস্ট্রেশন সফল হয়েছে! লগইন পেজে রিডাইরেক্ট করা হচ্ছে...</span>
              </div>
            )}

            {authError && (
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">পূর্ণ নাম</label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="যেমন: সাইফুল ইসলাম"
                  className="w-full rounded-lg border border-stone-300 bg-stone-50/50 px-3.5 py-2 text-xs text-gray-900 outline-none focus:border-[#C2410C] focus:bg-white"
                />
                {errors.name && <p className="mt-1 text-[11px] text-red-600">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="saiful@lms.com"
                    className="w-full rounded-lg border border-stone-300 bg-stone-50/50 px-3.5 py-2 text-xs text-gray-900 outline-none focus:border-[#C2410C] focus:bg-white"
                  />
                  {errors.email && <p className="mt-1 text-[11px] text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">ফোন নম্বর</label>
                  <input
                    type="text"
                    {...register("phone")}
                    placeholder="01711223344"
                    className="w-full rounded-lg border border-stone-300 bg-stone-50/50 px-3.5 py-2 text-xs text-gray-900 outline-none focus:border-[#C2410C] focus:bg-white"
                  />
                  {errors.phone && <p className="mt-1 text-[11px] text-red-600">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">অফিস ব্রাঞ্চ</label>
                  <input
                    type="text"
                    {...register("branch")}
                    placeholder="যেমন: Dhanmondi"
                    className="w-full rounded-lg border border-stone-300 bg-stone-50/50 px-3.5 py-2 text-xs text-gray-900 outline-none focus:border-[#C2410C] focus:bg-white"
                  />
                  {errors.branch && <p className="mt-1 text-[11px] text-red-600">{errors.branch.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-stone-300 bg-stone-50/50 px-3.5 py-2 text-xs text-gray-900 outline-none focus:border-[#C2410C] focus:bg-white"
                  />
                  {errors.password && <p className="mt-1 text-[11px] text-red-600">{errors.password.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="mt-3 inline-flex w-full h-10 items-center justify-center gap-2 rounded-lg bg-[#C2410C] px-4 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#a6370a] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  "আবেদন পাঠানো হচ্ছে..."
                ) : (
                  <>
                    রেজিস্ট্রেশন সম্পূর্ণ করুন
                    <UserPlus className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-stone-200/80 text-center">
              <p className="text-xs text-gray-600">
                আগে থেকেই একাউন্ট আছে?{" "}
                <Link href="/manager-login" className="font-semibold text-[#C2410C] hover:underline inline-flex items-center gap-1">
                  ম্যানেজার লগইন করুন <LogIn className="h-3 w-3" />
                </Link>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-stone-200/80 bg-white/60 py-3 text-center text-xs text-gray-500">
        Loan Tracker © 2026 | Manager Onboarding Portal
      </footer>
    </main>
  );
}