import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App.js";
import "./bootstrap.min.css";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
const { store } = require("./redux/store.ts");
import { Provider } from "react-redux";
//Enable apollo devtools, if  production is set to false
export const client = new ApolloClient({
  //New instance of ApolloClient
  cache: new InMemoryCache(), //New instance of InMemoryCache
  uri: "/graphql",
  // connectToDevTools
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);