import { StyleSheet, Image, Platform, View, Text } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.body} >Explore Screen</Text>
    </View >
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
