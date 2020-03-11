import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SearchBar } from 'react-native-elements';
import Header from "../Header";
import MyCard from "../myCard";
import axios from "axios";
import { BorderlessButton } from "react-native-gesture-handler";

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
      <SearchBar
        style={{width: '100%'}}
        placeholder="Rechercher..."
        lightTheme={true}
        value={'tg'}
      />
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.flatListCCS}
        data={list}
        renderItem={({ item }) => {
          return <MyCard  />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  myProps: {
      flex: 1,
      width: '100%'
  },
  flatList: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
  },
  flatListCCS: {
    borderColor: 'red',
    borderWidth: 1,
    justifyContent: 'center',
  },
});
