import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Відгук',
  type: 'document',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Текст відгуку',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'photo',
      text: 'text',
    },
    prepare({media, text}) {
      const trimmed = text?.length > 20 ? text.slice(0, 20) + '…' : text
      return {
        title: trimmed,
        media,
      }
    },
  },
})
