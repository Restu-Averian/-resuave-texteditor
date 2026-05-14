# @resuave/texteditor

A rich text editor built on [TipTap](https://tiptap.dev/) v3 with Radix UI primitives, [Tailwind CSS](https://tailwindcss.com/) v4, and full mobile support.

## Features

- **Text formatting** — Bold, Italic, Underline, Strikethrough, Font Size (+/-)
- **Headings & blocks** — H1–H6, Blockquote, Horizontal Rule
- **Lists** — Bullet List, Ordered List, nested Task List
- **Text alignment** — Left, Center, Right, Justify
- **Links** — Set/Remove with URL validation
- **History** — Undo / Redo
- **Source mode** — Edit raw HTML via CodeMirror with Prettier formatting. Download HTML.
- **Mobile** — Fullscreen dialog on small screens, read-only preview, bottom toolbar with keyboard-aware positioning
- **Localization** — Built-in English & Indonesian, supports custom translations
- **Read-only mode** — Disable editing with optional visible toolbar
- **Toolbar customization** — Hide groups or individual buttons via config

## Installation

```sh
npm install @resuave/texteditor
```

The editor requires Tailwind CSS v4 in your project.

## Quick Start

```jsx
import { useState } from "react";
import Texteditor from "@resuave/texteditor";

function App() {
  const [html, setHtml] = useState("<p>Hello World!</p>");

  return <Texteditor value={html} onChange={(value) => setHtml(value)} />;
}
```

## Props

| Prop                  | Type                                         | Default    | Description                              |
| --------------------- | -------------------------------------------- | ---------- | ---------------------------------------- |
| `value`               | `string`                                     | required   | Initial HTML content                     |
| `onChange`            | `(html: string \| undefined, event) => void` | required   | Called on every editor update            |
| `locale`              | `"en" \| "id"`                               | `"en"`     | UI language                              |
| `customTranslate`     | `object`                                     | `{}`       | Override translation keys per locale     |
| `placeholder`         | `string`                                     | —          | Placeholder text when editor is empty    |
| `readOnly`            | `boolean`                                    | `false`    | Disable editing                          |
| `readOnlyToolbarMode` | `"hidden" \| "disabled"`                     | `"hidden"` | Toolbar behavior in read-only mode       |
| `toolbarConfig`       | `{ hiddenGroups?, hiddenItems? }`            | `{}`       | Hide toolbar groups or items             |
| `className`           | `string`                                     | —          | Class for root wrapper                   |
| `editorClassName`     | `string`                                     | —          | Class for the ProseMirror editor element |
| `contentClassName`    | `string`                                     | —          | Class for the content area               |

## Examples

### With locale & custom translations

```jsx
<Texteditor
  value="<p>Halo</p>"
  onChange={(v) => console.log(v)}
  locale="id"
  customTranslate={{
    id: { BOLD: "Ditebalkan lagi" },
    en: { BOLD: "too bold" },
  }}
/>
```

### Read-only

```jsx
<Texteditor
  value="<p>Read-only content</p>"
  readOnly
  readOnlyToolbarMode="disabled"
/>
```

### Toolbar customization

```jsx
<Texteditor
  value="<p>Custom toolbar</p>"
  onChange={(v) => console.log(v)}
  toolbarConfig={{
    hiddenGroups: ["linkMedia", "actions"],
    hiddenItems: ["strike", "underline", "align"],
  }}
/>
```

## Toolbar

The toolbar is organized into 5 groups. Each group and individual item can be hidden via `toolbarConfig`.

| Group          | Items                                                               |
| -------------- | ------------------------------------------------------------------- |
| `textStyle`    | bold, italic, underline, strike, increaseFontSize, decreaseFontSize |
| `headingBlock` | blockquote, heading, heading1–6, horizontalRule                     |
| `lists`        | bulletList, orderedList, taskList, align, alignLeft–alignJustify    |
| `linkMedia`    | link, removeLink                                                    |
| `actions`      | undo, redo, source                                                  |

## Localization

Supports `"en"` (English) and `"id"` (Indonesian) with 28 translation keys. Custom overrides are resolved before built-in translations, with an optional fallback value.

## Development

```sh
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Run ESLint
```

## Dependencies

- **TipTap** v3.22 — Editor framework
- **Radix UI** — Headless UI primitives
- **Tailwind CSS** v4 — Styling
- **Lucide** — Icons
- **CodeMirror** — Source editor
- **Prettier** — HTML formatting
