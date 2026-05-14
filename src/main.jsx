import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Texteditor from "./Texteditor.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Texteditor
      value="<p>Haloasdas</p>"
      onChange={(value) => {
        console.log("e", value);
      }}
      locale="id"
      customTranslate={{
        id: {
          BOLD: "Penghitaman",
        },
      }}
      toolbarConfig={{
        hiddenItems: ["heading", "horizontalRule"],
        hiddenGroups: ["actions"],
      }}
    />
  </StrictMode>,
);
