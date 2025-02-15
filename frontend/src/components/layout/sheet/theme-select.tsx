"use client";

import { useGoogleFonts } from "@/components/context/fonts";
import {
  LayoutTheme,
  LayoutThemeProvider,
  useTheme,
  useThemeContext,
} from "@/components/editor/theme/provider";
import FontDialog from "@/components/input/font-dialog";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { Hint } from "@/components/ui/hint";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getRequiredFonts,
  predefinedThemes,
  ThemePredefined,
} from "@/lib/editor/theme";
import { Palette, SquareDashedMousePointer, Type } from "lucide-react";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

export default function ThemeSelect({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  // Preload default theme fonts
  const { addFont } = useGoogleFonts();
  useEffect(() => {
    const requiredFonts = getRequiredFonts();
    requiredFonts.forEach((font) => addFont(font));
  }, []);

  const { theme, setTheme } = useThemeContext();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="bottom"
        className="min-h-[80vh] rounded-xl border-primary bg-background-overlay"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl">Редактор темы</SheetTitle>
          <SheetDescription className="hidden md:block">
            Давай настроим тему твоей презентации
          </SheetDescription>
        </SheetHeader>

        <LayoutThemeProvider theme={theme}>
          <div className="grid grid-cols-1 gap-8 py-4 md:grid-cols-[1.5fr_1fr]">
            <div className="flex flex-col gap-2">
              <Tabs defaultValue="preset" className="relative w-full">
                <TabsList>
                  <TabsTrigger value="preset">Встроенные</TabsTrigger>
                  <TabsTrigger value="custom">Настройка</TabsTrigger>
                </TabsList>
                <TabsContent value="preset">
                  <ScrollArea className="h-[70vh] p-2 md:h-[50vh]" type="auto">
                    <ThemePreset />
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="custom">
                  <div className="h-[70vh] overflow-auto p-2 md:h-[50vh]">
                    <ThemeForm />
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" onClick={(e) => setOpen(false)}>
                  Отмена
                </Button>
                <ThemeSaveButton
                  onSave={() => {
                    setOpen(false);
                  }}
                  setTheme={setTheme}
                />
              </div>
            </div>
            <div className="hidden md:block">
              <ThemePreview />
            </div>
          </div>
        </LayoutThemeProvider>
      </SheetContent>
    </Sheet>
  );
}

function ThemeSaveButton({
  setTheme,
  onSave,
}: {
  setTheme: (theme: LayoutTheme) => void;
  onSave: () => void;
}) {
  const theme = useTheme();
  return (
    <Button
      className="bg-blue-500 hover:bg-blue-400"
      onClick={() => {
        setTheme(theme);
        onSave();
      }}
    >
      Сохранить тему
    </Button>
  );
}

function ThemePreset() {
  return (
    <ul className="grid h-full w-full grid-cols-4 gap-2">
      {predefinedThemes.map((theme, i) => (
        <ThemePresetCard key={i} theme={theme} />
      ))}
    </ul>
  );
}

function ThemePresetCard({ theme }: { theme: ThemePredefined }) {
  const { setTheme } = useThemeContext();

  return (
    <li className="h-full w-full transition hover:scale-105">
      <button className="h-full w-full" onClick={() => setTheme(theme.theme)}>
        <div
          className="flex aspect-video w-full items-center justify-center rounded p-4"
          style={{
            backgroundColor: theme.theme.colors.background,
            backgroundImage: theme.theme.colors.backgroundImage
              ? `url(${theme.theme.colors.backgroundImage})`
              : undefined,
            backgroundSize: "cover",
          }}
        >
          <div
            className="flex-grow rounded p-2"
            style={{
              backgroundColor: theme.theme.colors.foreground,
              color: theme.theme.colors.text,
              fontFamily: theme.theme.fonts.text,
            }}
          >
            <h1
              className="font-bold"
              style={{
                color: theme.theme.colors.heading,
                fontFamily: theme.theme.fonts.heading,
              }}
            >
              Заголовок
            </h1>
            <p className="text-sm">Текст</p>
          </div>
        </div>
        <p className="p-2 text-xs">{theme.name}</p>
      </button>
    </li>
  );
}

