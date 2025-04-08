import { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";

const MAX_CHARACTERS = 160;

const DescriptionScreen = () => {
  const [bio, setBio] = useState("");

  const handleChangeText = (text: string) => {
    if (text.length <= MAX_CHARACTERS) {
      setBio(text);
    }
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-between p-4 font-poppins-regular">
        {/* Contenedor superior */}
        <View className="items-center flex-grow w-full">
          {/* Círculo gris */}
          <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />

          {/* Título */}
          <Text className="text-2xl font-poppins-bold text-center mb-2">Describe yourself</Text>

          {/* Subtítulo */}
          <Text className="text-base text-black-600 mt-2 mb-6 font-poppins-regular text-center">
            What makes you special? Don’t think too hard, just have fun with it
          </Text>

          {/* Input tipo text area */}
          <View className="w-full border border-gray-300 rounded-md p-3 mb-2">
            <TextInput
              className="text-base font-poppins-regular h-24 text-black"
              placeholder="Your bio"
              placeholderTextColor="#A0A0A0"
              multiline
              value={bio}
              onChangeText={handleChangeText}
            />
            {/* Contador de caracteres */}
            <Text className="text-right text-gray-400">{bio.length}/{MAX_CHARACTERS}</Text>
          </View>
        </View>

        {/* Botón Next */}
        <Pressable
          className="w-full py-3 rounded-lg items-center bg-black"
          onPress={() => router.push("/userName")}
          disabled={bio.length === 0}
        >
          <Text className="text-white font-semibold text-lg">Next</Text>
        </Pressable>
      </View>

    </KeyboardAvoidingView>


  );
};

export default DescriptionScreen;
