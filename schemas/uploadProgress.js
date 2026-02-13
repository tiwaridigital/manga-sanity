export const uploadProgressSchema = {
  name: 'uploadProgress',
  title: 'Upload Progress',
  type: 'document',
  icon: () => '📊',
  fields: [
    {
      name: 'srcUrl',
      title: 'Source URL',
      type: 'string',
      description: 'Original manga URL from the source',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mangaId',
      title: 'Manga ID',
      type: 'string',
      description: 'Reference to created manga (if exists)',
    },
    {
      name: 'mangaTitle',
      title: 'Manga Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mangaSlug',
      title: 'Manga Slug',
      type: 'slug',
    },
    {
      name: 'mangaAuthor',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'mangaArtist',
      title: 'Artist',
      type: 'string',
    },
    {
      name: 'currentChapterIdx',
      title: 'Current Chapter Index',
      type: 'number',
      description: 'Currently uploading chapter (1-based)',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'totalChapters',
      title: 'Total Chapters',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'completedChapters',
      title: 'Completed Chapters',
      type: 'number',
      description: 'Number of fully uploaded chapters',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'currentImageIdx',
      title: 'Current Image Index',
      type: 'number',
      description: 'Last uploaded image in current chapter (1-based)',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'totalImagesInCurrentChapter',
      title: 'Total Images in Current Chapter',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'uploadedImagesInCurrentChapter',
      title: 'Uploaded Images',
      type: 'array',
      description: 'Images uploaded in current chapter',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Image ID',
              type: 'number',
            },
            {
              name: 'src_origin',
              title: 'Source URL',
              type: 'url',
            },
            {
              name: 'delete_url',
              title: 'Delete URL',
              type: 'url',
              description: 'URL to delete image (for imgBB)',
            },
          ],
          preview: {
            select: {
              id: 'id',
              url: 'src_origin',
            },
            prepare({id, url}) {
              return {
                title: `Image ${id}`,
                subtitle: url,
              }
            },
          },
        },
      ],
    },
    {
      name: 'allChaptersImages',
      title: 'All Chapters Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'chapterIndex',
              title: 'Chapter Index',
              type: 'number',
            },
            {
              name: 'totalImages',
              title: 'Total Images',
              type: 'number',
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'id', type: 'number'},
                    {name: 'src_origin', type: 'string'},
                    {name: 'delete_url', type: 'string'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'Failed', value: 'failed'},
        ],
        layout: 'radio',
      },
      initialValue: 'in_progress',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'startedAt',
      title: 'Started At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'completedAt',
      title: 'Completed At',
      type: 'datetime',
    },
    {
      name: 'firstCreated',
      title: 'First Created',
      type: 'datetime',
    },
    {
      name: 'failedAttempts',
      title: 'Failed Attempts',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'lastFailedAt',
      title: 'Last Failed At',
      type: 'datetime',
    },
    {
      name: 'lastError',
      title: 'Last Error',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'mangaTitle',
      currentChapter: 'currentChapterIdx',
      totalChapters: 'totalChapters',
      status: 'status',
      lastUpdated: 'lastUpdated',
    },
    prepare({title, currentChapter, totalChapters, status, lastUpdated}) {
      const progress = (((currentChapter - 1) / totalChapters) * 100).toFixed(1)
      const statusIcon = status === 'completed' ? '✅' : status === 'failed' ? '❌' : '⏳'

      return {
        title: `${statusIcon} ${title}`,
        subtitle: `Ch ${currentChapter}/${totalChapters} (${progress}%) • ${new Date(lastUpdated).toLocaleString()}`,
      }
    },
  },
  orderings: [
    {
      title: 'Last Updated',
      name: 'lastUpdatedDesc',
      by: [{field: 'lastUpdated', direction: 'desc'}],
    },
    {
      title: 'Progress',
      name: 'progressAsc',
      by: [{field: 'currentChapterIdx', direction: 'asc'}],
    },
  ],
}
