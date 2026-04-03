// scrapeProgress.js (Sanity Schema)
export default {
  name: 'scrapeProgress',
  title: 'Scrape Progress',
  type: 'document',
  fields: [
    {
      name: 'provider',
      title: 'Provider Name',
      type: 'string',
      description: 'The name of the manga provider (e.g., Toonily, MangaDex)',
      readOnly: true,
    },
    {
      name: 'lastPage',
      title: 'Last Processed Page',
      type: 'number',
      description: 'The last page number successfully processed for this provider',
      initialValue: 0,
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When the progress was last recorded',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    },
    {
      name: 'lastMangaId',
      title: 'Last Processed Manga ID',
      type: 'string',
      description: 'The ID of the last manga successfully processed (or queued)',
    },
    {
      name: 'lastMangaTitle',
      title: 'Last Processed Manga Title',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'provider',
      subtitle: 'lastPage',
      lastManga: 'lastMangaTitle',
    },
    prepare({title, subtitle, lastManga}) {
      return {
        title: `${title} Progress`,
        subtitle: `Page: ${subtitle} | Last: ${lastManga || 'None'}`,
      }
    },
  },
}
1