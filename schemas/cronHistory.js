export default {
  name: 'cron_history',
  title: 'Cron History',
  type: 'document',
  fields: [
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Running', value: 'running'},
          {title: 'Completed', value: 'completed'},
          {title: 'Failed', value: 'failed'},
        ],
      },
    },
    {
      name: 'mode',
      title: 'Mode',
      type: 'string',
      description: 'Cron mode used for this run',
    },
    {
      name: 'source_filter',
      title: 'Source Filter',
      type: 'string',
      description: 'Legacy single source filter, if provided',
    },
    {
      name: 'provider_filter',
      title: 'Provider Filter',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Provider list used to filter manga for this run',
    },
    {
      name: 'mangas_identified',
      title: 'Mangas Identified',
      type: 'number',
      description: 'Total manga queued for check in this session',
    },
    {
      name: 'mangas_processed',
      title: 'Mangas Processed',
      type: 'number',
      description: 'How many manga jobs have finished processing',
    },
    {
      name: 'mangas_succeeded',
      title: 'Mangas Succeeded',
      type: 'number',
      description: 'How many manga jobs completed successfully',
    },
    {
      name: 'mangas_failed',
      title: 'Mangas Failed',
      type: 'number',
      description: 'How many manga jobs failed',
    },
    {
      name: 'mangas_succeeded_ids',
      title: 'Succeeded Manga IDs',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of manga IDs that completed successfully',
    },
    {
      name: 'mangas_failed_ids',
      title: 'Failed Manga IDs',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of manga IDs that failed',
    },
    {
      name: 'mangas_updated',
      title: 'Mangas Updated',
      type: 'number',
      description: 'How many manga actually had new chapters',
    },
    {
      name: 'chapters_total',
      title: 'Total Chapters',
      type: 'number',
      description: 'Total chapters found across all manga in this run',
    },
    {
      name: 'chapters_done',
      title: 'Chapters Done',
      type: 'number',
      description: 'How many chapters were successfully created',
    },
    {
      name: 'chapters_left',
      title: 'Chapters Left',
      type: 'number',
      description: 'How many chapters remain unfinished',
    },
    {
      name: 'last_manga_id',
      title: 'Last Manga ID',
      type: 'string',
      description: 'Last manga processed by this cron run',
    },
    {
      name: 'last_manga_slug',
      title: 'Last Manga Slug',
      type: 'string',
      description: 'Slug of the last manga processed',
    },
    {
      name: 'last_chapter_id',
      title: 'Last Chapter ID',
      type: 'string',
      description: 'ID of the last chapter created',
    },
    {
      name: 'last_chapter_slug',
      title: 'Last Chapter Slug',
      type: 'string',
      description: 'Slug of the last chapter created',
    },
    {
      name: 'last_error',
      title: 'Last Error',
      type: 'text',
      description: 'Most recent error message if a job failed',
    },
    {
      name: 'started_at',
      title: 'Started At',
      type: 'datetime',
    },
    {
      name: 'finished_at',
      title: 'Finished At',
      type: 'datetime',
    },
    {
      name: 'updated_at',
      title: 'Last Updated At',
      type: 'datetime',
    },
  ],
  initialValue: {
    status: 'running',
    mode: 'full',
    mangas_identified: 0,
    mangas_processed: 0,
    mangas_succeeded: 0,
    mangas_failed: 0,
    mangas_succeeded_ids: [],
    mangas_failed_ids: [],
    mangas_updated: 0,
    chapters_total: 0,
    chapters_done: 0,
    chapters_left: 0,
  },
  preview: {
    select: {
      status: 'status',
      mode: 'mode',
      identifiedCount: 'mangas_identified',
      succeededCount: 'mangas_succeeded',
      failedCount: 'mangas_failed',
      succeededIds: 'mangas_succeeded_ids',
      failedIds: 'mangas_failed_ids',
      startedAt: 'started_at',
    },
    prepare(selection) {
      const {
        status,
        mode,
        identifiedCount = 0,
        succeededCount = 0,
        failedCount = 0,
        succeededIds = [],
        failedIds = [],
        startedAt,
      } = selection

      const startedLabel = startedAt ? new Date(startedAt).toLocaleString() : 'No start time'

      return {
        title: `Cron run - ${startedLabel}`,
        subtitle: [
          `Status: ${status || 'unknown'}`,
          `Mode: ${mode || 'unknown'}`,
          `Identified: ${identifiedCount}`,
          `Succeeded: ${succeededCount} [${succeededIds.length} IDs]`,
          `Failed: ${failedCount} [${failedIds.length} IDs]`,
        ].join(' | '),
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, Newest',
      name: 'startedAtDesc',
      by: [{field: 'started_at', direction: 'desc'}],
    },
  ],
}
