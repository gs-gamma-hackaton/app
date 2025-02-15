import { createContext, PropsWithChildren, useContext, useState } from "react";

export interface LayoutTheme {
  colors: {
    heading: string;
    text: string;
    primary: string;
    background: string;
    backgroundImage?: string;
    foreground: string;
  };
  fonts: {
    heading: string;
    text: string;
  };
}

export interface LayoutThemeContext {
  theme: LayoutTheme;
  setTheme: (theme: LayoutTheme) => void;
}

const context = createContext<LayoutThemeContext>({
  theme: {
    colors: {
      heading: "#000",
      text: "#000",
      primary: "#000",
      background: "#cccccc",
      foreground: "#fff",
    },
    fonts: {
      heading: "sans-serif",
      text: "sans-serif",
    },
  },
  setTheme: () => {},
});

export const LayoutThemeProvider = ({
  children,
  theme: defaultTheme,
}: PropsWithChildren<{ theme?: LayoutTheme }>) => {
  const [theme, setTheme] = useState(
    defaultTheme ?? {
      colors: {
        heading: "#020202",
        text: "#383838",
        primary: "#008aff",
        background: "#cccccc",
        foreground: "#fff",
      },
      fonts: {
        heading: "Montserrat",
        text: "Montserrat",
      },
    }
  );

  return (
    <context.Provider value={{ theme, setTheme }}>{children}</context.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(context);
};

export const useTheme = () => {
  return useThemeContext().theme;
};
