import { Greeter } from "@/components/greeter";
import { DefaultLocale } from "@/helpers/get-tenant-locale";
import { getI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export default async function IndexPage() {
  setStaticParamsLocale(DefaultLocale);
  const t = await getI18n();

  return (
    <div className="border border-green-700">
      <p>{t("helloFromAServerComponent")}</p>
      <Greeter />
      <div className="text-green-700 text-xs">
        {t("page", { type: "static", path: "app/page.tsx" })}
      </div>
    </div>
  );
}
