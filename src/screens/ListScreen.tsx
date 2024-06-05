import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation';
type ListScreenNavigationProp = StackNavigationProp<RootStackParams, 'List'>;

interface ListItem {
  id: string;
  name: string;
  avatar: string;
}

const ListScreen = () => {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const [data, setData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://6172cfe5110a740017222e2b.mockapi.io/elements')
      .then((response) => {
        setData(response.data);
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

  // plus para corregir la url de la imagen
  const fixUrl = (url: string) => {
    if (url.includes('https://cloudflare-ipfs.com/ipfs')) {
      return url.replace('https://cloudflare-ipfs.com/ipfs', 'https://ipfs.io/ipfs');
    } else {
      const randomId = Math.floor(Math.random() * 1000);
      return `https://ipfs.io/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${randomId}.jpg`;
    }
    return url;
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
