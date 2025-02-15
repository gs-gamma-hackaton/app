import { LayoutNodeSerialized } from "./types";

export type SlideTemplate = LayoutNodeSerialized;
export interface SlideTemplateEntry {
  name: string;
  image: string;
  root: SlideTemplate;
}

export const registry: SlideTemplateEntry[] = [
  {
    name: "Пустой",
    image: "/tpl/empty.png",
    root: {
      type: "slide",
      attributes: {},
      children: [],
    },
  },
  {
    name: "Заголовок и текст",
    image: "/tpl/header-with-text.png",
    root: {
      type: "slide",
      attributes: {},
      children: [
        {
          type: "text",
          attributes: {
            text: "Заголовок слайда",
            bold: true,
            fontSize: "h1",
          },
          children: [],
        },
        {
          type: "text",
          attributes: {
            text: "Замени этот текст на что-то интересное",
          },
          children: [],
        },
      ],
    },
  },
  {
    name: "Изображение и текст",
    image: "/tpl/image-and-text.png",
    root: {
      type: "slide",
      attributes: {},
      children: [
        {
          type: "text",
          attributes: {
            text: "Заголовок слайда",
            bold: true,
            fontSize: "h1",
          },
          children: [],
        },
        {
          type: "flex",
          attributes: {
            direction: "row",
          },
          children: [
            {
              type: "flex",
              attributes: {
                direction: "column",
              },
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
              attributes: {
                direction: "column",
              },
              children: [
                {
                  type: "text",
                  attributes: {
                    text: "Заголовок",
                    fontSize: "h3",
                  },
                  children: [],
                },
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
      ],
    },
  },
  {
    name: "Текст и изображение",
    image: "/tpl/text-and-image.png",
    root: {
      type: "slide",
      attributes: {},
      children: [
        {
          type: "text",
          attributes: {
            text: "Заголовок слайда",
            bold: true,
            fontSize: "h1",
          },
          children: [],
        },
        {
          type: "flex",
          attributes: {
            direction: "row",
            justify: "space-between",
          },
          children: [
            {
              type: "flex",
              attributes: {
                direction: "column",
              },
              children: [
                {
                  type: "text",
                  attributes: {
                    text: "Заголовок",
                    fontSize: "h3",
                  },
                  children: [],
                },
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
              type: "flex",
              attributes: {
                direction: "column",
              },
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
          ],
        },
      ],
    },
  },
  {
    name: "Две колонки",
    image: "/tpl/two-columns.png",
    root: {
      type: "slide",
      attributes: {},
      children: [
        {
          type: "text",
          attributes: {
            text: "Заголовок слайда",
            bold: true,
            fontSize: "h1",
          },
          children: [],
        },
        {
          type: "grid",
          attributes: {
            columns: 2,
          },
          children: [
            {
              type: "flex",
              attributes: {
                direction: "column",
              },
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
              type: "flex",
              attributes: {
                direction: "column",
              },
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
      ],
    },
  },
  {
    name: "Две колонки и заголовки",
    image: "/tpl/two-columns-with-headers.png",
    root: {
      type: "slide",
      attributes: {},
      children: [
        {
          type: "text",
          attributes: {
            text: "Заголовок слайда",
            bold: true,
            fontSize: "h1",
          },
          children: [],
        },
        {
          type: "grid",
          attributes: {
            columns: 2,
          },
          children: [
            {
              type: "flex",
              attributes: {
                direction: "column",
              },
              children: [
                {
                  type: "text",
                  attributes: {
                    text: "Заголовок 1",
                    fontSize: "h3",
                  },
                  children: [],
                },
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
              type: "flex",
              attributes: {
                direction: "column",
              },
              children: [
                {
                  type: "text",
                  attributes: {
                    text: "Заголовок 2",
                    fontSize: "h3",
                  },
                  children: [],
                },
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
      ],
    },
  },
  {
    name: "Три колонки",
    image: "/tpl/three-columns.png",
    root: {
      type: "slide",
      attributes: {},
      children: [
        {
          type: "text",
          attributes: {
            text: "Заголовок слайда",
            bold: true,
            fontSize: "h1",
          },
          children: [],
        },
        {
          type: "grid",
          attributes: {
            columns: 3,
          },
          children: [
            {
              type: "flex",
              attributes: {
                direction: "column",
              },
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
              type: "flex",
              attributes: {
                direction: "column",
              },
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
              type: "flex",
              attributes: {
                direction: "column",
              },
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
      ],
    },
  },
  {
    name: "Три колонки и заголовки",
    image: "/tpl/three-columns-with-headers.png",
    root: {
      type: "slide",
      attributes: {},
      children: [
        {
          type: "text",
          attributes: {
            text: "Заголовок слайда",
            bold: true,
            fontSize: "h1",
          },
          children: [],
        },
        {
          type: "grid",
          attributes: {
            columns: 2,
          },
          children: [
            {
              type: "flex",
              attributes: {
                direction: "column",
              },
              children: [
                {
                  type: "text",
                  attributes: {
                    text: "Заголовок 1",
                    fontSize: "h3",
                  },
                  children: [],
                },
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
              type: "flex",
              attributes: {
                direction: "column",
              },
              children: [
                {
                  type: "text",
                  attributes: {
                    text: "Заголовок 2",
                    fontSize: "h3",
                  },
                  children: [],
                },
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
              type: "flex",
              attributes: {
                direction: "column",
              },
              children: [
                {
                  type: "text",
                  attributes: {
                    text: "Заголовок 3",
                    fontSize: "h3",
                  },
                  children: [],
                },
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
      ],
    },
  },
  {
    name: "Заголовок и список",
    image: "/tpl/header-with-bullets.png",
    root: {
      type: "slide",
      attributes: {},
      children: [
        {
          type: "text",
          attributes: {
            text: "Заголовок слайда",
            bold: true,
            fontSize: "h1",
          },
          children: [],
        },
        {
          type: "card",
          attributes: { type: "bullet" },
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
          attributes: { type: "bullet" },
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
          attributes: { type: "bullet" },
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
          attributes: { type: "bullet" },
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
  },
  {
    name: "Заголовок, список и картинка",
    image: "/tpl/header-with-bullets-and-image.png",
    root: {
      type: "slide",
      attributes: {},
      children: [
        {
          type: "text",
          attributes: {
            text: "Заголовок слайда",
            bold: true,
            fontSize: "h1",
          },
          children: [],
        },
        {
          type: "grid",
          attributes: { columns: 2, align: "center" },
          children: [
            {
              type: "flex",
              attributes: {
                direction: "column",
              },
              children: [
                {
                  type: "card",
                  attributes: { type: "bullet" },
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
                  attributes: { type: "bullet" },
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
                  attributes: { type: "bullet" },
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
                  attributes: { type: "bullet" },
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
      ],
    },
  },
];
