import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

const AllowNotificationScreen = () => {
  const [allowed, setAllowed] = useState(false);

  return (
    <View className="flex-1 bg-white justify-between p-4 font-poppins-regular">
      {/* Contenedor principal */}
      <View className="items-center flex-grow w-full">
        {/* Círculo gris */}
        <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />

        {/* Título */}
        <Text className="text-2xl font-poppins-bold text-center mb-2">
          Turn on notifications
        </Text>

        {/* Subtítulo */}
        <Text className="text-base text-black-600 mt-2 mb-6 font-poppins-regular text-center">
          Get the most out of the app by staying up to date with what’s happening.
        </Text>
      </View>

      {/* Botón "Allow Notifications" */}
      <Pressable
        className={`w-full flex-row items-center justify-center py-3 rounded-lg ${allowed ? "bg-green-600" : "bg-black"
          }`}
        onPress={() => setAllowed(!allowed)}
      >
        <Text className="text-white font-semibold text-lg mr-2">
          {allowed ? "Notifications enabled" : "Allow notifications"}
        </Text>
        {allowed && <Ionicons name="checkmark-circle" size={24} color="white" />}
      </Pressable>

      {/* Botón "Next" */}
      <Pressable
        className="w-full py-3 rounded-lg items-center bg-black mt-3"
        onPress={() => router.push("/contacts")}
      >
        <Text className="text-white font-semibold text-lg">Next</Text>
      </Pressable>
    </View>
  );
};

export default AllowNotificationScreen;
