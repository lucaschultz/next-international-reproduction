export type Locale = "en" | "fr";

export const DefaultLocale: Locale = "en";

export async function getTenantLocale(): Promise<Locale> {
  return DefaultLocale;
}
