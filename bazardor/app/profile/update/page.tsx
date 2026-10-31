
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser, saveUser, User } from "@/lib/auth";

export default function UpdateProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const currentUser = getUser();

    if (!currentUser) {
      router.replace("/signin");
      return;
    }

    setUser(currentUser);
    setName(currentUser.name);
  }, [router]);

  const handleUpdate = () => {
    const newName = name.trim();

    if (!newName) {
      setMsg("দয়া করে আপনার নাম লিখুন।");
      return;
    }

    if (!user) return;

    const updatedUser = {
      ...user,
      name: newName,
    };

    saveUser(updatedUser);
    setUser(updatedUser);
    setMsg("✓ প্রোফাইল আপডেট হয়েছে।");
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-[660px] px-5">

      <h1 className="text-[28px] font-bold">
        প্রোফাইল আপডেট
      </h1>

      <p className="mb-5 text-sm text-[#5d6b61]">
        আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করুন।
      </p>

      <div className="rounded-2xl border border-[#e1e7e0] bg-[#fafcf9] p-5">

        <label className="mb-1.5 block text-sm font-semibold">
          আপনার নাম
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setMsg("");
          }}
          placeholder="আপনার নাম লিখুন"
          className="mb-4 w-full rounded-[9px] border border-[#e1e7e0] bg-white px-3.5 py-[11px] text-sm outline-none focus:border-[#058a3e]"
        />

        <button
          onClick={handleUpdate}
          className="w-full rounded-[9px] bg-[#058a3e] py-3 text-sm font-semibold text-white hover:bg-[#047a37]"
        >
          আপডেট করুন
        </button>

        {msg && (
          <p className="mt-3 text-sm text-[#058a3e]">
            {msg}
          </p>
        )}

        <Link
          href="/profile"
          className="mt-4 block text-center text-sm font-semibold text-[#058a3e] hover:underline"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>

      </div>

    </div>
  );
}
