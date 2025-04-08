import { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import useCreateAccountStore from "@/src/modules/auth/context/CreateAccountStore";

const CreateAccountScreen = () => {
  // Obtenemos los datos y funciones del store
  const { name, lastName, email, birthDate, setName, setLastName, setEmail, setBirthDate } = useCreateAccountStore();

  // Estado para la fecha de nacimiento
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Función para manejar el cambio de fecha
  const handleDateChange = (_event: unknown, selectedDate?: Date): void => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  // Función para formatear la fecha en DD/MM/YYYY
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Verifica si todos los campos están llenos
  const isFormValid = () => {
    return (name?.trim() ?? "") !== "" && (email?.trim() ?? "") !== "";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
      keyboardVerticalOffset={100}
    >
      <View className="flex-1 justify-between p-4">
        {/* Contenedor del formulario */}
        <View className="items-center">
          {/* Avatar */}
          <View className="w-12 h-12 bg-gray-300 rounded-full mb-6" />

          {/* Título */}
          <Text className="text-2xl mb-4 font-poppins-bold">Crea tu cuenta</Text>

          {/* Inputs */}
          <View className="w-full flex-row items-center border border-gray-300 rounded-md px-4 mb-4 py-4 ">
            <TextInput
              className="flex-1 text-base font-poppins-regular py-4 "
              placeholder="Nombre"
              placeholderTextColor="#9CA3AF"
              value={name ?? ""}
              onChangeText={setName}
            />
            {name && name.trim() !== "" && <Ionicons name="checkmark-circle" size={24} color="black" />}
          </View>

          <View className="w-full flex-row items-center border border-gray-300 rounded-md px-4 py-4 mb-4">
            <TextInput
              className="flex-1 text-base font-poppins-regular py-4 "
              placeholder="Apellidos"
              placeholderTextColor="#9CA3AF"
              value={lastName ?? ""}
              onChangeText={setLastName}
            />
            {lastName && lastName.trim() !== "" && <Ionicons name="checkmark-circle" size={24} color="black" />}
          </View>

          <View className="w-full flex-row items-center border border-gray-300 rounded-md px-4 py-4 mb-4">
            <TextInput
              className="flex-1 text-base font-poppins-regular"
              placeholder="Correo electrónico"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              value={email ?? ""}
              onChangeText={setEmail}
            />
            {email && email.trim() !== "" && <Ionicons name="checkmark-circle" size={24} color="black" />}
          </View>

          {/* Input de fecha de nacimiento */}
          <Pressable
            className="w-full flex-row justify-between items-center border border-gray-300 rounded-lg px-4 mb-4 py-4 "
            onPress={() => setShowDatePicker(true)}
          >
            <Text className={`font-poppins-regular ${birthDate ? "text-black" : "text-gray-400"} py-4 `}>
              {birthDate ? formatDate(birthDate) : "Fecha de nacimiento"}
            </Text>
            <Ionicons name="calendar" size={24} color="black" />
          </Pressable>

          {/* DateTimePicker */}
          {showDatePicker && (
            <DateTimePicker
              value={birthDate ?? new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Contenedor del botón */}
        <View className="w-full">
          <Pressable
            className={`py-3 px-6 rounded-lg text-base ${isFormValid() ? "bg-black" : "bg-gray-400"}`}
            onPress={() => {
              router.push("/(stack)/customizeCreateAccount");
              console.log({ name, lastName, email, birthdate: formatDate(birthdate) });
            }}
            disabled={!isFormValid()}
          >
            <Text className="text-white text-[18px] text-center font-poppins-regular ">Next</Text>
          </Pressable>
        </View>
      </View>

    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;
