import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import Header from "../Header";
import MyCard from "../myCard";
import ListDetails from '../tabs/ListDetails';
import MyPropsDetails from './MyPropsDetails';
import axios from "axios";

import { BorderlessButton, ScrollView } from "react-native-gesture-handler";
import utils from "../../app.utils";

const bgImg = require("../../assets/bg2.png")

export default function MyProps({ navigation }) {

  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState("")

  const displayDetailForMyProps = (id) => {
    navigation.navigate("MyPropsDetails", { id: id });
    console.log("display for item id" + id);
  };

  const deleteProposal = (proposalId) => {

    utils.fetch("/proposals/" + proposalId, {
      method: "DELETE"
    })
    .then(res => {
      setList(list.filter(f => f.id !== proposalId))
    })
    .catch(error => console.log({error}))
  }

  useEffect(() => {
    utils.fetch("/proposals?user_id=1")
      .then(res => {
        setList(res.data.list);
      })
      .catch(res => console.log());
    return () => {};
  }, []);

  return (
    <View style={styles.myProps}>
      <Header/>
      <View style={styles.pageContent}>
        <Image
          style={styles.bg}
          source={bgImg}
        />
        <SearchBar
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.inputSearchBar}
          placeholder="Rechercher..."
          onChangeText={setSearchInput}
          lightTheme={true}
          value={searchInput}
        />
        <ScrollView style={styles.flatListScrollView}>
          <View style={styles.flatListContainer}>
            <Text style={styles.pageTitle}>Mes Propositions</Text>
            <FlatList
              style={styles.flatList}
              contentContainerStyle={styles.flatListCCS}
              data={list}
              renderItem={({ item }) => {
                return <MyCard handleDelete={() => deleteProposal(item.id)} seeDetailsProps={() => displayDetailForMyProps(item.id)} proposal={item} key={item.id}/>;
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
