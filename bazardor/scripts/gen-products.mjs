import { writeFileSync, mkdirSync } from "node:fs";

const BN = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
const bn = (n) => String(n).replace(/\d/g, (d) => BN[d]);

const CATS = {
  chal: "চাল", dal: "ডাল", tel: "তেল", sobji: "সবজি",
  mach: "মাছ", mangsho: "মাংস", "dim-dudh": "ডিম-দুধ", moshla: "মসলা",
};
const KG = "প্রতি কেজি", L = "প্রতি লিটার", DZ = "প্রতি ডজন", PC = "প্রতি পিস";

// [slug, name, emoji, category, unit, price, change%]
const P = [
  ["shormachi-chal", "স্বর্ণমাছি চাল", "🍚", "chal", KG, 148, 2.1],
  ["miniket-chal", "মিনিকেট চাল", "🍚", "chal", KG, 99, -2.9],
  ["najir-chal", "নাজির চাল", "🍚", "chal", KG, 74, 0],
  ["batam-size-chal", "বাটাম সাইজ চাল", "🍚", "chal", KG, 66, 3.1],
  ["moshur-dal", "মসুর ডাল", "🫘", "dal", KG, 142, 2.9],
  ["mug-dal", "মুগ ডাল", "🫘", "dal", KG, 135, 0],
  ["chola", "ছোলা", "🫘", "dal", KG, 120, -2.4],
  ["amon-dal", "আমন ডাল (খোসাসিলা)", "🫘", "dal", KG, 156, 2.6],
  ["sorisha-tel", "সরিষার তেল", "🫙", "tel", L, 192, 2.1],
  ["palm-tel", "পাম তেল", "🛢️", "tel", KG, 168, -2.3],
  ["ghani-sorisha-tel", "ঘানি ভাঙা সরিষার তেল", "🫙", "tel", L, 215, 2.4],
  ["alu", "আলু", "🥔", "sobji", KG, 30, -6.2],
  ["peyaj", "পেঁয়াজ", "🧅", "sobji", KG, 54, 12.5],
  ["kacha-morich", "কাঁচামরিচ", "🌶️", "sobji", KG, 92, -12.4],
  ["begun", "বেগুন", "🍆", "sobji", KG, 44, 4.8],
  ["dherosh", "ঢেঁড়স", "🟢", "sobji", KG, 38, 0],
  ["rui-mach", "রুই মাছ", "🐟", "mach", KG, 46, 4.5],
  ["telapia", "তেলাপিয়া", "🐟", "mach", KG, 36, 0],
  ["ilish-mach", "ইলিশ মাছ", "🐠", "mach", KG, 1850, 3.4],
  ["katla-mach", "কাতলা মাছ", "🐠", "mach", KG, 43, -4.4],
  ["chingri-mach", "চিংড়ি মাছ (খোলা)", "🦐", "mach", KG, 330, 3.1],
  ["murgir-mangsho", "মুরগির মাংস", "🍗", "mangsho", KG, 225, -1.3],
  ["goru-mangsho", "গরুর মাংস", "🥩", "mangsho", KG, 790, -1.2],
  ["khashir-mangsho", "খাসির মাংস", "🍖", "mangsho", KG, 1290, -3.0],
  ["hanser-mangsho", "হাঁসের মাংস", "🦆", "mangsho", KG, 285, -3.4],
  ["dim", "ডিম", "🥚", "dim-dudh", DZ, 158, 3.9],
  ["dudh", "দুধ", "🥛", "dim-dudh", L, 102, 2.0],
  ["doi", "দই", "🥣", "dim-dudh", L, 92, 0],
  ["makhon", "মাখন (১০০ গ্রাম)", "🧈", "dim-dudh", PC, 145, 3.6],
  ["ada", "আদা", "🫚", "moshla", KG, 85, 9.0],
  ["roshun", "রসুন", "🧄", "moshla", KG, 125, -7.4],
  ["morich-gura", "মরিচ গুঁড়া", "🌶️", "moshla", KG, 245, -2.0],
  ["dhonepata-gura", "ধনেপাতা গুঁড়া", "🍃", "moshla", KG, 265, 0],
];

const MARKETS = [
  ["মাঠ বাজার", "ময়মনসিংহ"], ["সদর বাজার", "রাজশাহী"],
  ["বাজারহাট", "খুলনা"], ["বাসারহাট বাজার", "রাজশাহী"],
  ["চৌর বাজার", "ময়মনসিংহ"], ["আমতলী বাজার", "চট্টগ্রাম"],
  ["ডবলগেট বাজার", "খুলনা"], ["চৌরাস্তা বাজার", "সিলেট"],
  ["গ্রীন মার্কেট, মিরপুর", "ঢাকা"], ["চৌদ্দগ্রাম বাজার", "চট্টগ্রাম"],
  ["আমবাজার", "সিলেট"], ["কারওয়ান বাজার", "ঢাকা"],
];

const out = P.map(([slug, name, emoji, category, unit, price, change]) => {
  const prev = price / (1 + change / 100);
  const diff = Math.round(Math.abs(price - prev));
  const word = change > 0 ? "বেড়েছে" : "কমেছে";
  const summary =
    change === 0
      ? "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
      : `গতকালের তুলনায় আজ দাম ${word} · ${bn(diff)} টাকা`;

  const markets = MARKETS.map(([mname, division], i) => {
    const t = i / (MARKETS.length - 1);
    const min = Math.round(price * (0.894 + 0.091 * t));
    const max = Math.round(price * (0.985 + 0.121 * t));
    return { name: mname, division, min, max, avg: (min + max) / 2 };
  });

  return {
    slug, name, emoji, category,
    categoryName: CATS[category],
    unit, price, change, diff, summary, markets,
  };
});

mkdirSync("data", { recursive: true });
writeFileSync("data/products.json", JSON.stringify(out, null, 2), "utf8");
console.log("Done:", out.length, "products");