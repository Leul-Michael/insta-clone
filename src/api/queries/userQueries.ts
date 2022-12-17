import { gql } from "@apollo/client"

const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      name
      email
      followers {
        id
        username
      }
      following {
        id
        username
      }
    }
  }
`

const GET_SUGGESTIONS = gql`
  query userSuggestions {
    userSuggestions {
      id
      username
      followers {
        id
        username
      }
    }
  }
`

export { GET_USER, GET_SUGGESTIONS }
