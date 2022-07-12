import React, { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
  Button,
  TextInput,
  Alert,
} from "react-native";
import TaskList from "./src/component/TaskList";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";

export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [Textinput, setTextInput] = useState("");
  const AnimatadBtn = Animatable.createAnimatableComponent(TouchableOpacity);

   //veriicar se ha  algo na tela
  useEffect(() => {
    async function lerTarefas() {
      const taskStorage = await AsyncStorage.getItem("tpc");
      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
    }
    lerTarefas();
  }, []);


  //salvando caso tenha alguma alterado algo na tela
  useEffect(()=> {
    async function salvarItem(){
      await AsyncStorage.setItem("tpc", JSON.stringify(task));
    }
    salvarItem();

  }, [task])

  function taskAdd() {
    if (Textinput === "") return;

    const data = {
      key: Textinput,
      task: Textinput,
    };
    setTask([...task, data]);
    setOpen(false);
    setTextInput("");
  }
  const deletar = useCallback((data) => {
    const find = task.filter((r) => r.key !== data.key);
    setTask(find);
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}> Minhas Tarefas</Text>
      </View>

      {/* Aqui vai a lista */}
      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Icon
                style={{ marginLeft: 5, marginRight: 5 }}
                name="md-arrow-back"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}> Nova Tarefa</Text>
          </View>

          <Animatable.View
            animation="fadeInUp"
            useNativeDriver
            style={styles.modalBody}
          >
            <TextInput
              multiline={true}
              placeholder="O que precisa fazer hoje?"
              placeholderTextColor="#747474"
              autoCorrect={false}
              style={styles.input}
              value={Textinput}
              onChangeText={(texto) => setTextInput(texto)}
            />

            <TouchableOpacity style={styles.btnAdd} onPress={taskAdd}>
              <Text style={styles.btnAddTitle}> Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <TaskList data={item} btnDelet={deletar} />}
      />

      <AnimatadBtn
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={() => setOpen(true)}
        style={styles.fab}
      >
        <Icon name="ios-add" size={35} color="#fff" />
      </AnimatadBtn>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171d31",
  },
  content: {},
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#0094FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  modal: {
    flex: 1,
    backgroundColor: "#171d31",
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: "#fff",
  },
  modalBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 10,
    height: 85,
    textAlignVertical: "top",
    borderRadius: 5,
  },
  btnAdd: {
    backgroundColor: "#fff",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5,
  },
  btnAddTitle: {
    fontSize: 20,
  },
});
