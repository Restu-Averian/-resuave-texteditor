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

const ToolbarMobile_ = ({ showToolbarMobile, setShowToolbarMobile }) => {
  const { editor } = useCurrentEditor();

  const tabList = useMemo(() => {
    return [
      {
        value: "text-style",
        icon: <CaseSensitive />,
        content: <ToolbarTextStyle />,
      },
      {
        value: "list",
        icon: <LayoutList />,
        content: <ToolbarLists />,
      },
      {
        value: "link",
        icon: <Link />,
        content: <ToolbarLinkMedia />,
      },
      {
        value: "heading-block",
        icon: <Heading />,
        content: <ToolbarHeadingBlock />,
      },
      {
        value: "actions",
        icon: <Settings />,
        content: <ToolbarActions />,
      },
    ];
  }, []);

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
