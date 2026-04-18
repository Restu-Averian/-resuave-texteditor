import { memo } from "react";
import ToolbarTextStyle from "./ToolbarTextStyle";
import ToolbarHeadingBlock from "./ToolbarHeadingBlock";
import ToolbarLists from "./ToolbarLists";
import ToolbarLinkMedia from "./ToolbarLinkMedia";
import ToolbarActions from "./ToolbarActions";

const Toolbar_ = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-item">
        <ToolbarTextStyle />

        <ToolbarHeadingBlock />

        <ToolbarLists />
      </div>

      <div className="toolbar-item">
        <ToolbarLinkMedia />

        <ToolbarActions />
      </div>
    </div>
  );
};

const Toolbar = memo(Toolbar_);
export default Toolbar;
