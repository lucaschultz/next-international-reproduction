import { getTenantLocale } from "@/helpers/get-tenant-locale";
import { I18nProviderClient } from "@/locales/client";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "next-international Reproduction",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getTenantLocale();

  return (
    <html lang="en">
      <body className="p-1">
        <div className="border border-red-700">
          <div className="p-1">
            <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
          </div>
          <div className="text-red-700 text-xs">
            root layout (app/layout.tsx)
          </div>
        </div>
      </body>
    </html>
  );
}
