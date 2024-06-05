import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../interfaces/navigateInterface';
import { ListItem } from '../interfaces/listInterface';
import getElements from '../api/api';
import { fixUrl } from '../utils/validations';
type ListScreenNavigationProp = StackNavigationProp<RootStackParams, 'List'>;

const ListScreen = () => {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const [data, setData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getElements()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonHome} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textButton}>Home</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: fixUrl(item.avatar) }} style={styles.listItemImage} />
            <Text style={styles.listItemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  listItemText: {
    flex: 1,
    marginLeft: '5%',
  },
  listItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonHome: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'orange',
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

export default ListScreen;
