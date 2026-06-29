import { createContext, useContext } from "react";

/** @type {import("react").Context<import("@/types").TEditorPropsCtx>} */
const EditorPropsCtx = createContext({});

export const useEditorPropsCtx = () => useContext(EditorPropsCtx);

export default EditorPropsCtx;
