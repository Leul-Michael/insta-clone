import { gql } from "@apollo/client"

const GET_POSTS = gql`
  query getPosts {
    posts {
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
        username
        id
      }
    }
  }
`

const GET_POST = gql`
  query getPost($id: ID!) {
    userPost(postId: $id) {
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
        username
        id
      }
    }
  }
`

const GET_USER_POSTS = gql`
  query getPosts($id: ID!) {
    userPosts(userId: $id) {
      id
      picture
    }
  }
`

export { GET_POSTS, GET_USER_POSTS, GET_POST }
