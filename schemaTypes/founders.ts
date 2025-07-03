import {defineField, defineType, StringRule, ArrayRule, ImageRule} from 'sanity'

export default defineType({
  name: 'founders',
  title: 'Засновники',
  type: 'document',
  fields: [
    defineField({
      name: 'foundersImage',
      title: 'Зображення засновників',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Альтернативний текст',
          type: 'string',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule: ImageRule) => rule.required(),
    }),
    defineField({
      name: 'foundersNameLeft',
      title: "Ім'я лівого",
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'foundersLeftInstagram',
      title: 'Instagram лівого засновника',
      type: 'string',
      validation: (rule: StringRule) =>
        rule
          .required()
          .custom((val) =>
            val?.startsWith('@') ? true : 'Instagram має починатися з символу "@"',
          ),
    }),
    defineField({
      name: 'foundersNameRight',
      title: "Ім'я правого",
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'foundersRightInstagram',
      title: 'Instagram правого засновника',
      type: 'string',
      validation: (rule: StringRule) =>
        rule
          .required()
          .custom((val) =>
            val?.startsWith('@') ? true : 'Instagram має починатися з символу "@"',
          ),
    }),
    defineField({
      name: 'foundersAchievementsList',
      title: 'Досягнення',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule: ArrayRule<string>) =>
        rule.required().min(1).error('Потрібно додати щонайменше одне досягнення'),
    }),
  ],
})
