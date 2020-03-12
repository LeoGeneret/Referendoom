import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Header';
import utils from '../../app.utils'
import moment from 'moment'
moment.locale('fr')


const leftIcon = require("../../assets/left.png") 
const votePosIcon = require("../../assets/votePos.png")
const voteNegIcon = require("../../assets/voteNeg.png")


export default function listDetails(props) {

  const [data, setData] = useState(null);
  
  useEffect(() => {

    utils.fetch("/proposals/" + props.route.params.id)
    .then(res => {

      if(res.status === 200){
        setData(res.data)
      }
    })
    .catch(error => console.log(error))

  }, []);

  useEffect(() => {

    console.log(
      data && data.illustration ? data.illustration : "noimage"
    )

  }, [data])

  const makeItPercentage = value => Math.floor(value * 100)


  if (!data) return <View></View>

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Image source={data.illustration ? { uri: data.illustration } : ""} style={styles.cardImage}></Image>
        <TouchableOpacity
          underlayColor="#F2994A"
          style={styles.btn_back}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.name_btn}>
            <Image source={leftIcon}></Image>
          </Text>
        </TouchableOpacity>
        <View style={styles.cardheader}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <Text>{data.votes.count} ont participés</Text>
            <Text>60 000 ont vues</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={votePosIcon}></Image>
              <Text style={styles.text_agree}>{makeItPercentage(data.votes.is_agree)} % de oui</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image source={voteNegIcon}></Image>
              <Text style={styles.text_notagree}>{makeItPercentage(data.votes.is_not_agree)} % de non</Text>
            </View>
          </View>
        </View>
        <View style={styles.container_desc}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: data.author.avatar }} style={styles.imgProfile}></Image>
              <Text>{data.author.first_name}</Text>
              <Text>{data.author.last_name}</Text>
            </View>
            <Text>{moment(data.created_at, "YYYYMMDD").fromNow()}</Text>
          </View>
          <Text style={styles.h1}>{data.title}</Text>
          <Text>{data.description}</Text>
          <View style={styles.cardAction}>
            <TouchableOpacity
              style={styles.cardAction_agree}
              underlayColor="#F2994A">
              <Text style={styles.btnText_agree}>Je suis d'accord</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardAction_notagree}
              underlayColor="#F2994A"
            >
              <Text style={styles.btnText_notagree}>Je ne suis pas d'accord</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    backgroundColor: 'grey'
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
    borderColor: "#27AE60",
    backgroundColor: 'white'

  },
  cardAction_notagree: {
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'white'
  },
  text_agree: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27AE60",
  },
  text_notagree: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  btnText_agree: {
    fontSize: 12,
    color: "#27AE60",
  },
  btnText_notagree: {
    fontSize: 12,
    color: 'red'
  },
  imgProfile: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 100
  }
});