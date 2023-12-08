import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import TabBar from "./src/components/TabBar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const { manifest2 } = Constants;

const graphqlUri =
  "http://" + manifest2?.extra?.expoGo?.debuggerHost?.split(":")[0] + ":4000/";

const client = new ApolloClient({
  // uri: "https://staging.keller3.wns.wilders.dev/graphql",
  uri: graphqlUri,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <TabBar />
      </NavigationContainer>
    </ApolloProvider>
  );
}
