import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../interfaces/navigateInterface';


type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('Tasks')}>
        <Text style={styles.textButton}>Tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('List')}>
        <Text style={styles.textButton}>List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
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
  },
});

export default HomeScreen;
