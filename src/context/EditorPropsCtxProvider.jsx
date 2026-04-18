import EditorPropsCtx from "./EditorPropsCtx";

/**
 *
 * @param {import("./EditorPropsCtx").TEditorPropsCtx} props
 * @returns {import("react").ReactNode}
 */
const EditorPropsCtxProvider = ({ children, ...props }) => {
  return (
    <EditorPropsCtx.Provider value={props}>{children}</EditorPropsCtx.Provider>
  );
};

export default EditorPropsCtxProvider;
