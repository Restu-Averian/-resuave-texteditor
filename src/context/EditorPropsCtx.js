import { createContext, useContext } from "react";

/**
 * @typedef {"en" | "id" } TLang
 */

/**
 * @typedef TEditorPropsCtx
 * @property {TLang} locale
 * @property {Record<TLang, Record<keyof typeof import('@/lib/locales')['EDITOR_LOCALES']['en'], string>>} [customTranslate={}]
 * @property {string} value
 * @property {(value: string | undefined, event: import('@tiptap/react').EditorEvents['update']) => void} onChange
 */

/** @type {import("react").Context<TEditorPropsCtx>} */
const EditorPropsCtx = createContext({});
export const useEditorPropsCtx = () => useContext(EditorPropsCtx);

export default EditorPropsCtx;
