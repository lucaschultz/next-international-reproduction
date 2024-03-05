import { getTenantLocale } from "@/helpers/get-tenant-locale";
import { I18nProviderClient } from "@/locales/client";
import { getI18n } from "@/locales/server";
import type { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "next-international Reproduction",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  setStaticParamsLocale("en");
  const t = await getI18n();
  const locale = await getTenantLocale();

  return (
    <html lang="en">
      <body className="p-1">
        <div className="border border-red-700">
          <h1>{t("rootLayout")}</h1>
          <div className="p-1">
            <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
          </div>
          <div className="text-red-700 text-xs">
            server component
            <span className="opacity-40"> (app/[locale]/layout.tsx)</span>
          </div>
        </div>
      </body>
    </html>
  );
}
