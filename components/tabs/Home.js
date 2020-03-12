import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button, ScrollView } from 'react-native';
import Header from '../Header';
import ListDetails from '../tabs/ListDetails';

import axios from 'axios';

export default function Home({ navigation }) {
  const [list, setList] = useState([]);

  const displayDetailForItems = (id) => {
    navigation.navigate("ListDetails", { id: id });
    console.log("display for item id" + id);
  };

  useEffect(() => {
    const result = axios.get(
      'http://ec2-35-181-9-37.eu-west-3.compute.amazonaws.com:4000/proposals')
      .then(res => {
        setList(res.data.list);
        // console.log(res.data.list);
      })
      .catch(res => console.log())
    return () => {
    }
  }, []);

  return (
    <View>
      <Image style={styles.bg} source={require('../../assets/bg.jpg')}></Image>
      <View style={{ zIndex: 3 }}>
        <Header />
        <FlatList
          keyExtractor={item => item.id + ""}
          data={list}
          renderItem={
            (
              {
                item
              }
            ) => (
                <View style={{ marginTop: 50 }}>
                  <Button
                    title="Go to Details"
                    onPress={() => displayDetailForItems(item.id)}
                  />
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.card}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.tag}>{item.tag ? item.tag.label : ''}</Text>
                      </View>
                      <Image source={{ uri: item.illustration }} style={styles.cardImage}></Image>
                      <View style={styles.cardDetails}>
                        <View style={styles.flex}>
                          <Text style={styles.voteGood}>{item.votes.is_agree = item.votes.is_agree * 100} % de oui </Text>
                          <Text style={styles.votebad}>{item.votes.is_not_agree = item.votes.is_not_agree * 100} % de non</Text>
                        </View>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text numberOfLines={3}> {item.description} </Text>
                        <View style={styles.containerBtn}>
                          <Image style={styles.btnValid} source={require('../../assets/valid.png')}></Image>
                          <Image style={styles.btnCross} source={require('../../assets/cross.png')}></Image>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    width: '100%'
  },

  flex: {
    flex: 1,
    margin: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },

  cardHeader: {
    zIndex: 2,
    position: 'absolute',
  },
  tag: {
    marginTop: 10,
    marginLeft: '78%',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#F2994A'
  },

  card: {
    width: '80%',
    marginBottom: 20,
    height: 360,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5
  },

  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: 'black'
  },

  cardDetails: {
    padding: 20
  },
  cardTitle: {
    margin: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  voteGood: {
    fontSize: 10,
    color: 'green'
  },
  votebad: {
    margin: 8,
    fontSize: 10,
    color: 'red'
  },
  containerBtn: {
    width: '70%',
    alignItems: "center"
  },

  btnValid: {
    marginTop: 20
  },

  btnCross: {
    marginTop: 20,
    position: 'absolute',
    right: 0
  }

});
