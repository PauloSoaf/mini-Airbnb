export function formatCurrencyBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(value);
}

export function formatLocation(parts: Array<string | number | undefined | null>) {
  return parts.filter(Boolean).join(", ");
}
