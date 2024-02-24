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
      type: 'reference',
      to: [{type: 'incompleteManga', id: 'url'}], // Reference based on 'url' field
      weak: true,
    },
    {
      name: 'hasNextEp',
      type: 'boolean',
      initialValue: 'true',
    },
    {
      name: 'totalEpisodes',
      type: 'number',
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
            {
              name: 'delete_url',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}
