import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/tabs/Home";
import Create from "./components/tabs/Create";
import MyProps from "./components/tabs/MyProps";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "ios-grid"
                : "ios-grid-outline";
            } else if (route.name === "Mes propositions") {
              iconName = focused ? "ios-bulb" : "ios-bulb-outline";
            } else if (route.name === "Soumettre") {
              iconName = focused ? "ios-create" : "ios-create-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Mes propositions" component={MyProps} />
        <Tab.Screen name="Soumettre" component={Create} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
