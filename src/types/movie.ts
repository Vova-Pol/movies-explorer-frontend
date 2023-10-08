export interface IMovie {
  id: number;
  nameRU: string;
  nameEN: string;
  director: string;
  country: string;
  year: string;
  duration: number;
  description: string;
  trailerLink: string;
  created_at: Date;
  updated_at: Date;
  image: IImage;
}

export interface ISavedMovie {
  id: number;
  nameRU: string;
  nameEN: string;
  director: string;
  country: string;
  year: string;
  duration: number;
  description: string;
  trailerLink: string;
  created_at: Date;
  updated_at: Date;
  image: string;
}

interface IImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: IFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: null;
  created_at: Date;
  updated_at: Date;
}

interface IFormats {
  thumbnail: ISmall;
  small: ISmall;
}

interface ISmall {
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}
