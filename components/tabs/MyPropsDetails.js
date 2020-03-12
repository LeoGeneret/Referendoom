import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MyPropsDetails() {
  return (
    <View>
        <Text>HELLO LA MIF</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    position: 'absolute',
    width: '100%',
    height: 200,
    backgroundColor: 'black'
  },
  cardheader: {
    top: 100,
    zIndex: 10,
    position: 'absolute',
    width: '80%',
    height: 80,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3
  },
  container_desc: {
    paddingTop: 50,
    borderRadius: 50,
    height: 500,
    padding: 40,
    marginTop: 120,
    backgroundColor: 'white'
  },
  btn_back: {
    paddingLeft: 3,
    zIndex: 100,
    top: 0,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 5
  },
  h1: {
    padding: 10,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold'
  },
  cardAction: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 50
  },
  cardAction_agree: {
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'white'

  },
  cardAction_notagree: {
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'white'
  },
  btnText_agree: {
    fontSize: 12,
    color: 'green'
  },
  btnText_notagree: {
    fontSize: 12,
    color: 'red'
  }
});