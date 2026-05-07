// cronHistory.js
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
      name: 'mangas_identified',
      title: 'Mangas Identified',
      type: 'number',
      description: 'Total manga queued for check in this session',
    },
    {
      name: 'mangas_updated',
      title: 'Mangas Updated',
      type: 'number',
      description: 'Number of manga that actually had new chapters',
    },
    {
      name: 'chapters_added',
      title: 'Chapters Added',
      type: 'number',
      description: 'Total numeric count of chapters created',
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
    mangas_updated: 0,
    chapters_added: 0,
  },
  orderings: [
    {
      title: 'Start Date, Newest',
      name: 'startedAtDesc',
      by: [{field: 'started_at', direction: 'desc'}],
    },
  ],
}
