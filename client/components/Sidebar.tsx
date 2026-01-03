"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import {
  LayoutDashboard,
  Briefcase,
  CheckCircle,
  FileText,
  Settings,
  LogOut,
  User,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

interface SidebarLink {
  href: string;
  label: string;
  icon: any;
}

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const roleLinks: Record<string, SidebarLink[]> = {
    worker: [
      { href: "/dashboard/worker", label: "Dashboard", icon: LayoutDashboard },
      { href: "/jobs", label: "Find Jobs", icon: Briefcase },
      {
        href: "/dashboard/worker?tab=skills",
        label: "My Skills",
        icon: CheckCircle,
      },
      { href: "/profile/me", label: "Public Profile", icon: User },
    ],
    employer: [
      {
        href: "/dashboard/employer",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        href: "/dashboard/employer?tab=post-job",
        label: "Post a Job",
        icon: FileText,
      },
      { href: "/freelancers", label: "Find Talent", icon: User },
    ],
    admin: [
      { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/admin/tasks", label: "Manage Tasks", icon: Settings },
    ],
  };

  const links = roleLinks[user.role] || [];

  const NavContent = () => (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold font-heading bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            EduSkill360
          </span>
        </Link>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-3 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
            {user.name.substring(0, 2)}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium truncate">{user.name}</span>
            <span className="text-xs text-slate-500 capitalize">
              {user.role}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
        <NavContent />
      </aside>

      {/* Mobile Trigger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shadow-md bg-white dark:bg-slate-900"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r w-72">
            <SheetTitle className="sr-only">Sidebar Navigation</SheetTitle>
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
