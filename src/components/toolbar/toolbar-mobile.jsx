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
  const { checkDisableToolbarItem, checkShowToolbarGroup } = useToolbarConfig();

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
      className="w-full flex flex-col-reverse gap-3 relative"
      {...(showToolbarMobile === false && {
        value: "",
      })}
      onValueChange={(val) => {
        if (!val) {
          setShowToolbarMobile(false);
          return;
        }
        setShowToolbarMobile(true);
        if (checkDisableToolbarItem) return;
        setTimeout(() => {
          editor?.chain().focus().run();
        }, 0);
      }}
    >
      <TabsList className="w-full h-[52px] rounded-2xl bg-zinc-100 p-1.5 shadow-sm">
        {tabList?.map((tab) => {
          return (
            <TabsTrigger
              value={tab?.value}
              key={tab?.value}
              className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm h-full"
            >
              {tab?.icon}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabList?.map((tab) => {
        return (
          <TabsContent
            value={tab?.value}
            key={tab?.value}
            className="bg-white p-4 rounded-[32px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)] border border-slate-50 mt-0 data-[state=inactive]:hidden"
          >
            <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-5" />
            {tab?.content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

const ToolbarMobile = memo(ToolbarMobile_);
export default ToolbarMobile;
