import AlertNode from "@/components/editor/nodes/alert";
import AlertNodeToolbar from "@/components/editor/nodes/alert/toolbar";
import CardNode from "@/components/editor/nodes/card";
import CardNodeToolbar from "@/components/editor/nodes/card/toolbar";
import FlexNode from "@/components/editor/nodes/flex";
import FlexNodeToolbar from "@/components/editor/nodes/flex/toolbar";
import FragmentComponent from "@/components/editor/nodes/fragment";
import GridNode from "@/components/editor/nodes/grid";
import GridNodeToolbar from "@/components/editor/nodes/grid/toolbar";
import ImageNode from "@/components/editor/nodes/image";
import ImageNodeToolbar from "@/components/editor/nodes/image/toolbar";
import NodeSelectNode from "@/components/editor/nodes/node-select";
import NodeSelectNodeToolbar from "@/components/editor/nodes/node-select/toolbar";
import SlideComponent from "@/components/editor/nodes/slide";
import SlideNodeToolbar from "@/components/editor/nodes/slide/toolbar";
import TextNode from "@/components/editor/nodes/text";
import TextNodeToolbar from "@/components/editor/nodes/text/toolbar";
import {
  ALargeSmall,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleX,
  Grid,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Info,
  List,
  RectangleHorizontal,
  RectangleVertical,
  Square,
} from "lucide-react";
import {
  createAlertWithText,
  createCardWithNodeSelect,
  createFlexWithNodeSelect,
  createGridWithNodeSelect,
  createImageNode,
  createTextNode,
} from "./helpers";
import { MenuRegistry, Registry } from "./types";

const registry: Registry = {
  alert: {
    node: AlertNode,
    toolbar: AlertNodeToolbar,
  },
  card: {
    node: CardNode,
    toolbar: CardNodeToolbar,
  },
  flex: {
    node: FlexNode,
    toolbar: FlexNodeToolbar,
  },
  grid: {
    node: GridNode,
    toolbar: GridNodeToolbar,
  },
  image: {
    node: ImageNode,
    toolbar: ImageNodeToolbar,
  },
  fragment: FragmentComponent,
  slide: {
    node: SlideComponent,
    toolbar: SlideNodeToolbar,
  },
  text: {
    node: TextNode,
    toolbar: TextNodeToolbar,
  },
  select: {
    node: NodeSelectNode,
    toolbar: NodeSelectNodeToolbar,
  },
};

const menuRegistry: MenuRegistry = [
  {
    title: "Текст",
    category: "basic",
    description: "Простой текст",
    icon: ALargeSmall,
    generator: () => createTextNode(""),
  },
  {
    title: "Заголовок 1",
    category: "basic",
    description: "Большой заголовок",
    icon: Heading1,
    generator: () => createTextNode("", { fontSize: "h1" }),
  },
  {
    title: "Заголовок 2",
    category: "basic",
    description: "Средний заголовок",
    icon: Heading2,
    generator: () => createTextNode("", { fontSize: "h2" }),
  },
  {
    title: "Заголовок 3",
    category: "basic",
    description: "Маленький заголовок",
    icon: Heading3,
    generator: () => createTextNode("", { fontSize: "h3" }),
  },
  {
    title: "Изображение",
    category: "basic",
    description: "Загрузите изображение с устройства",
    icon: Image,
    generator: () => createImageNode("/placeholder.svg"),
  },
  {
    title: "Инфо",
    category: "notes",
    description: "Примечание с информацией",
    icon: Info,
    generator: () => createAlertWithText("info"),
  },
  {
    title: "Предупреждение",
    category: "notes",
    description: "Примечание с предупреждением",
    icon: CircleAlert,
    generator: () => createAlertWithText("warning"),
  },
  {
    title: "Ошибка",
    category: "notes",
    description: "Примечание с ошибкой",
    icon: CircleX,
    generator: () => createAlertWithText("error"),
  },
  {
    title: "Вопрос",
    category: "notes",
    description: "Примечание с вопросом",
    icon: CircleHelp,
    generator: () => createAlertWithText("question"),
  },
  {
    title: "Успех",
    category: "notes",
    description: "Примечание с успехом",
    icon: CircleCheck,
    generator: () => createAlertWithText("success"),
  },
  {
    title: "Карточка",
    category: "cards",
    description: "Простая карточка с фоном",
    icon: Square,
    generator: () => createCardWithNodeSelect("simple"),
  },
  {
    title: "Пули",
    category: "cards",
    description: "Нумерованный/маркированный список",
    icon: List,
    generator: () => createCardWithNodeSelect("bullet"),
  },
  {
    title: "Горизонтальный",
    category: "containers",
    description: "Размещает элементы в строку",
    icon: RectangleHorizontal,
    generator: () => createFlexWithNodeSelect("row"),
  },
  {
    title: "Вертикальный",
    category: "containers",
    description: "Размещает элементы в столбец",
    icon: RectangleVertical,
    generator: () => createFlexWithNodeSelect("column"),
  },
  {
    title: "Сетка",
    category: "containers",
    description: "Размещает элементы в виде таблицы",
    icon: Grid,
    generator: () => createGridWithNodeSelect(),
  },
];

const menuRegistryCategories: Record<string, string> = {
  basic: "Базовые блоки",
  containers: "Контейнеры",
  notes: "Заметки",
  cards: "Карточки",
  search: "Результаты поиска",
};

const containerNodes = ["alert", "fragment", "slide", "flex", "grid", "card"];
const fwNodes = ["card"];

export {
  containerNodes,
  fwNodes,
  menuRegistry,
  menuRegistryCategories,
  registry,
};
