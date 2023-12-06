import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../components/Map";
import CitiesScreen from "../pages/Cities";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List of cities" component={CitiesScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}
