export function toBanglaNumber(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
}

export function formatPrice(price: number): string {
  return toBanglaNumber(price.toLocaleString('en-US'));
}

export function formatPercent(percent: number): string {
  const absVal = Math.abs(percent);
  const formatted = toBanglaNumber(absVal.toFixed(1));
  if (percent > 0) return `▲${formatted}%`;
  if (percent < 0) return `▼${formatted}%`;
  return `—${formatted}%`;
}

export function getChangeKind(change: number): string {
  if (change > 0) return "increase";
  if (change < 0) return "decrease";
  return "neutral";
}

export function getBanglaDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("bn-BD", options);
  const parts = formatter.formatToParts(now);
  
  let weekday = "";
  let day = "";
  let month = "";
  let year = "";

  for (const part of parts) {
    if (part.type === "weekday") weekday = part.value;
    if (part.type === "day") day = part.value;
    if (part.type === "month") month = part.value;
    if (part.type === "year") year = part.value;
  }

  return `${weekday}, ${toBanglaNumber(day)} ${month}, ${toBanglaNumber(year)}`;
}