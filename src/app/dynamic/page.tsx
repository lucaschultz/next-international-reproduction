import { LOCALE_COOKIE, LOCALE_HEADER } from "@/helpers/add-locale-to-response";
import { getI18n } from "@/locales/server";
import { cookies, headers } from "next/headers";

// export const dynamic = "force-dynamic";

export default async function DynamicPage() {
  const t = await getI18n();
  const header = headers().get(LOCALE_HEADER);
  const cookie = cookies().get(LOCALE_COOKIE);

  return (
    <div className="border border-blue-700">
      <p>{t("pageType", { type: "dynamic" })}</p>
      <p>{t("value", { key: "LOCALE_HEADER", value: header ?? "null" })}</p>
      <p>
        {t("value", { key: "LOCALE_COOKIE", value: cookie?.value ?? "null" })}
      </p>
      <div className="text-blue-700 text-xs">
        client component
        <span className="opacity-40"> (app/[locale]/dynamic/page.tsx)</span>
      </div>
    </div>
  );
}
