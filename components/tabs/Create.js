import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Picker, Button, Alert, Image } from "react-native";

import utils from '../../app.utils'
import params from '../../app.params'
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../Header";

export default function Create(props) {
  console.log("render create")

  // States
  const [tags, setTags] = useState([])
  const [formTag, setFormTag] = useState(null)
  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")

  // Methods

  const submitForm = (event) => {
    console.log({
      formTag,
      formDescription,
      formTitle
    })

    if (formTag && formTitle && formDescription) {
      utils.fetch("/proposals", {
        method: "POST",
        data: {
          title: formTitle,
          description: formDescription,
          tag_id: formTag
        }
      }).then(res => {
        console.log({ res })
        // proposal has been created
        if (res.status === 201) {
          props.navigation.navigate("Home")
        }
      })
        .catch(error => {
          console.log({ error })
        })
    } else {
      console.log("bad")
      Alert.alert(undefined, "You should fill all input")
    }

  }

  // Cycle

  useEffect(() => {

    utils.fetch("/tags", {
      method: "GET"
    })
      .then(res => {
        setTags(res.data)
        console.log(res.data);
      })
      .catch(error => console.log(error))

  }, []);

  return (
    <View>
      <Header />
      <ScrollView>
        <Image
          style={styles.bg}
          source={require("../../assets/bg-2.jpg")}
        ></Image>
        <View style={styles.page}>
          <Text style={styles.pageTitle}>Créer une proposition</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Quel est le thème de votre proposition</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {
                tags.map(tagsItem => (
                  <TouchableOpacity onPress={tagsItem => setFormTag(tagsItem.id)} style={styles.btnOption}>
                    {tagsItem && <Text style={Object.assign({}, styles.tag, { color: params.getTagColors(tagsItem.id) })}>{tagsItem.label}</Text>}
                    {/* <Text style={{ textAlign: 'center', }}>{tagsItem.label}</Text> */}
                  </TouchableOpacity>
                ))
              }
            </View>
            {/* <Picker
            selectedValue={formTag}
            style={styles.formTagSelect}
            onValueChange={value => setFormTag(value)}
          >
            {
              tags.map(tagsItem => (
                <Picker.Item key={tagsItem.id} label={tagsItem.label} value={tagsItem.id} />
              ))
            }
          </Picker> */}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Renseignez le titre de votre pétition</Text>
            <TextInput
              onChangeText={text => setFormTitle(text)}
              value={formTitle}
              style={styles.formTitleInput}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Décrivez votre pétition</Text>
            <TextInput
              onChangeText={text => setFormDescription(text)}
              value={formDescription}
              style={styles.formDescInput}
              multiline={true}
              numberOfLines={10}
            />
          </View>

          <View style={styles.formGroup}>
            <Button
              title="Publier ma proposition"
              onPress={submitForm}
              style={styles.formSubmitBtn}
            />
          </View>
          <View style={styles.fixSpaceBug}></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  page: {
    paddingTop: 50,
    padding: 20
  },

  bg: {
    position: 'absolute',
    width: '100%'
  },

  pageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 30
  },

  tagList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },

  tagListItem: {
    width: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 1,
    marginHorizontal: 9,
    borderRadius: 4,
  },

  tagListItemText: {
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  formTagSelect: {

  },

  formLabel: {
    marginBottom: 30,
    fontSize: 14,
    fontWeight: "500"
  },

  formTitleInput: {
    borderColor: "rgba(0, 0, 0, .15)",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  formDescInput: {
    padding: 0,
    borderColor: "rgba(0, 0, 0, .15)",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlignVertical: "top",
  },

  formGroup: {
    marginBottom: 30,
    justifyContent: "flex-end"
  },

  formSubmitBtn: {
    backgroundColor: "#109CF1",
    marginBottom: 100
  },

  fixSpaceBug: {
    marginBottom: 50,
    // borderColor: "red",
    // borderWidth: 2
  },
  btnOption: {
    marginBottom: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    width: 100,
    shadowColor: "white",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.01,
    shadowRadius: 1.84,

    elevation: 5
  },
  tag: {
    textAlign: 'center'
  }

})
