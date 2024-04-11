export const PARAGRAPH = 'paragraph'
export const QUOTE = 'quote'
export const IMAGE = 'image'
export const PRODUCT_IMAGE = 'product_image'
export const SOURCE = 'source'
export const TEXT = 'text'
export const TITLE = 'title'
export const BUTTON = 'button'

export const COLUMN_1 = 'column_1'
export const COLUMN_2 = 'column_2'

export enum Column {
  COLUMN_1 = 'column_1',
  COLUMN_2 = 'column_2',
}

export const spotlightNames = {
  ADELE_SHARMAN: 'adele-sharman',
}

export const spotlight = {
  [spotlightNames.ADELE_SHARMAN]: {
    header: {
      id: 'header',
      imageSrc: '/spotlight/adele-sharman/header.png',
      alt: 'Adele Sharman',
      title: "Look after your skin. It's travelling with you",
    },
    specifications: {
      id: 'specifications',
      photo: '/spotlight/adele-sharman/avatar.png',
      alt: 'adele-sharman',
      name: 'Adele Sharman',
      social_id: '@sharmanshores',
      profession: 'Travel Blogger/ Independent travel agent',
    },
    items: [
      {
        id: 'paragraph_1',
        type: PARAGRAPH,
        content: [
          {
            id: 'paragraph_1_content_1',
            type: TEXT,
            data: 'I’m Adele Sharman, a 48-year-old Travel addict. I have two daughters who I am incredibly proud of and a golf-loving husband who shares my passion for travel. I love learning about travel; it broadens your mind and is a great conversation starter. I am a social butterfly; I love making new friends and connecting with likeminded people. ',
          },
        ],
        position: Column.COLUMN_1,
        order: 1,
      },
      {
        id: 'quote_1',
        type: QUOTE,
        content: [
          {
            id: 'quote_1_content_1',
            type: TEXT,
            data: "You can't swap your skin, so why wouldn't you protect it? It has to last you a lifetime.",
          },
        ],
        position: Column.COLUMN_1,
        order: 3,
      },
      {
        id: 'image_1',
        type: IMAGE,
        content: [
          {
            id: 'image_1_content_1',
            type: SOURCE,
            data: '/spotlight/adele-sharman/image_1.png',
          },
        ],
        position: Column.COLUMN_1,
        order: 8,
      },
      {
        id: 'paragraph_2',
        type: PARAGRAPH,
        content: [
          {
            id: 'paragraph_2_content_1',
            type: TEXT,
            data: "I was very impressed with the Glow Mist SPF 30 mist protection spray. It's quick-drying and transparent and leaves a radiant skin glow; who doesn't love a bit of shimmer? It is also a spray, a must for someone like me. I am a lazy sunbather. I don't want to spend ten minutes rubbing a thick, greasy cream onto my skin. After I have applied it myself, I would have to do the husband twice the work.",
          },
          {
            id: 'paragraph_2_content_2',
            type: TEXT,
            data: "I also love the Clear Protect SPF15 Calypso Clear Protection Continuous spray. It's non-greasy, and it reaches them hard-to-reach places like your back. A spay is excellent for someone like me who sunbathes on her own when her husband golfs.",
          },
        ],
        position: Column.COLUMN_1,
        order: 9,
      },
      {
        id: 'image_2',
        type: IMAGE,
        content: [
          {
            id: 'image_2_content_1',
            type: SOURCE,
            data: '/spotlight/adele-sharman/image_2.png',
          },
        ],
        position: Column.COLUMN_1,
        order: 10,
      },
      {
        id: 'image_3',
        type: IMAGE,
        typeDetail: PRODUCT_IMAGE,
        content: [
          {
            id: 'image_3_content_1',
            type: SOURCE,
            data: '/spotlight/adele-sharman/image_3.png',
          },
          {
            id: 'image_3_content_2',
            type: TITLE,
            data: 'Calypso Glow Mist Spray SPF30',
          },
          {
            id: 'image_3_content_3',
            type: BUTTON,
            data: 'Know more',
            url: '',
          },
        ],
        position: Column.COLUMN_2,
        order: 5,
      },
      {
        id: 'paragraph_3',
        type: PARAGRAPH,
        content: [
          {
            id: 'paragraph_3_content_1',
            type: TEXT,
            data: 'I spend a lot of time outdoors, and I am one of those people who would chase the perfect sunrise and sunset. I also know when I am in different countries if I need to use a higher SPF. My skin lets me know.',
          },
          {
            id: 'paragraph_3_content_2',
            type: TEXT,
            data: "It's just like putting deodorant on for me; it's just part of my routine, especially when I travel.",
          },
          {
            id: 'paragraph_3_content_3',
            type: TEXT,
            data: "You don't have to be laid out in the sun at a pool or on the beach to catch the rays. ",
          },
          {
            id: 'paragraph_3_content_4',
            type: TEXT,
            data: "If I know I am going to be active and not just sitting on a beach, I still try to remember to put an SPF on my face or other parts of my body that are exposed. It's just like putting a moisturiser on.",
          },
        ],
        position: Column.COLUMN_2,
        order: 3,
      },
      {
        id: 'image_4',
        type: IMAGE,
        content: [
          {
            id: 'image_4_content_1',
            type: SOURCE,
            data: '/spotlight/adele-sharman/image_4.png',
          },
        ],
        position: Column.COLUMN_2,
        order: 2,
      },
      {
        id: 'quote_2',
        type: QUOTE,
        content: [
          {
            id: 'quote_2_content_1',
            type: TEXT,
            data: 'Protecting your skin now will help later on in life',
          },
        ],
        position: Column.COLUMN_2,
        order: 7,
      },
      {
        id: 'paragraph_4',
        type: PARAGRAPH,
        content: [
          {
            id: 'paragraph_4_content_1',
            type: TEXT,
            data: "You only get one life. If you look after the inside of your body with what you put in it, why wouldn't you look after the outside?",
          },
          {
            id: 'paragraph_4_content_2',
            type: TEXT,
            data: 'I didn’t use an SPF when I was younger because I thought I would obtain a better tan until I realised I was damaging my skin.',
          },
          {
            id: 'paragraph_4_content_3',
            type: TEXT,
            data: 'A tan and glowing skin makes you feel fabulous, but at what cost?',
          },
          {
            id: 'paragraph_4_content_4',
            type: TEXT,
            data: 'If you are not applying an SPF before you sit out in the sun and damage your skin, think twice. You have a lifetime in your skin; look after and protect it.',
          },
        ],
        position: Column.COLUMN_2,
        order: 6,
      },
    ],
  },
}
