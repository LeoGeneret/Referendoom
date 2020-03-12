import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button, ScrollView, Picker } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

import moment from 'moment'

import params from '../../app.params'
import utils from '../../app.utils'

const valid = require("../../assets/valid.png")
const cross = require("../../assets/cross.png")

const today = moment()
const placeholderTagFilter = {
  label: "Selectionner une catégorie",
  value: "null",
}

export default function Home({ navigation }) {
  console.log("render home")
  // States
  const [list, setList] = useState([]);
  const [tags, setTags] = useState([])
  const [tagFilter, setTagFilter] = useState(null);

  // Methods
  const navigateToProposalDetails = id => {
    navigation.navigate("ListDetails", {id: id});
  }

  const formCreatedAt = createdAt => {
    let momentCreatedAt = moment(createdAt)

    let diff = null
    let diffType = null
    diff = today.diff(momentCreatedAt, "day")
    diffType = " jours"

    // moins d'1 jours
    if(diff === 0){
      diff = today.diff(momentCreatedAt, "hour")
      diffType = " heures"

      if(diff === 0){
        diff = today.diff(momentCreatedAt, "minute")
        diffType = " minutes"
      }
    }

    return diff + diffType
  }
  const makeItPercentage = value => Math.floor(value * 100)

  // Cycle
  useEffect(() => {

    // fetch proposals list

    utils.fetch('/proposals', {
      method: "GET"
    }).then(res => {
      setList(res.data.list);
    })
    .catch(error => console.log(error))

    // fetch tags

    utils.fetch("/tags", {
      method: "GET"
    })
    .then(res => {
      setTags(res.data)
    })
    .catch(error => console.log(error))
    
  }, []);

  useEffect(() => {

    console.log("HERE I LISTEN", tagFilter)

    utils.fetch('/proposals?tag_id=' + tagFilter, {
      method: "GET"
    }).then(res => {
      setList(res.data.list);
    })
    .catch(error => console.log(error))


  }, [tagFilter])

  return (
    <View>
      <RNPickerSelect
        placeholder={placeholderTagFilter}
        onValueChange={value => {
          console.log("HAS CHANGEDE")
          setTagFilter(value)
        }}
        items={tags.map(m => ({label: m.label, value: m.id}))}
        style={{borderColor: "red", borderWidth: 1}}
      />
      <FlatList
        keyExtractor={item => item.id + ""}
        style={styles.flatList}
        data={list}
        renderItem={
          ({item}) => (
              <View 
                style={styles.cardContainer}
              >
                <TouchableOpacity 
                  style={styles.card}
                  onPress={() => navigateToProposalDetails(item.id)}  
                >
                  <View style={styles.cardInner}>
                    <View style={styles.cardHeader}>
                      <Image style={styles.cardHeaderAvatar} source={{uri: item.author.avatar}}/>
                      <Text>{item.author.first_name + " " + item.author.last_name}</Text>
                      {item.tag && <Text style={Object.assign({}, styles.tag, {color: params.getTagColors(item.tag.id)})}>{item.tag.label}</Text>}
                    </View>
                    <Image source={{ uri: item.illustration }} style={styles.cardImage}></Image>
                    <View style={styles.cardDetails}>
                      <Text style={styles.cardCreatedAt}>{"Il y a " + formCreatedAt(item.created_at)}</Text>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardDesc} numberOfLines={2}> {item.description} </Text>
                      {/* <View style={styles.containerBtn}>
                        <TouchableOpacity onPress={() => console.log("good")}>
                          <Image style={styles.btnValid} source={valid}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log("bad")}>
                          <Image style={styles.btnCross} source={cross}/>
                        </TouchableOpacity>
                      </View> */}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({

  tagFilter: {
    width: 190,
    borderColor: "red",
    borderWidth: 1
  },

  cardContainer: {
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 32,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardHeader: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  cardHeaderAvatar: {
    width: 36,
    height: 36,
    borderRadius: 20,
    marginRight: 12
  },

  tag: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#F2994A',
    marginLeft: "auto",
  },

  card: {
    maxWidth: 316,
    width: "100%",
    borderRadius: 4,
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
    paddingBottom: 100 * (9/16) + "%",
    backgroundColor: 'black',
    marginBottom: 42,
    backgroundColor: "grey"
  },

  cardInner: {
    width: "100%",
  },

  cardDetails: {
    width: "100%",
    paddingHorizontal: 36,
    paddingBottom: 34,
    alignItems: "center",
    position: "relative"
  },
  
  cardTitle: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },

  cardCreatedAt: {
    color: "#BDBDBD",
    width: "100%",
    textAlign: "right"
  },

  cardDesc: {
    textAlign: "center"
  },

  votes: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: "row",
    justifyContent: "center"
  },
  
  voteGood: {
    fontSize: 10,
    color: 'green',
    marginRight: 15
  },
  votebad: {
    fontSize: 10,
    color: 'red'
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },

  btnValid: {
    width: 22,
    height: 22,
    marginHorizontal: 10,
  },

  btnCross: {
    width: 22,
    height: 22,
    marginHorizontal: 10
  }

});
