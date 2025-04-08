import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

const ContactsScreen = () => {
  return (
    <View className="flex-1 bg-white justify-between p-4 font-poppins-regular">
      {/* Contenedor principal */}
      <View className="items-center flex-grow w-full">
        {/* Círculo gris */}
        <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />

        {/* Título */}
        <Text className="text-2xl font-poppins-bold text-center mb-2">
          Connect your address book to find people you may know
        </Text>

        {/* Subtítulo */}
        <Text className="text-base text-black-700 mt-2 mb-6 font-poppins-regular text-center">
          Sync your address book to your account. Don’t worry, you can always change it later.
        </Text>
      </View>

      {/* Botón "Continue" */}
      <Pressable
        className="w-full py-3 rounded-lg items-center bg-black"
        onPress={() => router.push("/interests")}
      >
        <Text className="text-white font-semibold text-lg">Continue</Text>
      </Pressable>
    </View>
  );
};

export default ContactsScreen;
