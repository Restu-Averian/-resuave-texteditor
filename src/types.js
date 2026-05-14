/**
 * @typedef {"en" | "id" } TLang
 */

/**
 * @typedef {"textStyle" | "headingBlock" | "lists" | "linkMedia" | "actions"} TToolbarGroup
 */

/**
 * @typedef { "bold"
 * | "italic" | "underline" | "strike"
 * | "increaseFontSize" | "decreaseFontSize" | "blockquote" | "heading"
 * | "heading1" | "heading2" | "heading3" | "heading4"
 * | "heading5" | "heading6" | "horizontalRule" | "bulletList"
 * | "orderedList" | "taskList" | "align" | "alignLeft"
 * | "alignCenter" | "alignRight" | "alignJustify" | "link"
 * | "removeLink" | "undo" | "redo" | "source"
 * } TToolbarItem
 */

/**
 * @typedef TEditorPropsCtx
 * @property {TLang} locale
 * @property {Record<TLang, Record<keyof typeof import('@/lib/locales')['EDITOR_LOCALES']['en'], string>>} [customTranslate={}]
 * @property {string} value
 * @property {(value: string | undefined, event: import('@tiptap/react').EditorEvents['update']) => void} onChange
 * @property {string} [placeholder]
 * @property {boolean} [readOnly]
 * @property {"disabled" | "hidden"} [readOnlyToolbarMode]
 * @property {{ hiddenGroups?: TToolbarGroup[], hiddenItems?: TToolbarItem[] }} [toolbarConfig]
 * @property {string} [className]
 * @property {string} [editorClassName]
 * @property {string} [contentClassName]
 */

export {};
