import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { database } from '../database/firebase';
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import Usuarios from './Usuarios';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, 'usuarios');
    const q = query(collectionRef, orderBy('name', 'desc'));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      setUsers(
        QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          phone: doc.data().phone,
          image: doc.data().image, // Agrega la URL de la imagen
        }))
      );
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Usuarios {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default UsersList;
