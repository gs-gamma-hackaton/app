import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";

export interface ColorPickerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  color?: string;
  onColorChange?: (color: string) => void;
  position?: "top" | "bottom";
}

const ColorPicker = React.forwardRef<HTMLButtonElement, ColorPickerProps>(
  ({ color, onColorChange, className, position = "bottom", ...props }, ref) => {
    const [active, setActive] = useState(false);
    const [value, setValue] = useState<string>(color ?? "#000000");
    const [lastReported, setLastReported] = useState<string>(
      color ?? "#000000"
    );

    useEffect(() => {
      setValue(color ?? "#000000");
    }, [color]);

    const handleClick = () => {
      setActive(!active);
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative flex h-10 items-center gap-2 rounded bg-primary p-2",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {active && (
          <>
            <div
              className={cn(
                "absolute z-20",
                position == "bottom" ? "top-10" : "bottom-10"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <ChromePicker
                color={value}
                onChange={(e) => setValue(e.hex)}
                onChangeComplete={(e) => {
                  if (lastReported == e.hex) return;
                  setLastReported(e.hex);
                  onColorChange?.(e.hex);
                }}
              />
            </div>
            <div
              className="fixed bottom-0 left-0 right-0 top-0 z-10 cursor-default"
              onClick={(e) => setActive(false)}
            ></div>
          </>
        )}
        <div
          className="size-4 rounded"
          style={{ backgroundColor: value?.toString() }}
        ></div>
        <p>{value?.toString()}</p>
      </button>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
