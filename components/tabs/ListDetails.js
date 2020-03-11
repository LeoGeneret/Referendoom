import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';

export default function listDetails(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const result = axios.get(
      'http://ec2-35-181-9-37.eu-west-3.compute.amazonaws.com:4000/proposals/' + props.route.params.id)
      .then(res => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(res => console.log())
    return () => {
    }
  }, []);

  // console.log(props);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.route.params.id}</Text>
      <Text>{data.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});