import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="h-screen w-full bg-[#FAF9F7] text-gray-900 font-sans flex flex-col justify-between overflow-hidden selection:bg-[#C2410C]/10 selection:text-[#C2410C]">
      {/* Navigation Header */}
      <header className="w-full border-b border-gray-200/80 bg-white/50 backdrop-blur-md shrink-0">
        <div className="mx-auto flex h-16 max-w-[1550px] items-center justify-between px-6 sm:px-8 lg:px-12">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C2410C] font-bold text-white shadow-sm text-lg">
              ঋ
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight tracking-tight">
                Loan Tracker
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                অফিস কন্ট্রোল সিস্টেম
              </p>
            </div>
          </div>

          {/* Right Action & Security Badge */}
          <div className="flex items-center gap-5">
            <Link 
              href="/support" 
              className="hidden sm:inline-flex text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              সহায়তা
            </Link>

            <div className="flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-3 py-1 text-xs text-gray-600 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="font-medium">এনক্রিপ্টেড ডাটাবেজ</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-6">
        <div className="mx-auto max-w-[1550px] px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              {/* Context Tag */}
              <div className="inline-flex items-center gap-2 rounded-md bg-stone-200/60 border border-stone-300/50 px-2.5 py-1 text-xs font-medium text-gray-700">
                <Building2 className="h-3.5 w-3.5 text-[#C2410C]" />
                আভ্যন্তরীণ মাইক্রো-ফাইনান্স অপারেটিং সিস্টেম
              </div>

              {/* Main Headline */}
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl leading-[1.2]">
                লোন কালেকশন ও অনবোর্ডিং ম্যানেজ করুন {" "}
                <span className="text-[#C2410C]">
                  এক সেন্ট্রাল ড্যাশবোর্ডে
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 text-base text-gray-600 sm:text-lg leading-relaxed max-w-2xl">
                ম্যানুয়াল খাতার ঝামেলা এড়িয়ে ম্যানেজার এবং ওনারের কাজের স্বচ্ছতা বাড়ান। ফিল্ড লেভেলের কালেকশন ট্র্যাকিং থেকে অনবোর্ডিং অনুমোদন—সবকিছু এক সেন্ট্রাল প্ল্যাটফর্মে।
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#C2410C] px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#a6370a]"
                >
                  ম্যানেজার প্যানেল
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="login"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900"
                >
                  অ্যাডমিন প্যানেল
                </Link>
              </div>

              {/* Feature Points */}
              <div className="mt-8 border-t border-gray-200/80 pt-5">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ম্যানেজার পরিচালিত সিস্টেম
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ওনার এপ্রুভাল ওয়ার্কফ্লো
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    নো-গ্রাহক লগইন ইন্টারফেস
                  </div>
                </div>
              </div>
            </div>

            {/* Right Mockup Column */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="rounded-xl border border-gray-200/90 bg-white p-6 shadow-sm">
                
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                     Kushumba Branch,Manda Naogaon
                    </span>
                    <h3 className="text-sm font-bold text-gray-800">
                      দৈনিক সংগ্রহ কালেকশন
                    </h3>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200">
                    অপারেশনাল
                  </span>
                </div>

                {/* Stat Box */}
                <div className="my-4 rounded-lg bg-[#FAF9F7] p-4 border border-gray-100">
                  <div className="text-xs font-medium text-gray-500">
                    আজকের সংগৃহীত পরিমাণ
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-gray-900">৳ ১২,৫০৩</span>
                    <span className="text-xs font-semibold text-[#C2410C]">
                      ৬৫% অর্জিত
                    </span>
                  </div>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-[65%] rounded-full bg-[#C2410C]" />
                  </div>
                </div>

                {/* Table Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-2.5 text-xs">
                    <div>
                      <div className="font-semibold text-gray-800">মোঃ রফিকুল ইসলাম</div>
                      <div className="text-[11px] text-gray-400">LN-1024</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">৳ ২,০০০</div>
                      <span className="text-[10px] text-emerald-600 font-medium">আদায়কৃত</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-2.5 text-xs">
                    <div>
                      <div className="font-semibold text-gray-800">আব্দুল করিম</div>
                      <div className="text-[11px] text-gray-400">LN-1028</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">৳ ১,৫০৩</div>
                      <span className="text-[10px] text-amber-600 font-medium">অপেক্ষমাণ</span>
                    </div>
                  </div>
                </div>

                {/* Footer Status */}
                <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100 pt-3">
                  <span>সর্বশেষ আপডেট: আজকে</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200/80 bg-white/40 shrink-0">
        <div className="mx-auto flex max-w-[1550px] items-center justify-between px-6 sm:px-8 lg:px-12 py-3 text-xs text-gray-500">
          <p className="font-semibold text-gray-700">Loan Tracker</p>
          <p className="text-[11px]">শুধুমাত্র অনুমোদিত অফিসের ব্যবহারের জন্য</p>
        </div>
      </footer>
    </main>
  );
}