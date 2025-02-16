import { createWithoutAi } from "@/api/presentation";
import { registry as tplRegistry } from "./editor/templates";
import { predefinedThemes } from "./editor/theme";
import { Presentation } from "./editor/types";

export async function createNewPresentation() {
  const data = tplRegistry[0].root;
  const presentation: Presentation = {
    name: "New Presentation",
    theme: predefinedThemes[0].theme,
    content: [data],
  };

  const result = await createWithoutAi(presentation);
  return result;
}
