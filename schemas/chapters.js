export default {
  name: 'chapters',
  title: 'Chapters',
  type: 'document',
  fields: [
    {
      name: 'slug',
      type: 'string',
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'url',
      type: 'string',
    },
    {
      name: 'data',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              type: 'string',
            },
            {
              name: 'src_origin',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}
