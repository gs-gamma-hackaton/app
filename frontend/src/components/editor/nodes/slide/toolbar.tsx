import { LayoutNodeToolbarComponent } from "@/lib/editor/types";
import { SlideAttributes } from ".";
import { StyleSelect } from "../../ui/input";
import { slideLayoutRegistry } from "./util";

const SlideNodeToolbar: LayoutNodeToolbarComponent<SlideAttributes> = ({
  node,
}) => {
  return (
    <>
      <StyleSelect
        node={node}
        field="layout"
        defaultValue="default"
        registry={slideLayoutRegistry}
      />
    </>
  );
};

export default SlideNodeToolbar;
