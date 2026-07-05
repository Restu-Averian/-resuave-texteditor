<div align="center">
  <img src="https://resuave-texteditor.pages.dev/icon.webp" alt="ResuAve TextEditor" width="120" />
  <h1>ResuAve TextEditor</h1>
  <p><em>A reusable, modern rich text editor component built with Tiptap for React applications.</em></p>

[![NPM Version](https://img.shields.io/npm/v/@resuave/texteditor?style=flat-square)](https://www.npmjs.com/package/@resuave/texteditor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**[View Live Demo & Documentation](https://resuave-texteditor.pages.dev/)**
</div>

---

## 🚀 Features

- **Rich Text Formatting:** Bold, Italic, Underline, Strike, Font size control, Text alignment.
- **Structured Content:** Lists (Bullet & Numbered), Checklists.
- **Advanced Editing:** Hyperlinks, Undo/Redo history, Code view.
- **Mobile-friendly:** Responsive editor UI out of the box.
- **Customizable:** Fully styled via CSS, easy to override.

## 📦 Installation

Choose your preferred package manager:

```bash
# npm
npm install @resuave/texteditor

# pnpm
pnpm add @resuave/texteditor

# yarn
yarn add @resuave/texteditor
```

## 💻 Usage

Import the component and its stylesheet, then use it in your React application:

```jsx
import { useState } from "react";
import { ResuAveTextEditor } from "@resuave/texteditor";
import "@resuave/texteditor/style.css";

export default function App() {
  const [content, setContent] = useState(
    "<p>Hello, <strong>Resuave</strong>!</p>",
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>My Editor</h2>
      <ResuAveTextEditor
        content={content}
        onChange={(html) => setContent(html)}
      />
    </div>
  );
}
```

## 🛠️ Props

| Prop          | Type                     | Description                                  |
| ------------- | ------------------------ | -------------------------------------------- |
| `content`     | `string`                 | The initial HTML content of the editor.      |
| `onChange`    | `(html: string) => void` | Callback triggered when the content changes. |
| `placeholder` | `string`                 | Optional placeholder text.                   |

_(For full props documentation, see the [Live Demo](https://resuave-texteditor.pages.dev/))._

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
