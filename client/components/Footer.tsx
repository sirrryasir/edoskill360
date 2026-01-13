"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                EduSkill360
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs">
              The trusted platform for verified skills and freelance
              opportunities. Prove your skills, get hired with confidence.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links - Find Work */}
          <div>
            <h3 className="font-semibold text-white mb-4">Find Work</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-blue-400 transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/worker"
                  className="hover:text-blue-400 transition-colors"
                >
                  Take Skill Tests
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/me"
                  className="hover:text-blue-400 transition-colors"
                >
                  Create Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - Find Talent */}
          <div>
            <h3 className="font-semibold text-white mb-4">Find Talent</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/talents"
                  className="text-base text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                >
                  Browse Talent
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/employer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/enterprise"
                  className="hover:text-blue-400 transition-colors"
                >
                  Enterprise Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 shrink-0" />
                <span>
                  123 Innovation Drive, Tech District, Mogadishu, Somalia
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                <a
                  href="mailto:support@eduskill360.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  support@eduskill360.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                <span>+252 61 500 0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} EduSkill360. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
