import React, { useState } from 'react';
import { View, Button, FlatList, Text, Modal, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addTask } from '../redux/tasksSlice';

const TasksScreen = () => {
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
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.taskItem}>{item.description}</Text>}
      />
      <Button title="Add New Task" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={taskDescription}
            onChangeText={setTaskDescription}
          />
          <Button title="Add Task" onPress={handleAddTask} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
});

export default TasksScreen;
