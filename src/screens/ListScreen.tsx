import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface ListItem {
  id: string;
  name: string;
  avatar: string;
}

const ListScreen = () => {
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
});

export default ListScreen;
