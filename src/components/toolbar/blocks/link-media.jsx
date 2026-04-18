import { memo, useMemo, useState } from "react";
import { Link2, Link2Off } from "lucide-react";
import { normalizeUrl, validateUrl } from "@/helpers";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import Tooltip from "@/components/ui/shared/tooltip";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Input } from "../../ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../../ui/field";
import ToolbarItem from "../components/toolbar-item";

const ToolbarLinkMedia_ = () => {
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
        label="Remove Link"
        onClick={() =>
          editor.chain().focus().extendMarkRange("link").unsetLink().run()
        }
        disabled={isSourceMode}
      />
    );
  }
  return (
    <Popover
      onOpenChange={(open) => {
        if (!open) {
          editor?.chain()?.focus()?.run();
        }
      }}
    >
      <PopoverTrigger asChild>
        <Tooltip content="Set Link">
          <Button
            variant="ghost"
            disabled={isSourceMode}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            <Link2 />
          </Button>
        </Tooltip>
      </PopoverTrigger>

      <PopoverContent className="space-y-4">
        <div className="space-y-2">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="link">Link</FieldLabel>
                <Input
                  disabled={isSourceMode}
                  id="link"
                  autoComplete="off"
                  placeholder="example.com"
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
                  Link that will be used : {normalizeUrl(link?.value)}
                </FieldDescription>

                <FieldError>{link?.error}</FieldError>
              </Field>

              {isEmptySelection && (
                <Field>
                  <FieldLabel htmlFor="text-to-show">Text to Show</FieldLabel>
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
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  );
};

const ToolbarLinkMedia = memo(ToolbarLinkMedia_);
export default ToolbarLinkMedia;
