import TutorialOverlay from "@/components/ui/tutorial";
import useLocalStorage from "@/hooks/use-local-storage";
import { useState } from "react";

interface Tutorial {
  id: string;
  text: string;
  align?: "top" | "bottom" | "center";
}

const tutorials: Tutorial[] = [
  {
    id: "slide-0",
    text: "Это основная зона редактирования презентации. Тут ты будешь творить шедевры",
  },
  {
    id: "slide-0",
    text: "Двойным кликом по слайду ты можешь добавить новые элементы",
  },
  {
    id: "slide-0",
    text: "На выбор доступны различные контейнеры, карточки, картинки и т.д.",
  },
  {
    id: "tutorial-snapshot",
    text: "Ошибся? Не беда - ты всегда можешь отменить и повторить последние действия",
    align: "bottom",
  },
  {
    id: "tutorial-footer",
    text: "Здесь отображаются горячие клавиши, которые доступны в данный момент",
  },
  {
    id: "tutorial-theme",
    text: "Ты можешь отредактировать тему твоей презентации",
    align: "center",
  },
  {
    id: "tutorial-templates",
    text: "Здесь ты можешь выбрать готовые шаблоны для слайдов",
    align: "center",
  },
  {
    id: "tutorial-view",
    text: "Ты можешь просмотреть свою презентацию в режиме докладчика",
    align: "center",
  },
  {
    id: "tutorial-download",
    text: "Когда будешь готов - можешь сохранить результат в формате PDF",
    align: "center",
  },
  {
    id: "slide-0",
    text: "Да пребудет с тобой сила!",
  },
];

export default function Tutorial() {
  const [currentTutorialIndex, setCurrentTutorialIndex] = useState(0);
  const [close, setClose] = useLocalStorage("tutorialComplete", false);

  const doNext = (index: number) => {
    if (index >= tutorials.length) {
      setClose(true);
      return;
    }
    setCurrentTutorialIndex(index);
  };

  if (close) return <></>;
  return (
    <>
      {tutorials.map((tutorial, index) => {
        if (index != currentTutorialIndex) return null;
        return (
          <TutorialOverlay
            key={index}
            targetId={tutorial.id}
            align={tutorial.align}
            onClose={() => doNext(index + 1)}
            onContinue={() => doNext(index + 1)}
          >
            {tutorial.text}
          </TutorialOverlay>
        );
      })}
    </>
  );
}
