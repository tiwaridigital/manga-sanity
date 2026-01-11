export const incompleteMangaSchema = {
  name: 'incompleteManga',
  title: 'Incomplete Manga',
  type: 'document',
  icon: () => '⚠️',

  fields: [
    // Core identification fields (kept as-is)
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'id',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
      options: {source: 'title', maxLength: 200},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alternativeName',
      title: 'Alternative Name',
      type: 'string',
    },

    // Author/Artist (kept)
    {name: 'artist', title: 'Artist', type: 'string'},
    {name: 'author', title: 'Author', type: 'string'},

    // Visual & metadata (kept)
    {name: 'coverImage', title: 'Cover Image', type: 'url'},
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
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    },

    // Source information (kept)
    {
      name: 'src',
      title: 'Source',
      type: 'string',
      description: 'Source platform (e.g., asuratoon, mangadex)',
    },
    {
      name: 'srcUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Original manga URL from the source',
      validation: (Rule) => Rule.required(),
    },

    // Chapter metadata (kept)
    {
      name: 'chapters',
      title: 'Chapter Metadata',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string'},
            {name: 'slug', type: 'string'},
            {name: 'last_update', type: 'datetime'},
          ],
        },
      ],
    },

    // ───────────────────────────────────────────────
    // NEW / IMPROVED Progress Tracking Fields
    // Aligned with uploadProgressSchema
    // ───────────────────────────────────────────────

    {
      name: 'totalChapters',
      title: 'Total Chapters',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
    },
    {
      name: 'completedChapters',
      title: 'Completed Chapters',
      type: 'number',
      description: 'Number of chapters fully uploaded',
      validation: (Rule) => Rule.required().integer().min(0),
    },
    {
      name: 'currentChapterIdx',
      title: 'Current Chapter Index',
      type: 'number',
      description: 'Currently being processed/uploaded (1-based)',
      validation: (Rule) => Rule.integer().min(1),
    },
    {
      name: 'currentImageIdx',
      title: 'Current Image Index',
      type: 'number',
      description: 'Last successfully uploaded image in current chapter (1-based)',
      validation: (Rule) => Rule.integer().min(0),
    },
    {
      name: 'totalImagesInCurrentChapter',
      title: 'Total Images in Current Chapter',
      type: 'number',
      validation: (Rule) => Rule.integer().min(0),
    },

    // Status & Lifecycle (improved + aligned)
    {
      name: 'uploadStatus',
      title: 'Upload Status',
      type: 'string',
      options: {
        list: [
          {title: 'Not Started', value: 'not_started'},
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Paused', value: 'paused'},
          {title: 'Completed', value: 'completed'},
          {title: 'Failed', value: 'failed'},
        ],
        layout: 'radio',
      },
      initialValue: 'not_started',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'failedAttempts',
      title: 'Failed Attempts',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    },
    {
      name: 'lastFailedAt',
      title: 'Last Failed At',
      type: 'datetime',
    },
    {
      name: 'lastError',
      title: 'Last Error Message',
      type: 'text',
      rows: 3,
    },

    // Timestamps (kept + added more useful ones)
    {
      name: 'startedAt',
      title: 'Upload Started At',
      type: 'datetime',
    },
    {
      name: 'completedAt',
      title: 'Upload Completed At',
      type: 'datetime',
    },
    {
      name: 'createdAt',
      title: 'First Created',
      type: 'datetime',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },

    // Migration / Publishing flags (kept)
    {
      name: 'isMovedToHasura',
      title: 'Moved to Hasura',
      type: 'boolean',
      description: 'Whether this has been migrated to Hasura',
      initialValue: false,
    },
    {
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'uploadComplete',
      title: 'Upload Complete',
      type: 'boolean',
      description: 'All chapters uploaded successfully',
      initialValue: false,
    },
  ],

  // Improved preview - more informative
  preview: {
    select: {
      title: 'title',
      completed: 'completedChapters',
      total: 'totalChapters',
      currentCh: 'currentChapterIdx',
      status: 'uploadStatus',
      cover: 'coverImage',
      lastUpdated: 'lastUpdated',
    },
    prepare({title, completed, total, currentCh, status, cover, lastUpdated}) {
      const progress = total ? ((completed / total) * 100).toFixed(0) : 0
      const iconMap = {
        not_started: '⏹️',
        in_progress: '⏳',
        paused: '⏸️',
        completed: '✅',
        failed: '❌',
      }
      const icon = iconMap[status] || '⚠️'

      const subtitleParts = []
      if (total) subtitleParts.push(`${completed}/${total} (${progress}%)`)
      if (currentCh) subtitleParts.push(`Current: Ch ${currentCh}`)
      subtitleParts.push(new Date(lastUpdated).toLocaleDateString())

      return {
        title: `${icon} ${title || 'Untitled Manga'}`,
        subtitle: subtitleParts.join(' • '),
        media: cover ? {url: cover} : undefined,
      }
    },
  },

  orderings: [
    {
      title: 'Last Updated (Newest)',
      name: 'lastUpdatedDesc',
      by: [{field: 'lastUpdated', direction: 'desc'}],
    },
    {
      title: 'Progress (Least → Most)',
      name: 'progressAsc',
      by: [{field: 'completedChapters', direction: 'asc'}],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{field: 'uploadStatus', direction: 'asc'}],
    },
  ],
}
