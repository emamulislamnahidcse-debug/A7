import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { toBanglaNumber } from "@/lib/utils";

export default function HomePage() {
  // সবচেয়ে বেশি দাম বাড়া ৬টি পণ্য
  const risers = products
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  // সবচেয়ে বেশি দাম কমা ৬টি পণ্য
  const fallers = products
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="mx-auto max-w-[1100px] px-5">
      <Hero />

      <h2 className="mb-3.5 mt-8 text-xl font-bold">
        <span className="text-red-600">▲</span> আজ দাম বেড়েছে
      </h2>
      <div className={grid}>
        {risers.map((p) => (
          <ProductCard key={p.slug} item={p} />
        ))}
      </div>

      <h2 className="mb-3.5 mt-8 text-xl font-bold">
        <span className="text-[#058a3e]">▼</span> আজ দাম কমেছে
      </h2>
      <div className={grid}>
        {fallers.map((p) => (
          <ProductCard key={p.slug} item={p} />
        ))}
      </div>

      <h2 id="all" className="mb-1 mt-8 scroll-mt-32 text-xl font-bold">
        সব পণ্য
      </h2>
      <p className="mb-3.5 text-[13px] text-[#5d6b61]">
        মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <div className={grid}>
        {products.map((p) => (
          <ProductCard key={p.slug} item={p} />
        ))}
      </div>
    </div>
  );
}