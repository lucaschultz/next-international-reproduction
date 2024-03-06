import { Greeter } from "@/components/greeter";
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
      <p>{t("helloFromAServerComponent")}</p>
      <p>{t("value", { key: "LOCALE_HEADER", value: header ?? "null" })}</p>
      <p>
        {t("value", { key: "LOCALE_COOKIE", value: cookie?.value ?? "null" })}
      </p>
      <Greeter />
      <div className="text-blue-700 text-xs">
        {t("page", { type: "dynamic", path: "app/dynamic/page.tsx" })}
      </div>
    </div>
  );
}
