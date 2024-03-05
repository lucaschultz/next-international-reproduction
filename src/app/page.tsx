"use client";

import { useI18n } from "@/locales/client";

export default function IndexPage() {
  const t = useI18n();

  return (
    <div className="border border-green-700">
      <p>{t("pageType", { type: "static" })}</p>
      <div className="text-green-700 text-xs">
        client component
        <span className="opacity-40"> (app/[locale]/page.tsx)</span>
      </div>
    </div>
  );
}
