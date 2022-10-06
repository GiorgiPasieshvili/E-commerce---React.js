import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import App from "./App";

import { store } from "store";
import { Provider } from "react-redux";

/* Configure apollo client */
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER || "http://localhost:4000/",
  cache: new InMemoryCache(),
});

render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
