import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function listDetails(props) {

  console.log(props);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.route.params.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});