import { Image, StyleSheet, Platform } from 'react-native';
import Login from '../../src/screens/Login/Index';

export default function HomeScreen() {
  return (
    <Login />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
