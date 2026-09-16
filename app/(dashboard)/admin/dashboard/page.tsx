import { AppShell } from "@/src/components/layout/app-shell";


export default function AdminDashboardPage() {
  return (
    <AppShell role="ADMIN">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          ড্যাশবোর্ড
        </h1>

        <p className="mt-1 text-sm text-muted">
          সিস্টেমের সামগ্রিক কার্যক্রম
        </p>
      </div>
    </AppShell>
  );
}