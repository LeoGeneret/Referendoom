import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import Header from "../Header";
import MyCard from "../myCard";
import axios from "axios";
import { BorderlessButton, ScrollView } from "react-native-gesture-handler";

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const result = axios
      .get(
        "http://ec2-35-181-9-37.eu-west-3.compute.amazonaws.com:4000/proposals?user_id=1"
      )
      .then(res => {
        setList(res.data.list);
      })
      .catch(res => console.log());
    return () => {};
  }, []);

  return (
    <View style={styles.myProps}>
      <Header />
      <View style={styles.pageContent}>
        <Image
          style={styles.bg}
          source={require("../../assets/bg2.png")}
        ></Image>
        <SearchBar
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.inputSearchBar}
          placeholder="Rechercher..."
          lightTheme={true}
          value={""}
        />
        <ScrollView style={styles.flatListScrollView}>
          <View style={styles.flatListContainer}>
            <Text style={styles.pageTitle}>Mes Propositions</Text>
            <FlatList
              style={styles.flatList}
              contentContainerStyle={styles.flatListCCS}
              data={list}
              renderItem={({ item }) => {
                return <MyCard proposal={item} key={item.id}/>;
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    position: "relative",
    flex: 1
  },
  myProps: {
    flex: 1,
    width: "100%",
    zIndex: 1
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%"
  },

  searchBar: {
    position: "absolute",
    width: "90%",
    marginBottom: 40,
    marginTop: 40,
    backgroundColor: "#F6F5F5",
    borderRadius: 5,
    alignSelf: "center"
  },
  inputSearchBar: {
    backgroundColor: "#F6F5F5"
  },
  flatListScrollView: {
    zIndex: 2,
    paddingTop: 160
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  flatList: {
    width: "100%",
    flex: 1,
    paddingBottom: 200
  },
  flatListCCS: {
    justifyContent: "center"
  },
  bg: {
    position: "absolute",
    width: "100%"
  }
});
