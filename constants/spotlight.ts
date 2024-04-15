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
  AYLA: 'ayla',
  AALIYAH: 'aaliyah',
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
      social_id: 'sharmanshores',
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
            url: '/products/glow-mist?sku=CALZ16',
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
  [spotlightNames.AYLA]: {
    header: {
      id: 'header',
      imageSrc: '/spotlight/ayla/header.png',
      alt: spotlightNames.AYLA,
      title:
        'Embrace your natural beauty and your skin will thank you when you are older!',
    },
    specifications: {
      id: 'specifications',
      photo: '/spotlight/ayla/avatar.png',
      alt: spotlightNames.AYLA,
      name: 'Ayla',
      social_id: 'ayla_in_dubai',
      profession: 'Travel Specialist and Beauty Blogger',
    },
    items: [
      {
        id: 'paragraph_1',
        type: PARAGRAPH,
        content: [
          {
            id: 'paragraph_1_content_1',
            type: TEXT,
            data: 'I’m passionate about all things beauty as well as exploring sunny destinations. I’m always on the lookout for the very best beauty and skincare products that are simple but effective -and can keep up with my busy jet-set lifestyle!',
          },
          {
            id: 'paragraph_1_content_2',
            type: TEXT,
            data: "It’s so essential to wear sunscreen year-round to protect my skin from the sun's harmful rays. UV rays are present even on cloudy days! By applying a broad-spectrum sunscreen like Calypso with a high SPF, you can prevent these damages and maintain the health and appearance of your skin. I make applying  sunscreen a daily habit to ensure my skin stays protected and to reduce the risk of sun-related skin issues such as premature aging. ",
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
            data: 'I’m always told I look younger than my age, and I credit that to wearing sunscreen religiously!',
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
            data: '/spotlight/ayla/image_1.png',
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
            data: 'I’m a very active person and love being outside in the sunshine, whether by the pool or beach or even Jet-skiing! I also love traveling and exploring new places too. That’s why I make sure I regularly apply sunscreen before I leave home, and again after swimming or exercising when I’m out and about! It’s also really important to remember to reapply every two hours but I’ve gotta remind myself!',
          },
          {
            id: 'paragraph_2_content_2',
            type: TEXT,
            data: 'When I was a teenager I used to love sunbathing with my friends and we’d end up with wicked sunburns because we didn’t know how to use sunscreen correctly! Obviously those days are long gone and even though I still love to lounge around under the sun, I make sure I stay in the shade mid-day, remain hydrated, and always wear a big hat and sunglasses to cover my hair and face.',
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
            data: '/spotlight/ayla/image_2.png',
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
            data: '/spotlight/ayla/image_3.png',
          },
          {
            id: 'image_3_content_2',
            type: TITLE,
            data: 'Calypso Deep Tan Oil Spray SP15',
          },
          {
            id: 'image_3_content_3',
            type: BUTTON,
            data: 'Know more',
            url: '/products/deep-tanning-monoi-tahiti?sku=CALT15MON',
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
            data: 'I love Calypso as a suncare brand because of its effective sun protection, its use of skin-friendly ingredients, all the positive reviews. It has high-quality products that are affordable but without compromising on quality.',
          },
          {
            id: 'paragraph_3_content_2',
            type: TEXT,
            data: 'I have to admit that I have been obsessed with the Calypso Monoi Tahiti Deep Tan Moisturising Tan Accelerator Oil Spray SPF15 for so long! ',
          },
          {
            id: 'paragraph_3_content_3',
            type: TEXT,
            data: 'Not only does it give me a rich, deep tan guaranteed, but it also keeps my skin hydrated and soothed with the power of MonoÏ de Tahiti -oh and it smells amazing! I always get compliments on how great my tan looks thanks to this product. ',
          },
          {
            id: 'paragraph_3_content_4',
            type: TEXT,
            data: "The water-resistant formula with Tyrosine strengthens my natural tan, while the blend of Coconut Oil and “Tiaré” flowers smooths and revitalizes my skin. It has decent sun protection, plus it's cruelty-free and vegan-friendly! What’s not to love?",
          },
        ],
        position: Column.COLUMN_2,
        order: 3,
      },
      {
        id: 'quote_2',
        type: QUOTE,
        content: [
          {
            id: 'quote_2_content_1',
            type: TEXT,
            data: 'Adopting healthy skincare habits now when you are still young is important to maintain a youthful and healthy complexion',
          },
        ],
        position: Column.COLUMN_2,
        order: 7,
      },
      {
        id: 'image_4',
        type: IMAGE,
        content: [
          {
            id: 'image_4_content_1',
            type: SOURCE,
            data: '/spotlight/ayla/image_4.png',
          },
        ],
        position: Column.COLUMN_2,
        order: 2,
      },
      {
        id: 'paragraph_4',
        type: PARAGRAPH,
        content: [
          {
            id: 'paragraph_4_content_1',
            type: TEXT,
            data: "Absolutely love the Calypso Once a Day Sun Protection Lotion SPF20. It’s one of the very best sun screens that I’ve used. It works really well for a no-fuss, once a day application. It comes in a handy spray, and gives me the perfect protection from harmful UV rays, and allows me to enjoy my time in the sun stress-free. It’s quick-absorbing too, water-resident and leaves my skin feeling light and non-greasy, even when I'm swimming or exercising. It’s my go-to for reliable sun protection all day long. With Calypso Once a Day, I can confidently soak up the sun without worrying about its harmful effects, a win-win for me!",
          },
        ],
        position: Column.COLUMN_2,
        order: 6,
      },
    ],
  },
  [spotlightNames.AALIYAH]: {
    header: {
      id: 'header',
      imageSrc: '/spotlight/aaliyah/header.png',
      alt: spotlightNames.AALIYAH,
      title:
        'I’ve learned to love my skin as much as I love the sun and prioritise skin protection.',
    },
    specifications: {
      id: 'specifications',
      photo: '/spotlight/aaliyah/avatar.png',
      alt: 'adele-sharman',
      name: 'Aaliyah',
      social_id: 'aaliyah.aisha',
      profession: 'Boutique Business Owner',
    },
    items: [
      {
        id: 'paragraph_1',
        type: PARAGRAPH,
        content: [
          {
            id: 'paragraph_1_content_1',
            type: TEXT,
            data: 'My name is Aaliyah and I am a 26-year-old island girl from Barbados. I live for fashion, adventure and the bliss of bright sunny days.',
          },
          {
            id: 'paragraph_1_content_2',
            type: TEXT,
            data: 'I own a small boutique in the heart of Bridgetown which is one of the major cities here in Barbados, I am a full-time supervisor at an aesthetic concept shop on the island’s west coast and I also create content part-time.',
          },
          {
            id: 'paragraph_1_content_3',
            type: TEXT,
            data: "It’s mostly sunny here in Barbados so wearing sunscreen daily is an absolute must. Sunscreen is definitely a part of my daily skincare routine and it's one product that I never forget to shove into my handbag.",
          },
          {
            id: 'paragraph_1_content_4',
            type: TEXT,
            data: 'I love outdoor activities like hiking and taking walks on the beach as well as a good beach party or daytime cruise.',
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
            data: "The skin is our armour, it's our largest and biggest organ, and it's what people see first when they see us.",
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
            data: '/spotlight/aaliyah/image_1.png',
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
            data: 'Skincare and suncare are super important especially whilst living in the tropics. I’ve occasionally suffered sunburn during our Crop Over Season and it was never a fun experience dealing with the tanning, the burning and the peeling that comes with sun damage.',
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
            data: '/spotlight/aaliyah/image_2.png',
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
            data: '/spotlight/aaliyah/image_3.png',
          },
          {
            id: 'image_3_content_2',
            type: TITLE,
            data: 'Calypso Glow Mist Protection Spray SPF30',
          },
          {
            id: 'image_3_content_3',
            type: BUTTON,
            data: 'Know more',
            url: '/products/glow-mist?sku=CALZ16',
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
            data: 'My all-time favourite Calypso product is the Glow Mist Protection Spray. Aside from the amazing smell, it makes my skin radiant and luminous while giving me a sun-kissed glow.',
          },
          {
            id: 'paragraph_3_content_2',
            type: TEXT,
            data: "I travel with most of my sunscreens in whatever handbag I'm using throughout the day so re-applying is no task. Most of my Calypso products are travel-sized and fit into most of my bags.",
          },
        ],
        position: Column.COLUMN_2,
        order: 3,
      },
      {
        id: 'quote_2',
        type: QUOTE,
        content: [
          {
            id: 'quote_2_content_1',
            type: TEXT,
            data: 'The idea of knowing that your skin is covered and protected makes outdoor activities and events way more fun.',
          },
        ],
        position: Column.COLUMN_2,
        order: 7,
      },
      {
        id: 'image_4',
        type: IMAGE,
        content: [
          {
            id: 'image_4_content_1',
            type: SOURCE,
            data: '/spotlight/aaliyah/image_4.png',
          },
        ],
        position: Column.COLUMN_2,
        order: 2,
      },
      {
        id: 'paragraph_4',
        type: PARAGRAPH,
        content: [
          {
            id: 'paragraph_4_content_1',
            type: TEXT,
            data: "I'd encourage young people to protect their skin every day, incorporate sun protection products into their regime and make skin protection mandatory. ",
          },
          {
            id: 'paragraph_4_content_2',
            type: TEXT,
            data: "I also suffer from adult acne so daily application of sunscreen helps with making sure that my dark marks and dark spots don't become darker due to sun exposure. All in all,",
          },
          {
            id: 'paragraph_4_content_3',
            type: TEXT,
            data: "Calypso skincare products have a long list of benefits for a young active female like myself and I'm sure many others can reap the rewards of protecting their skin.",
          },
        ],
        position: Column.COLUMN_2,
        order: 6,
      },
    ],
  },
}
