import { memo, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CaseSensitive,
  Heading,
  LayoutList,
  Link,
  Settings,
} from "lucide-react";
import ToolbarTextStyle from "./blocks/text-style";
import ToolbarLists from "./blocks/lists";
import { useCurrentEditor } from "@tiptap/react";
import ToolbarLinkMedia from "./blocks/link-media";
import ToolbarHeadingBlock from "./blocks/heading-block";
import ToolbarActions from "./blocks/actions";
import useToolbarConfig from "@/hooks/useToolbarConfig";

const ToolbarMobile_ = ({ showToolbarMobile, setShowToolbarMobile }) => {
  const { editor } = useCurrentEditor();
  const { checkShowToolbarGroup } = useToolbarConfig();

  const tabList = useMemo(() => {
    return [
      {
        value: "text-style",
        group: "textStyle",
        icon: <CaseSensitive />,
        content: <ToolbarTextStyle />,
      },
      {
        value: "list",
        group: "lists",
        icon: <LayoutList />,
        content: <ToolbarLists />,
      },
      {
        value: "link",
        group: "linkMedia",
        icon: <Link />,
        content: <ToolbarLinkMedia />,
      },
      {
        value: "heading-block",
        group: "headingBlock",
        icon: <Heading />,
        content: <ToolbarHeadingBlock />,
      },
      {
        value: "actions",
        group: "actions",
        icon: <Settings />,
        content: <ToolbarActions />,
      },
    ]?.filter((tab) => checkShowToolbarGroup(tab?.group));
  }, [checkShowToolbarGroup]);

  return (
    <Tabs
      className="w-full"
      {...(showToolbarMobile === false && {
        value: "",
      })}
      onValueChange={() => {
        setShowToolbarMobile(true);

        setTimeout(() => {
          editor?.chain().focus().run();
        }, 0);
      }}
    >
      <TabsList className="w-full">
        {tabList?.map((tab) => {
          return (
            <TabsTrigger value={tab?.value} key={tab?.value}>
              {tab?.icon}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabList?.map((tab) => {
        return (
          <TabsContent value={tab?.value} key={tab?.value}>
            {tab?.content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

const ToolbarMobile = memo(ToolbarMobile_);
export default ToolbarMobile;
