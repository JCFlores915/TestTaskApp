import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface ListItem {
  id: string;
  name: string;
  image: string;
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

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.name}</Text>
            <Image source={{ uri: item.image }} style={styles.listItemImage} />
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
    borderBottomColor: '#ccc',
  },
  listItemText: {
    flex: 1,
  },
  listItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ListScreen;
