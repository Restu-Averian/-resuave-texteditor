export const CORE_PROPS = [
  {
    prop: "content",
    type: "string",
    default: "--",
    description: "Initial HTML content",
  },
  {
    prop: "onChange",
    type: "(value: string) => void",
    default: "--",
    description: "Fires when content changes",
  },
  {
    prop: "placeholder",
    type: "string",
    default: '"Start writing..."',
    description: "Placeholder text",
  },
  {
    prop: "readOnly",
    type: "boolean",
    default: "false",
    description: "Makes editor non-editable",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the editor",
  },
];

export const OPTIONAL_PROPS = [
  {
    prop: "mobileMode",
    type: "boolean",
    default: "false",
    description: "Opens mobile editing mode on small screens",
  },
  {
    prop: "className",
    type: "string",
    default: "--",
    description: "Custom class for the root element",
  },
  {
    prop: "toolbar",
    type: "boolean",
    default: "true",
    description: "Show or hide the toolbar",
  },
  {
    prop: "autoFocus",
    type: "boolean",
    default: "false",
    description: "Focus the editor on mount",
  },
];
