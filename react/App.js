import React, {useEffect, useState} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import Task from './components/Task';
import axios from 'axios';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const [domain, setDomain] = useState("http://10.0.2.2:8000")

  async function getAllItems() {
    try {
      console.log("GET TODOITEMS");

      const todoItems = await axios.get(domain + '/api/v1.0/user/todo-items')
      let values = []
      Object.entries(todoItems.data).forEach(([key, value]) => {
        values.push(value);
      });
      setTaskItems(values);

    } catch (error) {
      console.log(error)
      console.log("error getItem")
    }
  }

  useEffect(()=> {
    getAllItems()
  }, [])

  async function postNewItem(_data) {
    try {
      console.log("POST TODOITEMS")
      let return_response = undefined;
      await axios.post(domain + '/api/v1.0/user/update-todo-item/', _data).then(response => {return_response = response});
      if (return_response.status === 200) {
          let values = [];
          Object.entries(return_response.data).forEach(([key, value]) => {
            values.push(value);
          });
          setTaskItems(values);
      }
      return return_response;
    }
    catch (error) {
        console.log(error);
    }
  }

  async function handleAddTask() {
    if (task !== null) {
      data = {
        "todo": [
          {
            "NAME": task,
            "FINISHED": false
          }
        ]
      }
      postNewItem(data).then(response => {
        if (response.status === 200) {
          Keyboard.dismiss();
          setTask(null);
        }
      });
    }
  }

  async function deleteTask(_deleteData) {
    try {
      console.log("DELETE TODOITEM")
      console.log(_deleteData);
      return await axios.delete(domain + '/api/v1.0/user/update-todo-item/', {'data': _deleteData});
    }
    catch (error) {
        console.log(error);
    }
  }

  async function completeTask(index) {
    data = {
      "todo": [
          {
              "ID": taskItems[index].id,
              "NAME": taskItems[index].name,
              "FINISHED": taskItems[index].finished
          }
      ]
    }
    deleteTask(data).then(response => {
      if (response !== undefined && response.status === 200) {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
      }
    });
  }
  
  return (
    <View style={styles.container}>
      {/* Today's Tasks*/}
      <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Todo List</Text>
          <View style={styles.line}></View>
          <ScrollView style={styles.items}>
            {
              taskItems.map((item, index) => {
                return <Task 
                data={item} key={index} 
                delete={() => completeTask(index)}
                />
              })
            }
          </ScrollView>
      </View>
      {/* Write a task */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText = {text => setTask(text)}></TextInput>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 15,
    marginBottom: 140,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  line: {
    backgroundColor: '#C0C0C0',
    height: 3,
    width: 150,
    borderRadius: 60,
    marginVertical: 5,
  }
});
