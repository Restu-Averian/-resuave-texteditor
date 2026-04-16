import { useCurrentEditor } from "@tiptap/react";
import { Bold } from "lucide-react";
import { memo } from "react";
// import { Button } from "./components/ui/button";

const Toolbar_ = () => {
  const { editor } = useCurrentEditor();
  return (
    <div>
      <button className="text-2xl text-green-300">WOULA CIKK</button>
      {/* <Button
        variant="outline"
        onClick={() => {
          editor?.chain()?.focus()?.toggleBold().run();
        }}
      >
        
        <Bold />
      </Button> */}
    </div>
  );
};

const Toolbar = memo(Toolbar_);
export default Toolbar;
