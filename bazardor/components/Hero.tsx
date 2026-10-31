import Image from "next/image";
import { getBanglaDate } from "../lib/utils";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="grid items-center gap-6 rounded-3xl border border-base-300 bg-[var(--card)] p-6 md:grid-cols-2 md:p-10">
        <div>
          <span
            className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800"
            suppressHydrationWarning
          >
            {getBanglaDate()}
          </span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn btn-sm sm:btn-md mt-5 border-none bg-[var(--brand)] text-white"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ঝুড়ি"
            width={420}
            height={320}
            className="h-auto w-full max-w-sm"
            priority
          />
        </div>
      </div>
    </section>
  );
}