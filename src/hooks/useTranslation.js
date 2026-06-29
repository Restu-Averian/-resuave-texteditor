import { useEditorPropsCtx } from "@/context/EditorPropsCtx";
import { EDITOR_LOCALES } from "@/lib/locales";

const useTranslation = () => {
  const { locale, customTranslate } = useEditorPropsCtx();

  const t = (key = "", defaultVal = "") => {
    const currLang = EDITOR_LOCALES?.[locale]?.[key?.toUpperCase()];
    const cstTranslate = customTranslate?.[locale]?.[key?.toUpperCase()];

    return cstTranslate || currLang || defaultVal;
  };

  return t;
};

export default useTranslation;
