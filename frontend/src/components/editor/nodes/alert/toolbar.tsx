import { LayoutNodeToolbarComponent } from "@/lib/editor/types";
import { AlertAttributes } from ".";
import { StyleSelect } from "../../ui/input";
import { alertColorRegistry } from "./util";

const AlertNodeToolbar: LayoutNodeToolbarComponent<AlertAttributes> = ({
  node,
}) => {
  return (
    <>
      <StyleSelect
        registry={alertColorRegistry}
        field="type"
        node={node}
        defaultValue={node.attributes.type}
      />
    </>
  );
};

export default AlertNodeToolbar;
