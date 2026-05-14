import { memo } from "react";
import ToolbarTextStyle from "./blocks/text-style";
import ToolbarLists from "./blocks/lists";
import ToolbarLinkMedia from "./blocks/link-media";
import ToolbarActions from "./blocks/actions";
import ToolbarHeadingBlock from "./blocks/heading-block";
import useToolbarConfig from "@/hooks/useToolbarConfig";

const Toolbar_ = () => {
  const { checkShowToolbarGroup } = useToolbarConfig();

  return (
    <div className="toolbar">
      <div className="toolbar-item">
        {checkShowToolbarGroup("textStyle") && <ToolbarTextStyle />}

        {checkShowToolbarGroup("headingBlock") && <ToolbarHeadingBlock />}

        {checkShowToolbarGroup("lists") && <ToolbarLists />}
      </div>

      <div className="toolbar-item">
        {checkShowToolbarGroup("linkMedia") && <ToolbarLinkMedia />}

        {checkShowToolbarGroup("actions") && <ToolbarActions />}
      </div>
    </div>
  );
};

const Toolbar = memo(Toolbar_);
export default Toolbar;
