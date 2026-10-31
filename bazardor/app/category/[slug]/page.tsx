"use client";

import { useState, use } from "react";
import Link from "next/link";
import { products, categories } from "@/lib/products";
import { formatPrice, formatPercent, toBanglaNumber } from "@/lib/utils";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  // Category slug mapping
  const categoryMap: { [key: string]: string } = {
    mangsho: "mansho",
    mansho: "mansho",
    meat: "mansho",
    chal: "chal",
    dal: "dal",
    tel: "tel",
    sobji: "sobji",
    mach: "mach",
    "dim-dudh": "dim-dudh",
    moshla: "moshla",
  };

  const targetCategorySlug = categoryMap[slug] || slug;

  // Find category
  const category = categories.find(
    (c) => c.slug === targetCategorySlug
  ) || {
    name: "মাংস",
    slug: targetCategorySlug,
    emoji: "🥩",
  };

  // Filter products
  const categoryProducts = products.filter(
    (p) => p.category === targetCategorySlug
  );

  const [sortOption, setSortOption] = useState<string>("default");

  // Sort products
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortOption === "lowToHigh") {
      return a.price - b.price;
    }

    if (sortOption === "highToLow") {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-gray-800 pb-16">
      <div className="max-w-7xl mx-auto px-4 pt-6 space-y-6">

        {/* Category Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <span>{category.emoji || "🥩"}</span>
              <span>{category.name}</span>
            </h1>

            <p className="text-xs text-gray-500">
              মোট {toBanglaNumber(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>

          {/* Sort Option */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600">
              সাজান:
            </span>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-gray-300 text-xs rounded-lg px-3 py-2 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm"
            >
              <option value="default">ডিফল্ট</option>
              <option value="lowToHigh">দাম: কম থেকে বেশি</option>
              <option value="highToLow">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-3">

          <p className="text-xs font-medium text-gray-500">
            মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
          </p>

          {sortedProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center border border-gray-200">
              <p className="text-xs text-gray-500">
                এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

              {sortedProducts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/product/${item.slug}`}
                  className="bg-white p-4 rounded-xl border border-gray-200 hover:border-emerald-500 transition shadow-sm flex items-start justify-between"
                >

                  <div className="space-y-2">

                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {item.emoji}
                      </span>

                      <div>
                        <h3 className="text-xs font-bold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="text-[10px] text-gray-400">
                          {item.unit}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] text-gray-400 block">
                        আজকের দাম
                      </span>

                      <span className="text-sm font-extrabold text-gray-900">
                        {formatPrice(item.price)} টাকা
                      </span>
                    </div>

                  </div>

                  {/* Price Change */}
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      item.change > 0
                        ? "text-red-600 bg-red-50"
                        : item.change < 0
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-600 bg-gray-100"
                    }`}
                  >
                    {formatPercent(item.change)}
                  </span>

                </Link>
              ))}

            </div>
          )}

        </div>
      </div>
    </main>
  );
}
