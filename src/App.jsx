import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./components/toolbar";
import { useMemo } from "react";

function App() {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: `
    
    <p>Hello World!</p>

    <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
    `, // initial content
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={providerValue}>
      <Toolbar />

      <EditorContent editor={editor} />

      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </EditorContext.Provider>
  );
}

export default App;
