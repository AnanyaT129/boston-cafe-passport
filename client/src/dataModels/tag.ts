enum cuisineTags {
  "japanese",
  "italian",
  "french",
  "korean",
  "chinese",
  "american",
  "brazillian",
  "local"
}

enum vibeTags {
  "cozy",
  "wfh",
  "modern",
  "historical",
}

export type Tag = {
  cuisineTags: [cuisineTags]
  vibeTags: [vibeTags]
}