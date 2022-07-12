import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from 'react-native-animatable'

const TaskList = ({data, btnDelet}) => {
  return (
    <Animatable.View
    useNativeDriver
    animation="bounceIn"
    style={styles.container}
    >
      <TouchableOpacity onPress={()=>btnDelet(data)}>
        <Icon name="md-checkmark-circle" size={30} color="#121212" />
      </TouchableOpacity>
      <View>
        <Text style={styles.task}>{data.task}</Text>
      </View>
    </Animatable.View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    flexDirection: "row",
    alignItems:"center",
    backgroundColor:'#fff',
    borderRadius:5,
    padding: 7,
    elevation:1.5,
    shadowColor:"#fff",
    shadowOpacity:0.2
  },
  task:{
color: "#121212",
fontSize:15,
paddingLeft:10,
paddingRight:20
  }
});
