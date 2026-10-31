import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const bn = (s: string) => s.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);

type Item = {
  slug: string;
  name: string;
  unit: string;
  price: number;
  change: number;
  emoji: string;
};

function Badge({ change }: { change: number }) {
  if (change === 0)
    return <span className="rounded-full bg-[#eef2ed] px-2.5 py-1 text-xs font-semibold">— ০.০%</span>;
  const up = change > 0;
  return (
    <span
      className={`rounded-full bg-[#eef2ed] px-2.5 py-1 text-xs font-semibold ${
        up ? "text-red-600" : "text-[#058a3e]"
      }`}
    >
      {up ? "▲" : "▼"} {bn(Math.abs(change).toFixed(1))}%
    </span>
  );
}

export default function ProductCard({ item }: { item: Item }) {
  return (
    <Link
      href={`/product/${item.slug}`}
      className="block rounded-[14px] border border-[#e1e7e0] bg-[#fafcf9] p-4 transition hover:shadow-md"
    >
      <div className="flex items-center gap-2.5">
        <div className="grid h-11 w-11 place-items-center rounded-[10px] bg-[#eef2ed] text-[22px]">
          {item.emoji}
        </div>
        <div>
          <h3 className="text-base font-bold leading-tight">{item.name}</h3>
          <p className="text-xs text-[#5d6b61]">{item.unit}</p>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <span className="block text-xs">আজকের দাম</span>
          <span className="text-xl font-bold">{formatPrice(item.price)}</span> <span className="text-sm">টাকা</span>
        </div>
        <Badge change={item.change} />
      </div>
    </Link>
  );
}