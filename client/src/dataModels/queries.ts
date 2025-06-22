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

export const GET_USER = gql`
  query Query($email: String) {
    getUser(email: $email) {
      email
      name
    }
  }
`;

export const SET_NEW_USER = gql`
  mutation SetNewUser($name: String, $email: String) {
    setNewUser(name: $name, email: $email) {
      createdAt
      email
      name
    }
  }
`