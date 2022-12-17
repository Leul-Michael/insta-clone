import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { ApolloProvider } from "@apollo/client"

import App from "./App"
import { store } from "./app/store"
import CustomApolloProvider from "./configs/CustomApolloProvider"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <CustomApolloProvider>
          <App />
        </CustomApolloProvider>
      </Provider>
    </Router>
  </React.StrictMode>
)
