import { Button } from "@/components/ui/button";
import { LayoutNodeToolbarComponent } from "@/lib/editor/types";
import { Image } from "lucide-react";
import { ImageAttributes } from ".";
import { StyleDivider, StyleSelect } from "../../ui/input";
import { imageSizeRegistry } from "./util";

const ImageNodeToolbar: LayoutNodeToolbarComponent<ImageAttributes> = ({
  node,
}) => {
  return (
    <>
      <Button variant="outline">
        <Image />
        Выбрать файл
      </Button>
      <StyleDivider />
      <StyleSelect
        node={node}
        field="size"
        registry={imageSizeRegistry}
        defaultValue="fill"
      />
    </>
  );
};

export default ImageNodeToolbar;
