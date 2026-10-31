"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/utils";
import UserMenu from "./UserMenu";

 
const CATEGORIES = [
  { name: "চাল", icon: "🍚", slug: "chal" },
  { name: "ডাল", icon: "🫘", slug: "dal" },
  { name: "তেল", icon: "🛢️", slug: "tel" },
  { name: "সবজি", icon: "🥬", slug: "sobji" },
  { name: "মাছ", icon: "🐟", slug: "mach" },
  { name: "মাংস", icon: "🍗", slug: "mangsho" },
  { name: "ডিম-দুধ", icon: "🥛", slug: "dim-dudh" },
  { name: "মসলা", icon: "🌶️", slug: "moshla" },
  
];

export default function Navbar() {
  const pathname = usePathname();
  const [date, setDate] = useState("");

  useEffect(() => setDate(getBanglaDate()), []);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e1e7e0] bg-[#fafcf9]">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#058a3e] text-xl">🛒</span>
          <span>
            <b className="block text-lg leading-tight">বাজার দর</b>
            <small className="text-[11px] text-[#5d6b61]">{date || "\u00A0"}</small>
          </span>
        </Link>
        <UserMenu />
      </div>

      <nav className="mx-auto flex max-w-[1100px] gap-1.5 overflow-x-auto border-t border-[#e1e7e0] px-5 py-2">
        {CATEGORIES.map((c) => {
          const href = `/category/${c.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={c.slug}
              href={href}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-[13px] font-semibold ${
                active ? "bg-[#058a3e] text-white" : "hover:bg-[#eef2ed]"
              }`}
            >
              <span>{c.icon}</span>
              {c.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}