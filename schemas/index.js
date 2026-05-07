// import chapters from './chapters'
// import incompleteManga from './incompleteManga'

import {chaptersSchema} from './chapters'
import {incompleteMangaSchema} from './incompleteManga'
import {singleMangSchema} from './singleMang'
import {uploadProgressSchema} from './uploadProgress'
import scrapeProgress from './scrapeProgress'
import cronHistory from './cronHistory'

export const schemaTypes = [
  chaptersSchema,
  incompleteMangaSchema,
  uploadProgressSchema,
  singleMangSchema,
  scrapeProgress,
  cronHistory,
]
