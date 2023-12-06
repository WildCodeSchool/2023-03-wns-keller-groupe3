import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../pages/Home";
import StackNavigator from "./StackNavigator";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "Accueil") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Villes") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ED9986",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name='Accueil'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name='Villes'
        component={StackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
