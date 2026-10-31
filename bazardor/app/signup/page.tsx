"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser, saveUser } from "@/lib/auth";

const inputCls =
  "mb-3.5 w-full rounded-[9px] border border-[#e1e7e0] bg-[#fafcf9] px-3.5 py-[11px] text-sm outline-none focus:border-[#058a3e]";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (getUser()) router.replace("/");
  }, [router]);

  const login = (user: { name: string; email: string }) => {
    saveUser(user);
    router.push("/");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে।");
      return;
    }

    if (password !== confirm) {
      setError("পাসওয়ার্ড মিলছে না।");
      return;
    }

    if (name.trim() && email) {
      login({ name: name.trim(), email });
    }
  };

  return (
    <div className="mx-auto max-w-[400px] px-5 py-5 text-center">

      <h1 className="mb-1 mt-5 text-[28px] font-bold">
        অ্যাকাউন্ট তৈরি করুন
      </h1>

      <p className="mb-5 text-[#5d6b61]">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form
        onSubmit={handleSignUp}
        className="rounded-2xl border border-[#e1e7e0] bg-[#fafcf9] p-[22px] text-left"
      >

        <label className="mb-1.5 block text-sm font-semibold">
          নাম
        </label>

        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="যেমন: রহিম উদ্দিন"
          className={inputCls}
        />

        <label className="mb-1.5 block text-sm font-semibold">
          ইমেইল
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputCls}
        />

        <label className="mb-1.5 block text-sm font-semibold">
          পাসওয়ার্ড
        </label>

        <input
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          placeholder="কমপক্ষে ৮ অক্ষর"
          className={inputCls}
        />

        <label className="mb-1.5 block text-sm font-semibold">
          পাসওয়ার্ড নিশ্চিত করুন
        </label>

        <input
          type="password"
          required
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setError("");
          }}
          placeholder="আবার লিখুন"
          className={inputCls}
        />

        {error && (
          <p className="-mt-1.5 mb-3 text-[13px] text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-[9px] bg-[#058a3e] py-3 text-sm font-semibold text-white shadow-[0_3px_6px_rgba(5,138,62,.3)] hover:bg-[#047a37]"
        >
          অ্যাকাউন্ট তৈরি করুন
        </button>

        <div className="my-4 flex items-center gap-3 text-xs text-[#5d6b61]">
          <span className="h-px flex-1 bg-[#e1e7e0]" />
          অথবা
          <span className="h-px flex-1 bg-[#e1e7e0]" />
        </div>

        {/* Google and GitHub Buttons */}
        <div className="grid grid-cols-2 gap-2.5">

          {/* Google */}
          <button
            type="button"
            onClick={() =>
              login({
                name: "Google User",
                email: "google@example.com",
              })
            }
            className="flex items-center justify-center gap-2 rounded-[9px] border border-[#e1e7e0] bg-[#fafcf9] px-2 py-2.5 text-[13px] font-semibold hover:bg-[#eef2ed] transition"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.26 5.64c4.24-3.91 7.5-9.69 7.5-17.29z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.78l-7.26-5.64c-2.02 1.35-4.61 2.14-8.64 2.14-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>

            Google দিয়ে চালিয়ে যান
          </button>

          {/* GitHub */}
          <button
            type="button"
            onClick={() =>
              login({
                name: "GitHub User",
                email: "github@example.com",
              })
            }
            className="flex items-center justify-center gap-2 rounded-[9px] border border-[#e1e7e0] bg-[#fafcf9] px-2 py-2.5 text-[13px] font-semibold hover:bg-[#eef2ed] transition"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 fill-[#24292f]"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9z" />
            </svg>

            GitHub দিয়ে চালিয়ে যান
          </button>

        </div>

        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#058a3e]"
          >
            সাইন ইন করুন
          </Link>
        </p>

      </form>

      <Link
        href="/"
        className="mt-6 block text-sm text-[#5d6b61]"
      >
        ← হোম পেজে ফিরে যান
      </Link>

    </div>
  );
}
