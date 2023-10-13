import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, Image, StyleSheet, Text } from 'react-native';
import { database } from '../database/firebase';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [image, setImage] = useState(null);
  const [emailValid, setEmailValid] = useState(true);

  const handleChangeText = (name, value) => {
    if (name === 'email') {
      // Validar el correo electrónico cuando cambie el campo de correo
      const isValid = validateEmail(value);
      setEmailValid(isValid);
    }
    setState({ ...state, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const saveNewUser = async () => {
    if (state.name === '') {
      alert('Por favor, ingresa un nombre');
    } else if (!emailValid) {
      alert('Correo electrónico no válido');
    } else {
      const userData = { ...state, image };
      await addDoc(collection(database, 'usuarios'), userData);
      props.navigation.navigate('UserList');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          onChangeText={(value) => handleChangeText('email', value)}
        />
        {!emailValid && (
          <Text style={styles.errorText}>Correo electrónico no válido</Text>
        )}
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText('phone', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Select Image" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      <View>
        <Button title="Save user" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};

export default CreateUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  errorText: {
    color: 'red',
  },
});
