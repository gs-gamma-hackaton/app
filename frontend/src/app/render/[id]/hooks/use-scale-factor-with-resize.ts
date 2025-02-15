import { useGlobalStore } from "@/components/context/store";
import { useCallback, useEffect } from "react";

export default function useScaleFactorWithResize() {
  const scaleFactor = useGlobalStore((state) => state.scaleFactor);
  const setScaleFactor = useGlobalStore((state) => state.setScaleFactor);

  const handleResize = useCallback(() => {
    const scaleFactor = document.body.clientWidth / 768;
    setScaleFactor(scaleFactor);
  }, []);
  useEffect(() => {
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  return scaleFactor;
}
