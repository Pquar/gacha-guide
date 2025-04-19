import type { Document, MDX } from 'contentlayer2/core'

export type SpotifyNowPlayingData = {
  isPlaying: boolean
  songUrl?: string
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
}

export type Project = {
  type: 'work' | 'self'
  title: string
  description?: string
  imgSrc: string
  url?: string
  repo?: string
  builtWith: string[]
  links?: { title: string; url: string }[]
}

export type Heroes = {
  title: string
  name: string
  link: string
  launch_date: string
  faction: string
  ability: string
  ab_0_path: string
  ab_0_name: string
  ab_0_lv1: string
  ab_0_lv2: string
  ab_0_lv3: string
  ab_0_aw: string
  ab_1_path: string
  ab_1_name: string
  ab_1_lv1: string
  ab_1_lv2: string
  ab_1_lv3: string
  ab_1_aw: string
  ab_2_path: string
  ab_2_name: string
  ab_2_lv1: string
  ab_2_lv2: string
  ab_2_lv3: string
  ab_2_aw: string
  ab_3_path: string
  ab_3_name: string
  ab_3_lv1: string
  ab_3_lv2: string
  ab_3_lv3: string
  ab_3_aw: string
  hab_description: {
    name: string
    description: string
  }[]
  hero_image_url: string
  hero_small_image_url: string
  hero_medium_image_url: string
  hero_large_image_url: string
  hero_description: string
  
  rating: string
  date_att: string
  review: string
  hero_published: string
  contentSnippet: string
}

export type ImdbMovie = {
  const: string
  your_rating: string
  date_rated: string
  title: string
  original_title: string
  url: string
  title_type: string
  imdb_rating: string
  runtime: string
  year: string
  genres: string
  num_votes: string
  release_date: string
  directors: string
  // Additional fields from the OMDB API
  actors: string
  plot: string
  poster: string
  language: string
  country: string
  awards: string
  box_office: string
  total_seasons: string
  ratings: Array<{ source: string; value: string }>
}

export type OmdbMovie = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Array<{ Source: string; Value: string }>
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  totalSeasons: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface ViewApiResponse {
  data?: {
    total: string
  }
}

export type GithubRepository = {
  stargazerCount: number
  description: string
  homepageUrl: string
  languages: {
    color: string
    name: string
  }[]
  name: string
  nameWithOwner: string
  url: string
  forkCount: number
  repositoryTopics: string[]
  lastCommit?: GithubRepositoryCommit
}

// https://docs.github.com/en/graphql/reference/enums#statusstate
export type CommitState = 'SUCCESS' | 'PENDING' | 'FAILURE' | 'ERROR' | 'EXPECTED'

export type GithubRepositoryCommit = {
  id: string
  abbreviatedOid: string
  committedDate: string
  message: string
  url: string
  status: {
    state: CommitState
  }
}

export type MDXDocument = Document & { body: MDX }
export type MDXDocumentDate = MDXDocument & {
  date: string
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>
