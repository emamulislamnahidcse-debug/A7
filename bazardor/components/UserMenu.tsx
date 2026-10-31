"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
 import { getUser, saveUser, clearUser, User } from "@/lib/auth-client";

export default function UserMenu() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => {
      setUser(getUser());
      setReady(true);
    };
    load();
    setOpen(false);
    window.addEventListener("user-change", load);
    return () => window.removeEventListener("user-change", load);
  }, [pathname]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  if (!ready) return <div className="h-9 w-24" />;

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/signin" className="text-sm font-semibold">
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="rounded-[9px] bg-[#058a3e] px-[18px] py-2 text-sm font-semibold text-white shadow-[0_3px_6px_rgba(5,138,62,.3)]"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 text-sm font-medium">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#058a3e] font-bold uppercase text-white">
          {user.name ? user.name.charAt(0) : "U"}
        </span>
        {user.name.split(" ")[0]} <span className="text-[10px]">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-60 rounded-xl border border-[#e1e7e0] bg-[#fafcf9] p-4 shadow-xl">
          <b className="block">{user.name}</b>
          <small className="text-[#5d6b61]">{user.email}</small>
          <Link href="/profile" className="mt-3 block text-sm">
            👤 আমার প্রোফাইল
          </Link>
          <button
            onClick={() => {
              clearUser();
              setOpen(false);
            }}
            className="mt-3 block text-sm text-red-600"
          >
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}