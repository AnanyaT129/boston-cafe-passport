import { Tag } from "./tag"

export type Cafe =  {
  id: string,
  name: string,
  address: Address,
  attributes: CafeAttributes
  website: string,
  image: string,
}

export type Address = {
  streetAddress: string
  geopoint: {
    latitude: number,
    longitude: number,
  }
}

export type CafeAttributes = {
  rating: number,
  price: number,
  hasInternet: boolean,
  hasOutlets: number,
  timeLimit: number,
  rules: [string],
  time: {
    opening: string,
    closing: string
  }
  tags: Tag
}