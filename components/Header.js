import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Referendoom</Text>
      {/* <Image style={styles.profile} source={require('../../assets/valid.png')}></Image> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    zIndex: 3,
    width: "100%",
    height: 100,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },

  notif: {
    position: "absolute",
    right: 20,
    top: 50
  },
  title: {
    width: 160,
    position: "absolute",
    marginTop: 50,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  }
});
