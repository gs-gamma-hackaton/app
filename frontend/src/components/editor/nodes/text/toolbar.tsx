import { LayoutNodeToolbarComponent } from "@/lib/editor/types";
import { Bold, Italic, Quote, Strikethrough, Underline } from "lucide-react";
import { TextAttributes } from ".";
import { StyleSelect, StyleToggle } from "../../ui/input";
import { fontColorRegistry, fontSizeRegistry } from "./util";

const TextNodeToolbar: LayoutNodeToolbarComponent<TextAttributes> = ({
  node,
}) => {
  return (
    <>
      <StyleSelect
        node={node}
        field="fontSize"
        registry={fontSizeRegistry}
        defaultValue="text"
      />
      <StyleToggle node={node} field="bold" icon={Bold} />
      <StyleToggle node={node} field="italic" icon={Italic} />
      <StyleToggle node={node} field="underline" icon={Underline} />
      <StyleToggle node={node} field="strike" icon={Strikethrough} />
      <StyleToggle node={node} field="quote" icon={Quote} />
      <StyleSelect
        node={node}
        field="color"
        registry={fontColorRegistry}
        defaultValue="auto"
      />
    </>
  );
};

export default TextNodeToolbar;
