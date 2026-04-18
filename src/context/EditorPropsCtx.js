import { createContext, useContext } from "react";

/**
 * @typedef {"en" | "id" } TLang
 */

/**
 * @typedef TEditorPropsCtx
 * @property {TLang} locale
 * @property {Record<TLang, Record<string, string>>} customTranslate
 */

/** @type {import("react").Context<TEditorPropsCtx>} */
const EditorPropsCtx = createContext({});
export const useEditorPropsCtx = () => useContext(EditorPropsCtx);

export default EditorPropsCtx;
