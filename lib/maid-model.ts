export type MaidLanguage = {
  name: string
  level: string
}

export type MaidRecord = {
  _id?: string
  name: string
  nationality: string
  country: string
  experience: string
  languages: MaidLanguage[]
  skills: string[]
  workType: string
  description: string
  imageIds: string[]
  imageNames: string[]
  videoId?: string
  videoName?: string
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}
