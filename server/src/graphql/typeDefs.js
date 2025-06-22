const {gql} = require("apollo-server");

const typeDefs = gql`
type Query {
  getAllCafes(
    name: String
    distance: Int
    rating: Int
    price: String
    hasInternet: Boolean
    hasOutlets: Int
    timeLimit: Int
    rules: [String]
    time: TimeInput
    tags: TagInput
  ): [Cafe!]!

  getUser(
    email: String
  ): User
}

type Mutation {
  setNewUser(
    name: String,
    email: String
  ): User
}

type Cafe {
  id: String
  name: String
  address: Address
  attributes: CafeAttributes
  website: String
  image: String
}

type Address {
  streetAddress: String
  geopoint: Geopoint
}

type Geopoint {
  latitude: Float
  longitude: Float
}

type CafeAttributes {
  rating: Int
  price: String
  hasInternet: Boolean
  hasOutlets: Int
  timeLimit: Int
  rules: [String]
  time: Time
  tags: Tag
}

type Tag {
  cuisineTags: [String]
  vibeTags: [String]
}

type Time {
  opening: String
  closing: String
}

type User {
  name: String
  email: String
  createdAt: String
}

input TimeInput {
  opening: String
  closing: String
}

input TagInput {
  cuisineTags: [String]
  vibeTags: [String]
}
`;

module.exports = {typeDefs};