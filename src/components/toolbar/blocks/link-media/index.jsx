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

const ToolbarLinkMedia_ = () => {
  const t = useTranslation();

  const { editor, isSourceMode } = useCurrentEditor();

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

  if (editorState?.isLink) {
    return (
      <ToolbarItem
        icon={<Link2Off />}
        label={t("REMOVE_LINK", "Remove_Link")}
        onClick={() =>
          editor.chain().focus().extendMarkRange("link").unsetLink().run()
        }
        disabled={isSourceMode}
      />
    );
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
        <Tooltip content={t("SET_LINK", "Set Link")}>
          <PopoverTrigger asChild>
            <Button variant="ghost" disabled={isSourceMode}>
              <Link2 />
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
                    disabled={isSourceMode}
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
                      disabled={isSourceMode}
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
            disabled={isSourceMode}
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
