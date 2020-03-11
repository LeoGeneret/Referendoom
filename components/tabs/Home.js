import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Header from '../Header';
// import listDetails from '../tabs/ListDetails';
import MyCard from '../myCard'
import axios from 'axios';

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const result = axios.get(
      'http://ec2-35-181-9-37.eu-west-3.compute.amazonaws.com:4000/proposals')
      .then(res => {
        setList(res.data.list);
        console.log(res.data.list);
      })
      .catch(res => console.log())
    return () => {
    }
  }, []);

  console.log(list.length);


  return (
    <View>
      <Header />
      <FlatList
        keyExtractor={item => item.id}
        data={list}
        renderItem={
          (
            {
              item
            }
          ) => (
              <View style={{ marginTop: 50 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.tag}>{item.label}</Text>
                    </View>
                    <Image source={require('../../assets/bg-ecologie.jpg')} style={styles.cardImage}></Image>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View style={styles.cardDetails}>
                      <View style={styles.flex}>
                        <Text style={styles.voteGood}>70% de oui </Text>
                        <Text style={styles.votebad}>30% de non</Text>
                      </View>
                      <Text style={styles.cardTitle}></Text>
                      <Text> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum ... </Text>
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
      {/* < MyCard /> */}
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

  flex: {
    flex: 1,
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
    marginBottom: 10,
    height: 380,
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
    height: 180,
    backgroundColor: 'black'
  },

  cardDetails: {
    paddingLeft: 20,
    paddingRight: 20
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
