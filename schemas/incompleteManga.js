export default {
  name: 'incompleteManga',
  title: 'Incomplete Manga',
  type: 'document',
  fields: [
    {
      name: 'id',
      type: 'string',
    },
    {
      name: 'srcUrl',
      type: 'string',
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'alternativeName',
      type: 'string',
    },
    {
      name: 'completedChapters',
      type: 'number',
    },
    {
      name: 'totalChapters',
      type: 'number',
    },
    {
      name: 'slug',
      type: 'string',
    },
    {
      name: 'artist',
      type: 'string',
    },
    {
      name: 'author',
      type: 'string',
    },
    {
      name: 'coverImage',
      type: 'string',
    },
    {
      name: 'status',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
    },
    {
      name: 'src',
      type: 'string',
    },
    {
      name: 'createdAt',
      type: 'string',
    },
    {
      name: 'rating',
      type: 'string',
    },
    {
      name: 'genres',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'chapters',
      type: 'array',
      of: [
        {
          type: 'object',
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
              name: 'last_update',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'dates',
      type: 'object',
      fields: [
        {
          name: 'updatedDate',
          type: 'string',
        },
        {
          name: 'uploadedDate',
          type: 'string',
        },
      ],
    },
  ],
}
