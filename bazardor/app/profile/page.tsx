"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, saveUser, clearUser, User } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const u = getUser();
    if (!u) {
      router.replace("/signin");
      return;
    }
    setUser(u);
    setName(u.name);
  }, [router]);

  if (!user) return null;

  const handleUpdate = () => {
    const n = name.trim();
    if (!n) return;
    const updated = { ...user, name: n };
    saveUser(updated);
    setUser(updated);
    setMsg("✓ প্রোফাইল আপডেট হয়েছে।");
  };

  const handleSignOut = () => {
    clearUser();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-[660px] px-5">
      <h1 className="text-[28px] font-bold leading-tight">আমার প্রোফাইল</h1>
      <p className="mb-5 text-sm text-[#5d6b61]">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e1e7e0] bg-[#fafcf9] p-5">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-[14px] bg-[#058a3e] text-[26px] font-bold uppercase text-white">
            {user.name.charAt(0)}
          </span>
          <div>
            <b className="block text-[19px]">{user.name}</b>
            <span className="text-[#5d6b61]">{user.email}</span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-lg border border-red-600 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          ↩ সাইন আউট
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-[#e1e7e0] bg-[#fafcf9] p-5">
        <h3 className="mb-4 text-lg font-bold">তথ্য</h3>
        <label className="mb-1.5 block text-sm font-semibold">নাম</label>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setMsg("");
          }}
          className="mb-3.5 w-full rounded-[9px] border border-[#e1e7e0] bg-[#fafcf9] px-3.5 py-[11px] text-sm outline-none focus:border-[#058a3e]"
        />
        <button
          onClick={handleUpdate}
          className="w-full rounded-[9px] bg-[#058a3e] py-3 text-sm font-semibold text-white shadow-[0_3px_6px_rgba(5,138,62,.3)] hover:bg-[#047a37]"
        >
          আপডেট
        </button>
        {msg && <p className="mt-3 text-sm text-[#058a3e]">{msg}</p>}
      </div>
    </div>
  );
}