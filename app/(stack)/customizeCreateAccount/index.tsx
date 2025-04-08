import { useState } from "react";
import { View, Text, Switch, Pressable } from "react-native";
import { router } from "expo-router";

const CustomizeCreateAccountScreen = () => {
  // Estados para los switches
  const [receiveEmails, setReceiveEmails] = useState(false);
  const [allowDiscovery, setAllowDiscovery] = useState(false);

  return (
    <View className="flex-1 justify-between p-4 font-poppins-regular">
      <View className="items-center">
        {/* Avatar */}
        <View className="w-12 h-12 bg-gray-300 rounded-full mb-6" />

        {/* Título */}
        <Text className="text-2xl mb-4 font-poppins-bold text-center">
          Personaliza tu experiencia
        </Text>

        {/* Configuraciones */}
        <View className="w-full">
          {/* Primera opción */}
          <View className="mb-6">
            <Text className="text-lg mb-1 font-poppins-bold">
              Sácale provecho a la App
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-black-600 text-lg flex-1 pr-4 font-poppins-regular">
                Receive emails about your activity and recommendations
              </Text>
              <Switch
                trackColor={{ false: "#D1D5DB", true: "#01DB72" }}
                thumbColor={receiveEmails ? "#FFFFFF" : "#9CA3AF"}
                onValueChange={() => setReceiveEmails((prev) => !prev)}
                value={receiveEmails}
              />
            </View>
          </View>

          {/* Segunda opción */}
          <View className="mb-6">
            <Text className="text-lg mb-1 font-poppins-bold">
              Connect with people you know
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-black-600 text-lg flex-1 pr-4 font-poppins-regular">
                Let others find your account by your email address
              </Text>
              <Switch
                trackColor={{ false: "#D1D5DB", true: "#01DB72" }}
                thumbColor={allowDiscovery ? "#FFFFFF" : "#9CA3AF"}
                onValueChange={() => setAllowDiscovery((prev) => !prev)}
                value={allowDiscovery}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Botón Next */}
      <Pressable
        className="w-full bg-black py-3 rounded-lg items-center mt-auto"
        onPress={() => {
          router.push("/(stack)/dataConfirmation");
          console.log({ receiveEmails, allowDiscovery });
        }}
      >
        <Text className="text-white font-semibold text-lg">Next</Text>
      </Pressable>
    </View>
  );
};

export default CustomizeCreateAccountScreen;
