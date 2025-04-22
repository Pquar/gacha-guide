import type { Document, MDX } from 'contentlayer2/core'

export type SpotifyNowPlayingData = {
  isPlaying: boolean
  songUrl?: string
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
}

export type Artifact = {
  id: string
  type: 'Orange' | 'Red'
  name: string
  description?: { hab: string; name: string }[]
  imgSrc: string
  imgSrc_hab: string
  links?: { title: string; url: string }
}

export type Heroes = {
  id: string
  title: string
  name: string
  link: string
  launch_date: string
  faction: string
  role: string
  hero_image_url: string
  hero_small_image_url: string
  hero_medium_image_url: string
  hero_large_image_url: string
  hero_description: string
  rerun: string
  rating: number
  tier: TierType
  hero_id: string
  review: string
  hero_published: string
  contentSnippet: string
  abilities: {
    name: string
    type: string
    icon: string
    description: string
    image: string
    levels: {
      name: string
      description: string
    }[]
  }[]
  equip: {
    name: string
    description: string
    recommended: {
      name: string
      image: string
      type: TypeBuild
    }[]
  }
  startmark: {
    name: string
    description: string
    recommended: {
      name: string
      image: string
      type: TypeBuild
    }[]
  }
  badge: {
    name: string
    description: string
    recommended: {
      name: string
      image: string
      type: TypeBuild
    }[]
  }
  artefact: {
    name: string
    description: string
    recommended: {
      name: string
      image: string
      type: TypeBuild
    }[]
  }
}
export type TypeBuild = 'Must Have' | 'Recommend' | 'Opc.' | null
export type TierType = 'all' | 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C'

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
