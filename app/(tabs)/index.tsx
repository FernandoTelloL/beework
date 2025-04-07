import { Image, StyleSheet, Platform, View, Text } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.body} >Home Screen</Text>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  body: {
    fontSize: 40,
    textAlign: 'center',
  },
});