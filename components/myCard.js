import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Button,
  TouchableOpacity
} from "react-native";
import axios from "axios";

export default function MyCard({proposal}) {
  
  useEffect(() => {
    console.log('myCard')

  }, [])
  return (
    <View style={styles.myCard}>
      <View style={styles.cardHeader}>
        {proposal.item ? <Text style={styles.cardHeader_tag}>{proposal.item}</Text> : <Text style={styles.cardHeader_tag}>le tag est null</Text>}
        <Text style={styles.cardHeader_date}>{proposal.created_at}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardContent_title}>
          {proposal.title}
        </Text>
        <View style={styles.cardContent_voter}>
          <View style={styles.cardContent_voteAction}>
            <Image source={require("../assets/votePos.png")}></Image>
            <Text style={styles.cardContent_votePositive}>{proposal.votes.is_agree}</Text>
          </View>
          <View style={styles.cardContent_voteAction}>
            <Image source={require("../assets/voteNeg.png")}></Image>
            <Text style={styles.cardContent_voteNegative}>{proposal.votes.is_not_agree}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardAction}>
        <TouchableOpacity
          style={styles.cardAction_delete}
          underlayColor="#F2994A">
          <Text style={styles.cardAction_deleteText}>Supprimer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardAction_more}
          underlayColor="#F2994A"
        >
          <Text style={styles.cardAction_moreText}>Voir les details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myCard: {
    marginTop: 30,
    backgroundColor: "white",
    shadowColor: "#000",
    marginLeft: 'auto',
    marginRight: 'auto',
    width:  '90%',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    borderRadius: 15,
    elevation: 5,
    padding: 20
  },

  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  cardHeader_tag: {
    color: "#F2994A",
    fontSize: 13,
    fontWeight: "bold"
  },

  cardHeader_date: {
    fontSize: 13,
    opacity: 0.5,
    fontWeight: "bold"
  },

  cardContent_title: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20
  },

  cardContent_voter: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20
  },

  cardContent_voteAction: {
    display: "flex",
    flexDirection: "row"
  },

  cardContent_votePositive: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27AE60",
    marginRight: 30,
    marginLeft: 10
  },

  cardContent_voteNegative: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EB5757",
    marginLeft: 10
  },

  cardAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },

  cardAction_more: {
    backgroundColor: "#109CF1",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#109CF1",
    paddingTop: 10,
    paddingBottom: 10
  },

  cardAction_moreText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  cardAction_delete: {
    paddingTop: 10,
    paddingBottom: 10
  },

  cardAction_deleteText: {
    color: "#000",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10
  }
});
