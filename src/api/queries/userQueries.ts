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

const SEARCH_USERS = gql`
  query searchUsers($query: String!, $page: Int!) {
    searchUsers(query: $query, page: $page) {
      next {
        page
      }
      prev {
        page
      }
      results {
        id
        username
      }
    }
  }
`

export { GET_USER, GET_SUGGESTIONS, SEARCH_USERS }
