"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldCheck, LogIn, ArrowRight, Building2, AlertCircle, UserPlus } from "lucide-react";
import { authClient } from "@/src/lib/auth-client";


const managerLoginSchema = z.object({
  email: z.string().email({ message: "সঠিক ইমেইল এড্রেস লিখুন" }),
  password: z.string().min(6, { message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে" }),
});

type ManagerLoginFormData = z.infer<typeof managerLoginSchema>;

export default function ManagerLoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ManagerLoginFormData>({
    resolver: zodResolver(managerLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ManagerLoginFormData) => {
    setAuthError(null);

    try {
      // Better-Auth Client sign-in request to Port 5000
      const { data: resData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setAuthError(error.message || "ম্যানেজার ক্রেডেনশিয়ালস সঠিক নয় বা একাউন্টটি এখনও পেন্ডিং রয়েছে।");
        return;
      }

      // Successful login redirect to Manager Dashboard
      router.push("/manager/dashboard");
    } catch (err) {
      setAuthError("সার্ভারে সমস্যা দেখা দিয়েছে। পরে চেষ্টা করুন।");
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#FAF9F7] text-gray-900 font-sans flex flex-col justify-between overflow-hidden selection:bg-[#C2410C]/10 selection:text-[#C2410C]">
      {/* Background Pattern & Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] rounded-full bg-gradient-to-tr from-orange-100/40 via-stone-200/30 to-transparent blur-3xl opacity-70" />
        <div 
          className="h-full w-full opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(#1c1917 0.75px, transparent 0.75px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full border-b border-stone-200/80 bg-white/60 backdrop-blur-md shrink-0">
        <div className="mx-auto flex h-16 max-w-[1550px] items-center justify-between px-6 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C2410C] font-bold text-white shadow-sm text-lg">
              ঋ
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight tracking-tight">
                Loan Tracker
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                ম্যানেজার পোর্টাল
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/80 px-3 py-1 text-xs text-gray-600 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="font-medium">সুরক্ষিত পোর্টাল</span>
          </div>
        </div>
      </header>

      {/* Main Login Form Section */}
      <section className="relative z-10 flex-1 flex items-center justify-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-stone-200/90 bg-white/95 p-7 shadow-xl shadow-stone-200/40 backdrop-blur-sm">
            
            {/* Header Content */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 border border-stone-200 px-2.5 py-1 text-xs font-semibold text-stone-700 mb-3">
                <Building2 className="h-3.5 w-[#C2410C]" />
                ম্যানেজার পোর্টাল
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                ম্যানেজার লগইন
              </h2>
              <p className="mt-1 text-xs text-gray-500 font-medium">
                আপনার ইমেইল ও পাসওয়ার্ড দিয়ে একাউন্টে প্রবেশ করুন
              </p>
            </div>

            {/* Error Alert */}
            {authError && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  ইমেইল এড্রেস
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="manager@loantracker.com"
                  className={`w-full rounded-lg border bg-stone-50/50 px-3.5 py-2 text-xs text-gray-900 shadow-sm outline-none transition-all focus:bg-white focus:ring-1 ${
                    errors.email 
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                      : "border-stone-300 focus:border-[#C2410C] focus:ring-[#C2410C]"
                  }`}
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
                  className={`w-full rounded-lg border bg-stone-50/50 px-3.5 py-2 text-xs text-gray-900 shadow-sm outline-none transition-all focus:bg-white focus:ring-1 ${
                    errors.password 
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                      : "border-stone-300 focus:border-[#C2410C] focus:ring-[#C2410C]"
                  }`}
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
                  "যাচাই করা হচ্ছে..."
                ) : (
                  <>
                    প্যানেলে প্রবেশ করুন
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Registration Link */}
            <div className="mt-6 pt-4 border-t border-stone-200/80 text-center">
              <p className="text-xs text-gray-600">
                নতুন ম্যানেজার?{" "}
                <Link href="/manager-register" className="font-semibold text-[#C2410C] hover:underline inline-flex items-center gap-1">
                  এখানে রেজিস্ট্রেশন করুন <UserPlus className="h-3 w-3" />
                </Link>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-stone-200/80 bg-white/60 backdrop-blur-md shrink-0 py-3 text-center text-xs text-gray-500">
        Loan Tracker © 2026 | Manager Access Portal
      </footer>
    </main>
  );
}