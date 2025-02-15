import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Button } from "./button";

const TutorialOverlay = ({
  targetId,
  align = "top",
  children,
  onContinue,
  onClose,
}: PropsWithChildren<{
  targetId: string;
  align?: "top" | "bottom" | "center";
  onContinue: () => void;
  onClose: () => void;
}>) => {
  const [position, setPosition] = useState<DOMRect | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setPosition(targetElement.getBoundingClientRect());
      }
    }, 200);
  }, [targetId]);

  return position ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60"
      onClick={onContinue}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0"
        style={{
          width: position.width + "px",
          height: position.height + "px",
          top: position.top + "px",
          left: position.left + "px",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.8)",
        }}
      />

      <div
        className={cn(
          "absolute rounded border border-primary bg-black/90 px-2 py-1 shadow-lg",
          align == "top" && "-translate-y-full",
          align == "center" && "-translate-x-1/2"
        )}
        style={{
          top:
            align == "top"
              ? position.top - 10
              : align == "center"
                ? undefined
                : position.top + position.height + 10,
          bottom: align == "center" ? "20%" : undefined,
          left: align == "center" ? "50%" : position.left + 10,
        }}
      >
        {children}
        <Button
          variant={"ghost"}
          size={"icon"}
          className="ml-2"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <CircleX />
        </Button>
      </div>
    </div>
  ) : null;
};

export default TutorialOverlay;
