import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const bn = (s: string) => s.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);

export default function Ticker() {
  const items = products.slice(0, 10);

  const row = (k: string) =>
    items.map((p) => (
      <span key={k + p.slug} className="inline-block border-r border-[#e1e7e0] px-4 py-2 text-[13px]">
        {p.emoji} <b>{p.name}</b> {formatPrice(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}{" "}
        <span
          className={`font-bold ${
            p.change > 0 ? "text-red-600" : p.change < 0 ? "text-[#058a3e]" : "text-gray-500"
          }`}
        >
          {p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"} {bn(Math.abs(p.change).toFixed(1))}%
        </span>
      </span>
    ));

  return (
    <div className="overflow-hidden whitespace-nowrap border-b border-[#e1e7e0] bg-[#fafcf9]">
      <div className="inline-block animate-[tick_60s_linear_infinite]">
        {row("a")}
        {row("b")}
      </div>
      <style>{`@keyframes tick{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}