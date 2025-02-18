import { Presentation } from "@/lib/editor/types";
import { apiFetch } from "@/lib/fetch";

export interface PresentationResponse {
  id: number;
  userId: number;
  data: Presentation;
  prompts: string[];
}

const resp: PresentationResponse = {
  id: 1,
  userId: 1,
  data: {
    name: "Привет, мир!",
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
    content: [
      {
        type: "slide",
        attributes: { layout: "left", active: true },
        children: [
          {
            type: "text",
            attributes: {
              text: "Привет, мир!",
              fontSize: "h1",
              bold: true,
            },
            children: [],
          },
          {
            type: "text",
            attributes: {
              text: "Это пример презентации, которую можно создать в нашем редакторе",
            },
            children: [],
          },
          {
            type: "alert",
            attributes: { type: "info" },
            children: [
              {
                type: "flex",
                attributes: { direction: "column" },
                children: [
                  {
                    type: "text",
                    attributes: {
                      text: "Сделай двойной клик в пустом пространстве слайда для добавления элементов",
                      color: "black",
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: "alert",
            attributes: { type: "info" },
            children: [
              {
                type: "flex",
                attributes: { direction: "column" },
                children: [
                  {
                    type: "text",
                    attributes: {
                      text: "Ты также можешь выбрать элемент на панели справа",
                      color: "black",
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "slide",
        attributes: { active: false },
        children: [
          {
            type: "text",
            attributes: { text: "Вау-фишки", bold: true, fontSize: "h1" },
            children: [],
          },
          {
            type: "card",
            attributes: { type: "bullet", orderValue: 1 },
            children: [
              {
                type: "text",
                attributes: {
                  text: "Замени этот текст на что-то интересное",
                },
                children: [],
              },
            ],
          },
          {
            type: "card",
            attributes: { type: "bullet", orderValue: 2 },
            children: [
              {
                type: "text",
                attributes: {
                  text: "Замени этот текст на что-то интересное",
                },
                children: [],
              },
            ],
          },
          {
            type: "card",
            attributes: { type: "bullet", orderValue: 3 },
            children: [
              {
                type: "text",
                attributes: {
                  text: "Замени этот текст на что-то интересное",
                },
                children: [],
              },
            ],
          },
          {
            type: "card",
            attributes: { type: "bullet", orderValue: 4 },
            children: [
              {
                type: "text",
                attributes: {
                  text: "Замени этот текст на что-то интересное",
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        type: "slide",
        attributes: { active: false },
        children: [
          {
            type: "text",
            attributes: {
              text: "Шаблоны слайдов",
              bold: true,
              fontSize: "h1",
            },
            children: [],
          },
          {
            type: "flex",
            attributes: { direction: "row" },
            children: [
              {
                type: "flex",
                attributes: { direction: "column" },
                children: [
                  {
                    type: "image",
                    attributes: {
                      url: "/placeholder.svg",
                      width: 256,
                      height: 256,
                    },
                    children: [],
                  },
                ],
              },
              {
                type: "flex",
                attributes: { direction: "column" },
                children: [
                  {
                    type: "text",
                    attributes: {
                      text: "Здесь могла бы быть Ваша реклама",
                      fontSize: "h3",
                    },
                    children: [],
                  },
                  {
                    type: "text",
                    attributes: {
                      text: "Этот слайд, как и остальные, был создан с помощью шаблонов слайдов. Ты тоже можешь выбрать шаблоны в панели справа.",
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  prompts: [],
};

export async function createWithoutAi(data: Presentation) {
  return resp;
  return await apiFetch<PresentationResponse>(
    "/api/v1/presentation/without-neuron",
    { data: JSON.stringify(data) },
    {
      method: "POST",
    }
  );
}

export async function get(id: number) {
  return resp;
  return await apiFetch<PresentationResponse>(`/api/v1/presentation/${id}`);
}

export async function list() {
  return [resp];
  return await apiFetch<PresentationResponse[]>(`/api/v1/presentation`);
}

export async function update(id: number, data: Presentation) {
  console.log(data);

  return {};
  return await apiFetch<PresentationResponse>(
    `/api/v1/presentation/${id}`,
    { data: JSON.stringify(data) },
    {
      method: "PATCH",
    }
  );
}

export async function remove(id: number) {
  return {};
  return await apiFetch<void>(`/api/v1/presentation/${id}`, undefined, {
    method: "DELETE",
  });
}
