"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PromptInput() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/generate?search=" + encodeURI(prompt));
  };

  return (
    <form
      className="relative w-full py-4 animate-in fade-in slide-in-from-left-8 duration-2000"
      onSubmit={handleSubmit}
    >
      <input
        className="h-16 w-full rounded bg-primary px-8 py-4"
        placeholder="Создай стильную презентацию про технологии с краткими и понятными слайдами"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        variant="ghost"
        className="absolute right-2 top-1/2 size-12 -translate-y-1/2 bg-primary"
      >
        <Send />
      </Button>
    </form>
  );
}
