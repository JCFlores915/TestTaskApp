import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Text, Modal, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addTask } from '../redux/tasksSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation';
import { useNavigation } from '@react-navigation/native';

type TaskScreenNavigationProp = StackNavigationProp<RootStackParams, 'Tasks'>;

const TasksScreen = () => {
  const navigation = useNavigation<TaskScreenNavigationProp>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (taskDescription.trim()) {
      dispatch(addTask(taskDescription));
      setTaskDescription('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.textButton}>New Task</Text>
      </TouchableOpacity>
      {/* boton para regresar a home */}
      <TouchableOpacity style={styles.buttonHome} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textButton}>Home</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.taskItem}>{item.description}</Text>}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={taskDescription}
            onChangeText={setTaskDescription}
          />
          <TouchableOpacity  style={styles.button} onPress={handleAddTask}>
            <Text style={styles.textButton}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  taskItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
  modalView: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  buttonHome: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  textButton: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold', 
  }
});

export default TasksScreen;
