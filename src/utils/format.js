export const toCurrency = (num, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(num || 0);

export const toShortNumber = (num) => {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num;
};
