import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Header from '../Header';
import listDetails from '../tabs/ListDetails';

export default function HomeScreen() {
  return (
    <View>
      <Header />
      <ScrollView style={{ marginTop: 100 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.tag}>Ecologie</Text>
            </View>
            <Image source={require('../../assets/bg-ecologie.jpg')} style={styles.cardImage}></Image>

            <View style={styles.cardDetails}>
              <View style={styles.flex}>
                <Text style={styles.voteGood}>70% de oui </Text>
                <Text style={styles.votebad}>30% de non</Text>
              </View>
              <Text style={styles.cardTitle}>Faut t-il arreter le plastique ? </Text>
              <Text> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum ... </Text>
              <View style={styles.containerBtn}>
                <Image style={styles.btnValid} source={require('../../assets/valid.png')}></Image>
                <Image style={styles.btnCross} source={require('../../assets/cross.png')}></Image>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.tag}>Ecologie</Text>
            </View>
            <Image source={require('../../assets/bg-ecologie.jpg')} style={styles.cardImage}></Image>

            <View style={styles.cardDetails}>
              <View style={styles.flex}>
                <Text style={styles.voteGood}>70% de oui </Text>
                <Text style={styles.votebad}>30% de non</Text>
              </View>
              <Text style={styles.cardTitle}>Faut t-il arreter le plastique ? </Text>
              <Text> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum ... </Text>
              <View style={styles.containerBtn}>
                <Image style={styles.btnValid} source={require('../../assets/valid.png')}></Image>
                <Image style={styles.btnCross} source={require('../../assets/cross.png')}></Image>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.tag}>Ecologie</Text>
            </View>
            <Image source={require('../../assets/bg-ecologie.jpg')} style={styles.cardImage}></Image>

            <View style={styles.cardDetails}>
              <View style={styles.flex}>
                <Text style={styles.voteGood}>70% de oui </Text>
                <Text style={styles.votebad}>30% de non</Text>
              </View>
              <Text style={styles.cardTitle}>Faut t-il arreter le plastique ? </Text>
              <Text> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum ... </Text>
              <View style={styles.containerBtn}>
                <Image style={styles.btnValid} source={require('../../assets/valid.png')}></Image>
                <Image style={styles.btnCross} source={require('../../assets/cross.png')}></Image>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 20,
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
