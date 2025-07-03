import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'report',
  title: 'Репортаж',
  type: 'document',
  fields: [
    defineField({
      name: 'country',
      title: 'Країна',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locations',
      title: 'Місцевості, які відвідуються',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Підзаголовок',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Слаг',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Короткий опис',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
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
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'gallery.0.asset',
    },
    prepare({title, media}) {
      return {
        title,
        media,
      }
    },
  },
})
