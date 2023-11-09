import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setContext } from "@apollo/client/link/context";

const graphqlUri =
  process.env.NODE_ENV === "production"
    ? "/graphql"
    : process.env.REACT_APP_GRAPHQL_URI_DEV;

const httpLink = createHttpLink({
  uri: graphqlUri,
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <ToastContainer
      position='top-right'
      autoClose={2000}
      hideProgressBar
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
