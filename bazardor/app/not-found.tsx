import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <p className="text-6xl">🛒</p>
      <h1 className="mt-4 text-3xl font-bold">৪০৪ - পাতাটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-600">
        আপনি যে পাতাটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।
      </p>
      <Link
        href="/"
        className="btn mt-6 border-none bg-[var(--brand)] text-white"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}