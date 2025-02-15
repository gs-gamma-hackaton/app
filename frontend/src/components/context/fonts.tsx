import { createContext, PropsWithChildren, useContext, useRef } from "react";

interface GoogleFontsContextType {
  addFont: (font: string) => void;
  removeFont: (font: string) => void;
  toggleFont: (font: string, value: boolean) => void;
}

const GoogleFontsContext = createContext<GoogleFontsContextType>({
  addFont: () => {},
  removeFont: () => {},
  toggleFont: () => {},
});

export function GoogleFontsProvider({ children }: PropsWithChildren) {
  const fontsRef = useRef(new Set());

  const addFont = (font: string) => {
    if (!fontsRef.current.has(font)) {
      fontsRef.current.add(font);
      const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}:ital,wght@0,400;0,700;1,400;1,700&display=swap`;
      if (!document.querySelector(`link[href="${fontUrl}"]`)) {
        const link = document.createElement("link");
        link.href = fontUrl;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
    }
  };

  const removeFont = (font: string) => {
    if (fontsRef.current.has(font)) {
      fontsRef.current.delete(font);
      const fontUrl = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}:wght@400&display=swap`;
      const link = document.querySelector(`link[href="${fontUrl}"]`);
      if (link) {
        document.head.removeChild(link);
      }
    }
  };

  const toggleFont = (font: string, value: boolean) => {
    if (value) {
      addFont(font);
    } else {
      removeFont(font);
    }
  };

  return (
    <GoogleFontsContext.Provider value={{ addFont, removeFont, toggleFont }}>
      {children}
    </GoogleFontsContext.Provider>
  );
}

export function useGoogleFonts() {
  return useContext(GoogleFontsContext);
}
