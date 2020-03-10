import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Referendoom</Text>
      {/* <Image style={styles.profile} source={require('../../assets/valid.png')}></Image> */}
      <Image style={styles.notif} source={require('../assets/notif.png')}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
  },

  notif: {
    position: 'absolute',
    right: 20,
    top: 50
  },
  title: {
    width: 160,
    position: 'absolute',
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
