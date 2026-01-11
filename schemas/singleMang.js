export const singleMangSchema = {
  name: 'singleMang',
  title: 'Manga',
  type: 'document',
  icon: () => '📚',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alternativeName',
      title: 'Alternative Name',
      type: 'string',
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'url',
    },
    {
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Completed', value: 'completed'},
          {title: 'Hiatus', value: 'hiatus'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    },
    {
      name: 'src',
      title: 'Source',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(10),
    },
    {
      name: 'dates',
      title: 'Dates',
      type: 'object',
      fields: [
        {
          name: 'uploadedDate',
          title: 'Uploaded Date',
          type: 'datetime',
        },
        {
          name: 'updatedDate',
          title: 'Updated Date',
          type: 'datetime',
        },
      ],
    },
    {
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      coverImage: 'coverImage',
      status: 'status',
      rating: 'rating',
    },
    prepare({title, author, coverImage, status, rating}) {
      return {
        title: title,
        subtitle: `${author || 'Unknown'} • ${status || 'Unknown'} • ⭐ ${rating || 'N/A'}`,
        media: coverImage ? {url: coverImage} : undefined,
      }
    },
  },
}
