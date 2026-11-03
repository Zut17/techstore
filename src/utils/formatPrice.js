export function formatPrice(amount) {
  const formattedAmount = amount
    .toLocaleString("fr-FR")
    .replace(/\u00a0/g, " ");

  return `${formattedAmount} FCFA`;
}
