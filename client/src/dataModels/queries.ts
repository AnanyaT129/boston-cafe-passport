import { gql } from "@apollo/client";

// Define the GraphQL query
export const GET_ALL_CAFES = gql`
  query ExampleQuery {
    getAllCafes {
      name
      address {
        geopoint {
          longitude
          latitude
        }
        streetAddress
      }
      attributes {
        rating
        price
        hasInternet
        hasOutlets
        timeLimit
        rules
        time {
          opening
          closing
        }
        tags {
          cuisineTags
          vibeTags
        }
      }
      id
      image
      website
    }
  }
`;