function ThemePreview() {
  const theme = useTheme();

  return (
    <div
      className="grid aspect-video w-full grid-cols-[64px_1fr] rounded border transition-colors"
      style={{
        backgroundColor: theme.colors.foreground,
      }}
    >
      <div
        style={{
          backgroundColor: theme.colors.background,
          backgroundImage: theme.colors.backgroundImage
            ? `url(${theme.colors.backgroundImage})`
            : undefined,
          backgroundSize: "cover",
        }}
      />
      <div
        className="p-4"
        style={{
          color: theme.colors.text,
          fontFamily: theme.fonts.text,
        }}
      >
        <p className="text-xs">Привет!</p>
        <p
          className="py-2 text-3xl font-bold"
          style={{
            color: theme.colors.heading,
            fontFamily: theme.fonts.heading,
          }}
        >
          Это предпросмотр темы презентации!
        </p>
        <p
          className="py-2 text-xl font-medium"
          style={{
            color: theme.colors.heading,
            fontFamily: theme.fonts.heading,
          }}
        >
          Выбери тему в меню слева!
        </p>
        <p className="text-sm" style={{ fontFamily: theme.fonts.text }}>
          Вот пример основного текста. Ты можешь изменить его шрифт и цвет.{" "}
          <span
            className="underline"
            style={{
              color: theme.colors.primary,
            }}
          >
            Акцентный цвет используется для ссылок
          </span>
        </p>
      </div>
    </div>
  );
}

function ThemeForm() {
  const { theme, setTheme } = useThemeContext();
  return (
    <Tabs
      className="grid grid-cols-[auto_1fr] gap-2 rounded"
      defaultValue="colors"
    >
      <div className="min-w-32">
        <TabsList className="fixed h-auto min-w-32 flex-col justify-start">
          <TabsTrigger
            value="colors"
            className="justify-start py-2 data-[state=active]:text-blue-400"
          >
            <Palette className="mr-2 size-4 text-blue-400" />
            Цвета
          </TabsTrigger>
          <TabsTrigger
            value="fonts"
            className="justify-start py-2 data-[state=active]:text-blue-400"
          >
            <Type className="mr-2 size-4 text-blue-400" />
            Шрифты
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="rounded bg-muted p-4">
        <TabsContent value="colors" className="mt-0 space-y-4">
          <div className="space-y-2">
            <h1 className="text-lg font-bold">
              Акцентный цвет{" "}
              <Hint text="Акцентный цвет используется для ссылок" />
            </h1>
            <ColorPicker
              className="w-full"
              color={theme.colors.primary}
              onColorChange={(e) =>
                setTheme({ ...theme, colors: { ...theme.colors, primary: e } })
              }
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-bold">Текст</h1>
            <h2 className="text-base font-semibold">Цвет заголовка</h2>
            <ColorPicker
              className="w-full"
              color={theme.colors.heading}
              onColorChange={(e) =>
                setTheme({ ...theme, colors: { ...theme.colors, heading: e } })
              }
            />
            <h2 className="text-base font-semibold">Цвет содержимого</h2>
            <ColorPicker
              className="w-full"
              color={theme.colors.text}
              onColorChange={(e) =>
                setTheme({ ...theme, colors: { ...theme.colors, text: e } })
              }
              position="top"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-bold">Фон</h1>
            <h2 className="text-base font-semibold">
              Цвет фона слайда{" "}
              <Hint text="Используется для фонового оформления макета слайда" />
            </h2>
            <ColorPicker
              className="w-full"
              color={theme.colors.background}
              onColorChange={(e) =>
                setTheme({
                  ...theme,
                  colors: { ...theme.colors, background: e },
                })
              }
              position="top"
            />
            <h2 className="text-base font-semibold">
              Цвет слайда <Hint text="Основной цвет заливки слайда" />
            </h2>
            <ColorPicker
              className="w-full"
              color={theme.colors.foreground}
              onColorChange={(e) =>
                setTheme({
                  ...theme,
                  colors: { ...theme.colors, foreground: e },
                })
              }
              position="top"
            />
          </div>
        </TabsContent>
        <TabsContent value="fonts" className="mt-0">
          <div className="space-y-2">
            <h1 className="text-lg font-bold">Заголовки</h1>
            <FontDialog
              initialValue={theme.fonts.heading}
              onValueChange={(e) =>
                setTheme({
                  ...theme,
                  fonts: { ...theme.fonts, heading: e },
                })
              }
            >
              <div
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded bg-primary p-2"
                tabIndex={-1}
              >
                {theme.fonts.heading}
                <SquareDashedMousePointer className="size-4 text-muted-foreground" />
              </div>
            </FontDialog>
            <ColorPicker
              className="w-full"
              color={theme.colors.heading}
              onColorChange={(e) =>
                setTheme({ ...theme, colors: { ...theme.colors, heading: e } })
              }
            />
            <h1 className="text-lg font-bold">Основной текст</h1>
            <FontDialog
              initialValue={theme.fonts.text}
              onValueChange={(e) =>
                setTheme({
                  ...theme,
                  fonts: { ...theme.fonts, text: e },
                })
              }
            >
              <div
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded bg-primary p-2"
                tabIndex={-1}
              >
                {theme.fonts.text}
                <SquareDashedMousePointer className="size-4 text-muted-foreground" />
              </div>
            </FontDialog>
            <ColorPicker
              className="w-full"
              color={theme.colors.text}
              onColorChange={(e) =>
                setTheme({ ...theme, colors: { ...theme.colors, text: e } })
              }
            />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
