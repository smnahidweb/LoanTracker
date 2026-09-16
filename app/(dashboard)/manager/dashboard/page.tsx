import { AppShell } from "@/src/components/layout/app-shell";


export default function ManagerDashboardPage() {
  return (
    <AppShell role="MANAGER">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          ড্যাশবোর্ড
        </h1>

        <p className="mt-1 text-sm text-muted">
          আজকের কার্যক্রমের সংক্ষিপ্ত বিবরণ
        </p>
      </div>
    </AppShell>
  );
}