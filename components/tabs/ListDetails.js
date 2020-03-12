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
      setData(res.data);
      console.log(res.data);
    })
    .catch(error => console.log(error))

  }, []);

  if (!data) return <View></View>

  const transformPourcentage = function(posVotes) {
    return Math.floor(posVotes*100)+'%'
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header />
      <View style={styles.container}>
        <Image source={data.illustration ? { uri: data.illustration } : '' } style={styles.cardImage}></Image>
        <TouchableOpacity
          underlayColor="#F2994A"
          style={styles.btn_back}
          onPress={() => props.navigation.goBack()}
        >
          <View style={styles.name_btn}>
            <Image style={{color: 'blue', marginRight: 4}} source={leftIcon}></Image>
            <Text style={{fontWeight: 'bold', color: 'grey'}}>Retour</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.cardheader}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <Text>{data.votes.count} participants</Text>
            <Text>60 000 vues</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require("../../assets/votePos.png")}></Image>
              <Text style={styles.text_agree}>{transformPourcentage(data.votes.is_agree)}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require("../../assets/voteNeg.png")}></Image>
              <Text style={styles.text_notagree}>{transformPourcentage(data.votes.is_not_agree)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container_desc}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 10, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Image source={{ uri: data.author.avatar }} style={styles.imgProfile}></Image>
              <Text style={{marginRight: 3, fontWeight: 'bold' }}>{data.author.first_name}</Text>
              <Text style={{fontWeight: 'bold' }}>{data.author.last_name}</Text>
            </View>
            <Text>{moment(data.created_at, "YYYYMMDD").fromNow()}</Text>
          </View>
          <Text style={styles.h1}>{data.title}</Text>
          <Text style={{textAlign: 'justify', fontSize: 15}}>{data.description}</Text>
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
    borderRadius: 10, 
    alignSelf: 'center',
    padding: 20,
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
    marginTop: 10,
    marginLeft: 10,
    zIndex: 100,
    top: 0,
    height: 30,
    width: 80,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
  },
  h1: {
    padding: 10,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30
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
    marginLeft: 10,
  },
  name_btn: {
    flexDirection: 'row',
    alignItems: 'center'
  },  
  text_notagree: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginLeft: 10,
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
    borderRadius: 100,
    marginRight: 10
  }
});