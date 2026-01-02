import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
      <Sidebar />
      <main className="md:pl-64 min-h-screen transition-all duration-300">
        <div className="container mx-auto p-4 md:p-8 pt-20 md:pt-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
