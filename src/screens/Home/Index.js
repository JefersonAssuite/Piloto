import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../../services/FirebaseConfig';

export default function Home() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login'); // Redireciona para login após logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à Home!</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
