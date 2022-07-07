import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return (
    <View style={styles.container}>
      <Icon.Button
        name="facebook"
        backgroundColor="#3b5998"
        onPress={()=>Alert.alert("Ola")}
       >
        Login with Facebook
      </Icon.Button>
    <TouchableOpacity onPress={()=>Alert.alert("Whatsap")}>
      <Icon name="whatsapp" color="white" size={100}  />
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
