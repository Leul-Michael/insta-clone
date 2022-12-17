import { gql } from "@apollo/client"

const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      username
    }
  }
`

const REFRESH_TOKEN = gql`
  query refreshToken {
    refresh {
      token
      id
    }
  }
`

const FOLLOW_USER = gql`
  mutation followUser($userId: ID!) {
    followUser(userId: $userId) {
      id
    }
  }
`

const UPDATE_PROFILE = gql`
  mutation updateProfile($name: String!, $username: String!, $email: String!) {
    updateProfile(name: $name, username: $username, email: $email) {
      id
    }
  }
`

const CHANGE_PWD = gql`
  mutation changePassword($password: String!, $newPwd: String!) {
    changePassword(password: $password, newPwd: $newPwd) {
      id
    }
  }
`

export { REGISTER_USER, REFRESH_TOKEN, FOLLOW_USER, UPDATE_PROFILE, CHANGE_PWD }
