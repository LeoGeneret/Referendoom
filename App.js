import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./components/tabs/Home";
import Create from "./components/tabs/Create";
import MyProps from "./components/tabs/MyProps";
import ListDetails from "./components/tabs/ListDetails";
import { Ionicons } from "@expo/vector-icons";

let menuTabIcon = require('./assets/menu.png')
let propsTabIcon  = require('./assets/tab3.png')
let createTabIcon = require('./assets/create.png')


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ListDetails" component={ListDetails} />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({

  safeAreaView: {
    flex: 1
  }

})

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
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
          <Tab.Screen name="Création" component={Create} />
          <Tab.Screen name="Mes propositions" component={MyProps} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}