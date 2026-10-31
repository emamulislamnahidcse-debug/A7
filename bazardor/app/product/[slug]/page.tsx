"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { getBanglaDate, toBanglaNumber } from "@/lib/utils";
import { useState, useEffect, use } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = products.find((p) => p.slug === slug);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(getBanglaDate());
  }, []);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold">পণ্যটি পাওয়া যায়নি</h1>
      </div>
    );
  }

  
  const allMins = product.markets?.map((m) => m.min) || [Math.round(product.price * 0.9)];
  const allMaxs = product.markets?.map((m) => m.max) || [Math.round(product.price * 1.1)];
  const lowestMin = Math.min(...allMins);
  const highestMax = Math.max(...allMaxs);

   
  const categoryMap: { [key: string]: string } = {
    chal: "চাল",
    dal: "ডাল",
    tel: "তেল",
    sobji: "সবজি",
    mach: "মাছ",
    mansho: "মাংস",
    "dim-dudh": "ডিম-দুধ",
    moshla: "মসলা"
  };

  const banglaCategory = categoryMap[product.category] || product.category;

   
  const diffTaka = Math.round((product.price * Math.abs(product.change)) / 100);
  const takaStr = toBanglaNumber(diffTaka > 0 ? diffTaka : 1);

  const summaryText = product.change === 0
    ? "গতকালের তুলনায় দাম অপরিবর্তিত রয়েছে"
    : product.change > 0
    ? `গতকালের তুলনায় আজ দাম বেড়েছে ${takaStr} টাকা`
    : `গতকালের তুলনায় আজ দাম কমেছে ${takaStr} টাকা`;

  return (
    <main className="min-h-screen bg-[#f4f6f4] text-gray-800 pb-16">
      <div className="max-w-7xl mx-auto px-4 pt-4 space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>›</span>
          <span>{banglaCategory}</span>
          <span>›</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        {/* Top Product Banner Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-3xl shadow-inner">
              {product.emoji}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">
                {product.name}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {product.unit} — {banglaCategory}
              </p>
              <p className="text-xs text-emerald-700 font-medium mt-1">
                {summaryText}
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200/80 px-6 py-3 rounded-2xl text-center shadow-sm min-w-[130px]">
            <span className="text-[10px] text-gray-400 block font-medium">আজকের দাম</span>
            <span className="text-xl font-extrabold text-gray-900">
              {toBanglaNumber(product.price)}
            </span>
            <span className="text-[10px] text-gray-500 block">
              টাকা/{product.unit.replace("প্রতি ", "")}
            </span>
            <span className={`text-[10px] font-bold mt-0.5 block ${product.change >= 0 ? "text-red-500" : "text-emerald-600"}`}>
              {product.change >= 0 ? `▲ ${product.change}%` : `▼ ${Math.abs(product.change)}%`}
            </span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-gray-700 px-1">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm space-y-1">
              <span className="text-[11px] text-gray-400 block font-medium">সর্বনিম্ন দাম</span>
              <span className="text-xl font-extrabold text-gray-900 block">
                {toBanglaNumber(lowestMin)} টাকা
              </span>
              <span className="text-[10px] text-gray-400 block pt-1">সবচেয়ে কম দামের বাজার</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm space-y-1">
              <span className="text-[11px] text-gray-400 block font-medium">সর্বাধিক দাম</span>
              <span className="text-xl font-extrabold text-gray-900 block">
                {toBanglaNumber(highestMax)} টাকা
              </span>
              <span className="text-[10px] text-gray-400 block pt-1">সবচেয়ে বেশি দামের বাজার</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm space-y-1">
              <span className="text-[11px] text-gray-400 block font-medium">গড় দাম</span>
              <span className="text-xl font-extrabold text-emerald-700 block">
                {toBanglaNumber(product.price)} টাকা
              </span>
              <span className="text-[10px] text-gray-400 block pt-1">প্রতি {product.unit.replace("প্রতি ", "")}-এর হিসাবে</span>
            </div>
          </div>
        </div>

        {/* Market Table Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-medium">
                  <th className="py-3 px-3">বাজার</th>
                  <th className="py-3 px-3">বিভাগ</th>
                  <th className="py-3 px-3">সর্বনিম্ন</th>
                  <th className="py-3 px-3">সর্বাধিক</th>
                  <th className="py-3 px-3">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700 font-normal">
                {product.markets && product.markets.map((m: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition">
                    <td className="py-3.5 px-3 font-semibold text-gray-900">{m.name}</td>
                    <td className="py-3.5 px-3 text-gray-500">{m.division}</td>
                    <td className="py-3.5 px-3">{toBanglaNumber(m.min)} টাকা</td>
                    <td className="py-3.5 px-3">{toBanglaNumber(m.max)} টাকা</td>
                    <td className="py-3.5 px-3 font-bold text-gray-900">{toBanglaNumber(m.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-xs text-gray-400 py-6 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4">
        <span>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        <span>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</span>
      </footer>
    </main>
  );
}