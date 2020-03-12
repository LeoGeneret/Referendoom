import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./components/tabs/Home";
import Create from "./components/tabs/Create";
import MyProps from "./components/tabs/MyProps";
import ListDetails from "./components/tabs/ListDetails";
import MyPropsDetails from "./components/tabs/MyPropsDetails";
import { Ionicons } from "@expo/vector-icons";

let menuTabIcon = require('./assets/menu.png')
let propsTabIcon  = require('./assets/tab3.png')
let createTabIcon = require('./assets/create.png')


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MyPropsStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
    screenOptions ={{
      headerShown: false
    }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ListDetails" component={ListDetails} />
    </HomeStack.Navigator>
  );
}

function MyPropsScreen() {
  return (
    <MyPropsStack.Navigator
    screenOptions ={{
      headerShown: false
    }}>
      <MyPropsStack.Screen name="MyProps" component={MyProps} />
      <MyPropsStack.Screen name="MyPropsDetails" component={ListDetails} />
    </MyPropsStack.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName ;

              if (route.name === "Home") {
                iconName = menuTabIcon;
              } else if (route.name === "Mes propositions") {
                iconName = propsTabIcon;
              } else if (route.name === "Création") {
                iconName = createTabIcon;
              }
              
              return <Image source={iconName} />;
            }
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Soumettre" component={Create} />
        <Tab.Screen name="Mes propositions" component={MyPropsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}