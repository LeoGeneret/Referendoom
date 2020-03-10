import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MyCard from '../myCard'

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.card}>
        <View style={styles.cardHeader}></View>
        <Image style={styles.cardImage}></Image>
        <View style={styles.cardDetails}>
          <Text> </Text>
          <Text style={styles.cardTitle}>Faut t-il arreter le plastique ? </Text>
          <Text> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum  </Text>
        </View>
      </View>
        <MyCard />
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

  card: {
    width: '80%',
    height: 360,
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
    padding: 20
  },
  cardTitle: {
    margin: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }

});
