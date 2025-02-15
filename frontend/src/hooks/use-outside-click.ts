import { useEffect, useRef } from "react";

export default function useOutsideClick<T extends HTMLElement>(
  callback: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (event.target.tagName == "HTML") return;
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback]);

  return ref;
}
