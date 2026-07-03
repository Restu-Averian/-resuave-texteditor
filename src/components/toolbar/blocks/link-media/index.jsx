import { memo, useMemo, useState } from "react";
import { Link2, Link2Off } from "lucide-react";
import { normalizeUrl, validateUrl } from "@/helpers";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import Tooltip from "@/components/ui/shared/tooltip";
import useTranslation from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import ToolbarItem from "../../components/toolbar-item";
import ResponsiveWrapperToolbarItem from "../../components/responsive-wrapper-toolbar-item";
import useToolbarConfig from "@/hooks/useToolbarConfig";
import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";

const ToolbarLinkMedia_ = () => {
  const t = useTranslation();
  const { xs } = useBreakpoint();

  const { editor, isSourceMode } = useCurrentEditor();
  const { checkDisableToolbarItem, checkShowToolbarItem } = useToolbarConfig();
  const isDisabled = useMemo(
    () => isSourceMode || checkDisableToolbarItem,
    [isSourceMode, checkDisableToolbarItem],
  );

  const editorState = useEditorState({
    editor,
    selector(ctx) {
      return {
        isLink: ctx?.editor?.isActive("link") ?? false,
      };
    },
  });

  const [link, setLink] = useState({
    value: "",
    error: "",
  });

  const [textToShow, setTextToShow] = useState("");

  const isEmptySelection = useMemo(
    () => editor?.state?.selection?.empty,
    [editor?.state?.selection?.empty],
  );

  const onApplyLink = () => {
    const validationError = validateUrl(link?.value);

    if (validationError) {
      setLink((prev) => ({ ...prev, error: validationError }));

      return;
    }

    const href = normalizeUrl(link?.value);

    if (isEmptySelection) {
      editor
        ?.chain()
        ?.focus()
        ?.insertContent(`<a href="${href}">${textToShow}</a>`)
        ?.run();
    } else {
      editor
        ?.chain()
        ?.focus()
        ?.extendMarkRange("link")
        ?.setLink({
          href,
        })
        .run();
    }

    setLink((prev) => ({ ...prev, value: "", error: "" }));
    setTextToShow("");
  };

  if (editorState?.isLink && checkShowToolbarItem("removeLink")) {
    return (
      <ToolbarItem
        icon={<Link2Off />}
        label={t("REMOVE_LINK", "Remove_Link")}
        onClick={() =>
          editor.chain().focus().extendMarkRange("link").unsetLink().run()
        }
        disabled={isDisabled}
      />
    );
  }
  if (!checkShowToolbarItem("link")) {
    return null;
  }

  return (
    <ResponsiveWrapperToolbarItem className="flex justify-center items-center">
      <Popover
        onOpenChange={(open) => {
          if (!open) {
            editor?.chain()?.focus()?.run();
          }
        }}
      >
        <Tooltip content={t("SET_LINK", "Set Link")} {...(xs && { open: false })}>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                xs && "w-[72px] min-h-[72px] h-auto py-2 flex-col gap-1 rounded-2xl font-normal text-[11px] leading-[1.1] whitespace-normal text-center px-1.5",
                !xs && "size-9"
              )}
              variant={xs ? "secondary" : "ghost"}
              disabled={isDisabled}
            >
              <div className={cn(xs && "mb-0.5")}><Link2 /></div>
              {xs && <span className="line-clamp-2 opacity-90">{t("SET_LINK", "Set Link")}</span>}
            </Button>
          </PopoverTrigger>
        </Tooltip>

        <PopoverContent className="space-y-4">
          <div className="space-y-2">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="link">{t("LINK", "Link")}</FieldLabel>
                  <Input
                    disabled={isDisabled}
                    id="link"
                    autoComplete="off"
                    placeholder={t("LINK_PLACEHOLDER", "example.com")}
                    value={link?.value}
                    onChange={(e) => {
                      setLink((prev) => ({
                        ...prev,
                        value: e.target.value,
                        ...(link?.error && {
                          error: "",
                        }),
                      }));
                    }}
                  />
                  <FieldDescription>
                    {t("LINK_WILL_BE_USED", "Link that will be used")} :{" "}
                    {normalizeUrl(link?.value)}
                  </FieldDescription>

                  <FieldError>{link?.error}</FieldError>
                </Field>

                {isEmptySelection && (
                  <Field>
                    <FieldLabel htmlFor="text-to-show">
                      {t("TEXT_TO_SHOW", "Text to Show")}
                    </FieldLabel>
                    <Input
                      disabled={isDisabled}
                      id="text-to-show"
                      autoComplete="off"
                      value={textToShow}
                      onChange={(e) => {
                        setTextToShow(e.target.value);
                      }}
                    />
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
          </div>

          <Button
            onClick={onApplyLink}
            className="w-full"
            disabled={isDisabled}
          >
            {t("APPLY", "Apply")}
          </Button>
        </PopoverContent>
      </Popover>
    </ResponsiveWrapperToolbarItem>
  );
};

const ToolbarLinkMedia = memo(ToolbarLinkMedia_);
export default ToolbarLinkMedia;
