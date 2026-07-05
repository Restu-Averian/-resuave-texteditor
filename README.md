# ResuAve TextEditor

A reusable rich text editor component built with Tiptap for React applications.

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
