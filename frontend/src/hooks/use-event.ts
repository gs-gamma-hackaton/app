import globalEventEmitter from "@/lib/event";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useEventEmitter<T>(eventName: string) {
  const [eventData, setEventData] = useState<T>();
  const skipRerender = useRef(false);

  const publishEvent = useCallback(
    (eventData: T, skipRender = true) => {
      skipRerender.current = skipRender;
      const event = new CustomEvent(eventName, { detail: eventData });
      globalEventEmitter.dispatchEvent(event);
    },
    [eventName]
  );

  useEffect(() => {
    const listener = (event: Event) => {
      if (skipRerender.current) {
        skipRerender.current = false;
        return;
      }
      setEventData((event as CustomEvent).detail);
    };

    globalEventEmitter.addEventListener(eventName, listener);
    return () => {
      globalEventEmitter.removeEventListener(eventName, listener);
    };
  }, [eventName, skipRerender]);

  return { eventData, publishEvent };
}

export function emitEvent<T>(eventName: string, eventData: T) {
  const event = new CustomEvent(eventName, { detail: eventData });
  globalEventEmitter.dispatchEvent(event);
}

export function useEvent<T>(eventName: string, defaultValue: T) {
  const [detail, setDetail] = useState(defaultValue);

  useEffect(() => {
    const eventHandler = (event: Event) => {
      setDetail((event as CustomEvent).detail);
    };

    globalEventEmitter.addEventListener(eventName, eventHandler);
    return () => {
      globalEventEmitter.removeEventListener(eventName, eventHandler);
    };
  }, []);

  return detail;
}
