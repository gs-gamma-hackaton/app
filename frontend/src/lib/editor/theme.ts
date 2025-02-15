import { LayoutTheme } from "@/components/editor/theme/provider";

export interface ThemePredefined {
  name: string;
  theme: LayoutTheme;
}

export const predefinedThemes: ThemePredefined[] = [
  {
    name: "Жемчужина",
    theme: {
      colors: {
        heading: "#000",
        text: "#555",
        primary: "#008aff",
        background: "#cccccc",
        foreground: "#fff",
      },
      fonts: {
        heading: "Montserrat",
        text: "Montserrat",
      },
    },
  },
  {
    name: "Солнце",
    theme: {
      colors: {
        heading: "#000",
        text: "#555",
        primary: "#000",
        background: "#fff0da",
        foreground: "#fff",
      },
      fonts: {
        heading: "Onest",
        text: "Roboto",
      },
    },
  },
  {
    name: "Уголь",
    theme: {
      colors: {
        heading: "#cccccc",
        text: "#999999",
        primary: "#ffb066",
        background: "#020202",
        foreground: "#212121",
      },
      fonts: {
        heading: "Onest",
        text: "Roboto",
      },
    },
  },
  {
    name: "Звёздное небо",
    theme: {
      colors: {
        heading: "#cccccc",
        text: "#ebecef",
        primary: "#8C98CA",
        background: "#A8AFCC",
        foreground: "#080E26",
      },
      fonts: {
        heading: "Onest",
        text: "Roboto",
      },
    },
  },
  {
    name: "Мрамор",
    theme: {
      colors: {
        heading: "#201b18",
        text: "#504c49",
        primary: "#3e2513",
        background: "#f7f3f0",
        foreground: "#ffffff",
      },
      fonts: {
        heading: "Onest",
        text: "Podkova",
      },
    },
  },
  {
    name: "Морской бриз",
    theme: {
      colors: {
        heading: "#201b18",
        text: "#504c49",
        primary: "#26A688",
        background: "#D6F5EE",
        foreground: "#ffffff",
      },
      fonts: {
        heading: "Unbounded",
        text: "Fira Sans",
      },
    },
  },
  {
    name: "Голубика",
    theme: {
      colors: {
        heading: "#FFFFFF",
        text: "#D9E1FF",
        primary: "#f52f5c",
        background: "#100c35",
        foreground: "#271c4e",
      },
      fonts: {
        heading: "Prosto One",
        text: "Noto Sans",
      },
    },
  },
  {
    name: "Люкс",
    theme: {
      colors: {
        heading: "#ffd9be",
        text: "#f9eee7",
        primary: "#ef9c82",
        background: "#1c4241",
        foreground: "#123332",
      },
      fonts: {
        heading: "Merriweather",
        text: "Merriweather",
      },
    },
  },
  {
    name: "Фламинго",
    theme: {
      colors: {
        heading: "#1f1e1e",
        text: "#3b3535",
        primary: "#ef9c82",
        background: "#000000",
        backgroundImage: "/images/themes/flamingo-bg.png",
        foreground: "#FFFAFA",
      },
      fonts: {
        heading: "Roboto Slab",
        text: "Roboto",
      },
    },
  },
  {
    name: "Тропики",
    theme: {
      colors: {
        heading: "#403C4E",
        text: "#403C4E",
        primary: "#FFAD94",
        background: "#000000",
        backgroundImage: "/images/themes/tropics-bg.png",
        foreground: "#FFFFFF",
      },
      fonts: {
        heading: "Merriweather",
        text: "Open Sans",
      },
    },
  },
  {
    name: "Рябь",
    theme: {
      colors: {
        heading: "#FFFFFF",
        text: "#CAD6DE",
        primary: "#0A988B",
        background: "#000000",
        backgroundImage: "/images/themes/ripples-bg.png",
        foreground: "#112836",
      },
      fonts: {
        heading: "Prosto One",
        text: "Montserrat",
      },
    },
  },
  {
    name: "Волна",
    theme: {
      colors: {
        heading: "#F5F0F0",
        text: "#E2E6E9",
        primary: "#609DFF",
        background: "#000000",
        backgroundImage: "/images/themes/waves-bg.png",
        foreground: "#09151A",
      },
      fonts: {
        heading: "Merriweather",
        text: "Merriweather",
      },
    },
  },
];

export const getRequiredFonts = () => {
  const fonts = predefinedThemes.map((theme) =>
    Object.values(theme.theme.fonts)
  );
  return new Set(fonts.flat());
};
