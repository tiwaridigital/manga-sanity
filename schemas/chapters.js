export const chaptersSchema = {
  name: 'chapters',
  title: 'Chapters',
  type: 'document',
  icon: () => '📖',

  fields: [
    // Core identification
    {
      name: 'title',
      title: 'Chapter Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: Rule => Rule.required(),
    },

    // Reference to parent manga (improved)
    {
      name: 'manga',
      title: 'Manga',
      type: 'reference',
      to: [
        { type: 'singleMang' },
        { type: 'incompleteManga' },
      ],
      weak: true,
      validation: Rule => Rule.required(),
      description: 'The manga this chapter belongs to',
    },

    // Chapter numbering & ordering
    {
      name: 'chapterNumber',
      title: 'Chapter Number',
      type: 'number',
      description: 'Numeric value for sorting (e.g. 1, 2, 9.5, 100)',
      validation: Rule => Rule.required().precision(1).min(0),
    },

    // Progress & upload tracking (new & aligned with incompleteManga)
    {
      name: 'status',
      title: 'Upload Status',
      type: 'string',
      options: {
        list: [
          { title: 'Not Started', value: 'not_started' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Failed', value: 'failed' },
          { title: 'Skipped', value: 'skipped' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'not_started',
      validation: Rule => Rule.required(),
    },

    {
      name: 'pagesUploaded',
      title: 'Pages Uploaded',
      type: 'number',
      description: 'How many pages have been successfully uploaded',
      initialValue: 0,
      validation: Rule => Rule.integer().min(0),
    },

    {
      name: 'totalPages',
      title: 'Total Pages',
      type: 'number',
      description: 'Total number of pages detected in this chapter',
      validation: Rule => Rule.integer().min(0),
    },

    // Image data (improved structure + preview)
    {
      name: 'pages',
      title: 'Chapter Pages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapterPage',
          title: 'Page',
          fields: [
            {
              name: 'pageNumber',
              title: 'Page Number',
              type: 'number',
              validation: Rule => Rule.required().integer().min(1),
            },
            {
              name: 'src_origin',
              title: 'Original Source URL',
              type: 'url',
              validation: Rule => Rule.required().uri({ scheme: ['http', 'https'] }),
            },
            {
              name: 'hostedUrl',
              title: 'Hosted Image URL',
              type: 'url',
              description: 'URL after upload (Cloudflare, ImgBB, etc.)',
            },
            {
              name: 'deleteUrl',
              title: 'Delete URL',
              type: 'url',
              description: 'URL to delete the image if needed (ImgBB, etc.)',
            },
            {
              name: 'uploadStatus',
              title: 'Upload Status',
              type: 'string',
              options: {
                list: ['pending', 'uploading', 'completed', 'failed'],
              },
              initialValue: 'pending',
            },
            {
              name: 'errorMessage',
              title: 'Error (if failed)',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              page: 'pageNumber',
              url: 'src_origin',
              status: 'uploadStatus',
            },
            prepare({ page, url, status }) {
              const icons = {
                pending: '⏳',
                uploading: '⬆️',
                completed: '✅',
                failed: '❌',
              };
              return {
                title: `Page ${page || '?'}`,
                subtitle: `${icons[status] || ''} ${url ? new URL(url).hostname : 'No URL'}`,
              };
            },
          },
        },
      ],
    },

    // Navigation & manga-level info (kept but renamed for clarity)
    {
      name: 'hasNextChapter',
      title: 'Has Next Chapter',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'totalChaptersInManga',
      title: 'Total Chapters in Manga',
      type: 'number',
      description: 'Total chapters in the parent manga (for context)',
    },

    // Timestamps
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    },
  ],

  // Improved preview - more informative & visual
  preview: {
    select: {
      title: 'title',
      chNumber: 'chapterNumber',
      pagesCount: 'pages',
      uploaded: 'pagesUploaded',
      totalPages: 'totalPages',
      status: 'status',
      mangaTitle: 'manga.title',
    },
    prepare({ title, chNumber, pagesCount, uploaded, totalPages, status, mangaTitle }) {
      const pageCount = pagesCount?.length || 0;
      const progress = totalPages ? Math.round((uploaded / totalPages) * 100) : 0;
      const statusIcon = {
        not_started: '⏹️',
        in_progress: '⏳',
        completed: '✅',
        failed: '❌',
        skipped: '⏭️',
      }[status] || '⚠️';

      return {
        title: `${statusIcon} ${title || 'Untitled Chapter'}`,
        subtitle: `Ch ${chNumber || '?'} • ${uploaded || 0}/${totalPages || pageCount} pages (${progress}%) • ${mangaTitle || 'Unknown manga'}`,
      };
    },
  },

  // Useful orderings
  orderings: [
    {
      title: 'Chapter Number (Newest first)',
      name: 'chapterNumberDesc',
      by: [{ field: 'chapterNumber', direction: 'desc' }],
    },
    {
      title: 'Chapter Number (Oldest first)',
      name: 'chapterNumberAsc',
      by: [{ field: 'chapterNumber', direction: 'asc' }],
    },
    {
      title: 'Last Updated',
      name: 'lastUpdatedDesc',
      by: [{ field: 'lastUpdated', direction: 'desc' }],
    },
    {
      title: 'Upload Progress',
      name: 'progressDesc',
      by: [{ field: 'pagesUploaded', direction: 'desc' }],
    },
  ],
};