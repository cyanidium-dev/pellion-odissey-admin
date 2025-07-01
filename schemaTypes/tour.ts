import {
  defineField,
  defineType,
  StringRule,
  SlugRule,
  NumberRule,
  ObjectRule,
  ArrayRule,
  ImageRule,
} from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Тур',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва туру для картки товару на сторінці всіх турів',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'tourPageTitle',
      title: 'Заголовок туру для сторінки окремого туру (складається з трьох частин)',
      type: 'object',
      fields: [
        defineField({
          name: 'part1',
          title: 'Частина 1',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'part2',
          title: 'Частина 2',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'part3',
          title: 'Частина 3',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
      ],
      validation: (rule: ObjectRule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Слаг',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: SlugRule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Короткий опис',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Ціна від (в доларах США)',
      type: 'number',
      validation: (rule: NumberRule) => rule.required().min(0).error('Ціна не може бути від’ємною'),
    }),

    defineField({
      name: 'duration',
      title: 'Тривалість',
      type: 'object',
      fields: [
        defineField({
          name: 'days',
          title: 'Кількість днів',
          type: 'number',
          validation: (rule: NumberRule) =>
            rule.required().min(1).error('Кількість днів не може бути менше 1'),
        }),
        defineField({
          name: 'nights',
          title: 'Кількість ночей',
          type: 'number',
          validation: (rule: NumberRule) =>
            rule.required().min(0).error('Кількість ночей не може бути менше 0'),
        }),
      ],
      validation: (rule: ObjectRule) => rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Розмір групи',
      description: 'Вкажіть максимальну кількість людей',
      type: 'number',
      validation: (rule: NumberRule) =>
        rule.required().min(1).error('Кількість людей не може бути менше 1'),
    }),
    defineField({
      name: 'difficulty',
      title: 'Складність туру',
      type: 'string',
      options: {
        list: [
          {title: 'Низкая', value: 'низкая'},
          {title: 'Средняя', value: 'средняя'},
          {title: 'Высокая', value: 'высокая'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'included',
      title: 'Що входить у вартість',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule: ArrayRule<string>) => rule.required().min(1),
    }),
    defineField({
      name: 'program',
      title: 'Програма туру',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'day',
          title: 'День',
          fields: [
            defineField({
              name: 'dayNumber',
              title: 'Номер дня',
              type: 'number',
              validation: (rule: NumberRule) => rule.required().min(1),
            }),
            defineField({
              name: 'title',
              title: 'Назва',
              type: 'string',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Короткий опис',
              type: 'string',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'activities',
              title: 'Активності',
              type: 'array',
              of: [{type: 'string'}],
              validation: (rule: ArrayRule<string>) => rule.required(),
            }),
            defineField({
              name: 'accommodation',
              title: 'Проживання',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              dayNumber: 'dayNumber',
            },
            prepare({title, dayNumber}) {
              return {
                title: `День ${dayNumber}. ${title}`,
              }
            },
          },
        }),
      ],
      validation: (rule: ArrayRule<unknown>) => rule.required().min(1),
    }),

    defineField({
      name: 'gallery',
      title: 'Галерея зображень',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Альтернативний текст',
              type: 'string',
            },
          ],
        },
      ],
      validation: (rule: ArrayRule<unknown>) => rule.required().min(1),
    }),
    defineField({
      name: 'reviews',
      title: 'Відгуки',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'review',
          title: 'Відгук',
          fields: [
            defineField({
              name: 'photo',
              title: 'Фото',
              type: 'image',
              options: {hotspot: true},
              fields: [
                {
                  name: 'alt',
                  title: 'Альтернативний текст',
                  type: 'string',
                },
              ],
              validation: (rule: ImageRule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: "Ім'я",
              type: 'string',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'instagram',
              title: 'Instagram',
              type: 'string',
              validation: (rule: StringRule) =>
                rule
                  .required()
                  .custom((value) =>
                    value && value.startsWith('@')
                      ? true
                      : 'Instagram має починатися з символу "@"',
                  ),
            }),
            defineField({
              name: 'text',
              title: 'Текст відгуку',
              type: 'string',
              validation: (rule: StringRule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'tourDates',
      title: 'Дати туру',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'dateRange',
          title: 'Період',
          fields: [
            defineField({
              name: 'startDate',
              title: 'Дата початку',
              type: 'date',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'endDate',
              title: 'Дата завершення',
              type: 'date',
              validation: (rule) =>
                rule.required().custom((endDate, context) => {
                  const parent = context.parent as {startDate?: string}
                  if (!endDate || !parent?.startDate) return true
                  return endDate >= parent.startDate
                    ? true
                    : 'Дата завершення повинна бути не раніше дати початку'
                }),
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'faqItem',
          title: 'Питання та відповідь',
          fields: [
            defineField({
              name: 'question',
              title: 'Питання',
              type: 'string',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Відповідь',
              type: 'string',
              validation: (rule: StringRule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'hashtags',
      title: 'Хештеги',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule: ArrayRule<string>) => rule.unique().min(0),
    }),
    defineField({
      name: 'season',
      title: 'Сезон',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Зима', value: 'зима'},
              {title: 'Весна', value: 'весна'},
              {title: 'Лето', value: 'лето'},
              {title: 'Осень', value: 'осень'},
            ],
          },
        },
      ],
      validation: (rule) => rule.required().min(1).error('Потрібно вибрати щонайменше один сезон'),
    }),
    defineField({
      name: 'tourType',
      title: 'Тип тура',
      type: 'string',
      options: {
        list: [
          {title: 'Групповые туры', value: 'групповые туры'},
          {title: 'VIP туры', value: 'vip туры'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'gallery.0',
    },
    prepare({title, media}) {
      return {
        title,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'За датою створення (спочатку нові)',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})
