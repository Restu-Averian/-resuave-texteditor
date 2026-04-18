import { memo } from "react";
import ToolbarTextStyle from "./blocks/text-style";
import ToolbarLists from "./blocks/lists";
import ToolbarLinkMedia from "./blocks/link-media";
import ToolbarActions from "./blocks/actions";
import ToolbarHeadingBlock from "./blocks/heading-block";

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
