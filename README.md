# ResuAve TextEditor

[![NPM Version](https://img.shields.io/npm/v/@resuave/texteditor)](https://www.npmjs.com/package/@resuave/texteditor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A reusable rich text editor component built with Tiptap for React applications.

**[View Live Demo & Documentation](https://resuave-texteditor.pages.dev/)**

## Installation

npm:

```bash
npm install @resuave/texteditor
```

pnpm:

```bash
pnpm add @resuave/texteditor
```

yarn:

```bash
yarn add @resuave/texteditor
```

## Peer Dependencies

```bash
npm install react react-dom @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-list @tiptap/extension-text-align @tiptap/extension-text-style
```

## Usage

```jsx
import { ResuAveTextEditor } from "@resuave/texteditor";
import "@resuave/texteditor/style.css";

export default function App() {
  return (
    <ResuAveTextEditor
      content="<p>Hello, Resuave!</p>"
      onChange={(html) => console.log(html)}
    />
  );
}
```

## Features

- Bold
- Italic
- Underline
- Strike
- Font size control
- Lists
- Checklist
- Text alignment
- Link
- Undo and redo
- Code view
- Mobile-friendly editor UI

## License

MIT
