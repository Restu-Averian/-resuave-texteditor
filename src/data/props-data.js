export const CORE_PROPS = [
  {
    prop: "value",
    type: "string",
    default: "--",
    description: "Initial HTML content",
  },
  {
    prop: "onChange",
    type: "(value: string, e: any) => void",
    default: "--",
    description: "Fires when content changes",
  },
  {
    prop: "placeholder",
    type: "string",
    default: "--",
    description: "Placeholder text",
  },
  {
    prop: "readOnly",
    type: "boolean",
    default: "false",
    description: "Makes editor non-editable",
  },
];

export const OPTIONAL_PROPS = [
  {
    prop: "locale",
    type: "string",
    default: '"en"',
    description: "Language locale for editor",
  },
  {
    prop: "customTranslate",
    type: "object",
    default: "{}",
    description: "Custom translation object",
  },
  {
    prop: "onBlur",
    type: "(value: string, e: any) => void",
    default: "--",
    description: "Fires on editor blur",
  },
  {
    prop: "onFocus",
    type: "(value: string, e: any) => void",
    default: "--",
    description: "Fires on editor focus",
  },
  {
    prop: "readOnlyToolbarMode",
    type: "string",
    default: '"hidden"',
    description: "Toolbar behavior in read-only mode",
  },
  {
    prop: "toolbarConfig",
    type: "object",
    default: "{}",
    description: "Custom toolbar configuration",
  },
  {
    prop: "className",
    type: "string",
    default: "--",
    description: "Custom class for root element",
  },
  {
    prop: "editorClassName",
    type: "string",
    default: "--",
    description: "Custom class for Tiptap editor",
  },
  {
    prop: "contentClassName",
    type: "string",
    default: "--",
    description: "Custom class for content wrapper",
  },
];
