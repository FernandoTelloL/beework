import { Redirect, Slot } from 'expo-router';
import { Text, View } from 'react-native';



export default function HomeScreen() {
  return (
    <View className='flex-1 justify-center items-center' >
      <Text className='text-6xl text-red-800' >Home Screen</Text>
    </View >

  );
}
