export function formatAmount({ amount, decimals }: { amount: string | number; decimals: number }) {
  const formatted = parseFloat(amount.toString()).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return formatted.includes('.') ? formatted.replace(/\.?0+$/, '') : formatted
}
