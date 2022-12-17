import { InMemoryCache, HttpLink, ApolloLink } from "@apollo/client"
import { store } from "../app/store"

export const cache = new InMemoryCache({
  typePolicies: {
    Post: {
      fields: {
        likes: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
    Query: {
      fields: {
        posts: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})

export const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || "http://localhost:5000/graphql",
  credentials: "include",
})

export const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = store.getState().user.token
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  })

  return forward(operation)
})
