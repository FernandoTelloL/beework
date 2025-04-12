import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import useCreateAccountStore from "@/src/modules/auth/context/CreateAccountStore";
import { formatDate } from "@/src/utils/dateHelpers";
import { router } from "expo-router";


const DataConfirmationScreen = () => {
  const { name, lastName, email, birthDate, setInvitationToken } = useCreateAccountStore();
  const [loading, setLoading] = useState(false);


  const userData = {
    "firstName": name,
    "lastName": lastName,
    "email": email,
    "avatars": [],
    "roles": [
      "admin"
    ],
  };
  console.log("userData", userData);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer m8yusg7g.qm8yusg7hqm8yusg7i");

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://beework.kuskaya.co/api/membership", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("midata", data);

      if (!response.ok) {
        const errorMessage =
          data?.errors?.[0]?.message || "Error en el registro";
        throw new Error(errorMessage);
      }

      setInvitationToken(data.invitationToken);

      console.log("✅ Respuesta del servidor:", data);

      router.push("/codeVerification");
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-between py-4 font-poppins-regular w-[85%] mx-auto">
      <View className="items-center">
        <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />

        <Text className="text-2xl mb-10 font-poppins-bold text-center">
          Data Confirmation
        </Text>

        <View className="w-full space-y-4">
          {/* Nombre */}
          <View className="w-full flex-row justify-between border border-gray-300 rounded-md px-4 py-3 mb-4">
            <Text className="text-base font-poppins-regular">{userData.firstName} {userData.lastName}</Text>
            <Ionicons name="arrow-forward-circle-outline" size={22} color="black" />
          </View>

          {/* Email */}
          <View className="w-full flex-row justify-between border border-gray-300 rounded-md px-4 py-3 mb-4">
            <Text className="text-base font-poppins-regular">{userData.email}</Text>
            <Ionicons name="arrow-forward-circle-outline" size={22} color="black" />
          </View>

          {/* Fecha de nacimiento */}
          <View className="w-full flex-row justify-between border border-gray-300 rounded-md px-4 py-3 mb-4">
            <Text className="text-base font-poppins-regular">
              {formatDate(birthDate)}
            </Text>
            <Ionicons name="arrow-forward-circle-outline" size={22} color="black" />
          </View>
        </View>

        <Text className="text-sm text-black-500 mt-10 font-poppins-regular">
          By signing up, you agree to our Terms, Privacy Policy, and Cookie use.
        </Text>
      </View>

      <Pressable
        className="w-full bg-black py-3 rounded-lg items-center mt-auto"
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-lg">Sign up</Text>
        )}
      </Pressable>
    </View>
  );
};

export default DataConfirmationScreen;
