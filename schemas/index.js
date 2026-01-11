// import chapters from './chapters'
// import incompleteManga from './incompleteManga'

import { chaptersSchema } from "./chapters"
import { incompleteMangaSchema } from "./incompleteManga"
import { singleMangSchema } from "./singleMang"
import { uploadProgressSchema } from "./uploadProgress"

export const schemaTypes = [chaptersSchema, incompleteMangaSchema, uploadProgressSchema, singleMangSchema]
