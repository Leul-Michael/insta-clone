import { ReactNode } from "react"
import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  ApolloLink,
} from "@apollo/client"
import { store } from "../app/store"

import { onError } from "@apollo/client/link/error"
import { logOutReset, setCredential } from "../features/AuthSlice"
import { REFRESH_TOKEN } from "../api/mutations/userMutations"
import { setMsg } from "../features/MessageSlice"
import { ApolloProvider } from "@apollo/client"

import { cache, authLink, httpLink } from "./apollo-client"
import { useNavigate } from "react-router-dom"

function CustomApolloProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (
        graphQLErrors !== undefined &&
        (graphQLErrors[0]?.message === "Not Authorised!" ||
          graphQLErrors[0]?.message === "jwt malformed" ||
          graphQLErrors[0]?.message === "jwt expired")
      ) {
        client
          .query({
            query: REFRESH_TOKEN,
          })
          .then(({ data }) => {
            const token = data?.refresh?.token

            store.dispatch(
              setCredential({
                token,
                id: data?.refresh?.id,
                username: data?.refresh?.username,
              })
            )

            operation.setContext(({ headers = {} }) => {
              return {
                headers: {
                  ...headers,
                  authorization: token ? `Bearer ${token}` : "",
                },
              }
            })
          })
          .catch((err) => {
            store.dispatch(logOutReset())
            localStorage.removeItem("persist")
            store.dispatch(setMsg("You need to Login!"))
            navigate("/login")
          })
      }
      return forward(operation)
    }
  )

  const client = new ApolloClient({
    cache,
    link: from([authLink, errorLink, httpLink]),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default CustomApolloProvider
