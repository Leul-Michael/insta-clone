import { gql } from "@apollo/client"

const ADD_USER_POST = gql`
  mutation addPost($caption: String!, $picture: String!) {
    addPost(caption: $caption, picture: $picture) {
      id
      caption
      picture
      createdAt
      user {
        id
        username
      }
      comments {
        id
        comment
        user {
          username
          id
        }
      }
      likes {
        id
        username
      }
    }
  }
`

const ADD_COMMENT = gql`
  mutation addComment($post: ID!, $comment: String!) {
    commentPost(post: $post, comment: $comment) {
      id
      comments {
        id
        comment
        user {
          username
          id
        }
      }
    }
  }
`

const LIKE_POST = gql`
  mutation likePost($id: ID!, $user: ID!) {
    likePost(id: $id, user: $user) {
      id
      likes {
        id
        username
      }
    }
  }
`

const REMOVE_POST = gql`
  mutation removePost($id: ID!) {
    removePost(id: $id) {
      id
    }
  }
`

export { ADD_USER_POST, ADD_COMMENT, LIKE_POST, REMOVE_POST }
