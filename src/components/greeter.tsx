"use client";

import { useI18n } from "@/locales/client";

export function Greeter() {
  const t = useI18n();

  return (
    <div className="p-1">
      <div className="border border-pink-700">
        <p>{t("helloFromAClientComponent")}</p>
        <span className="text-pink-700 text-xs">
          {t("component", { type: "client", path: "components/greeter.tsx" })}
        </span>
      </div>
    </div>
  );
}
