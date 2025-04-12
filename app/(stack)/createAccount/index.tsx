import { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, useColorScheme } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import useCreateAccountStore from "@/src/modules/auth/context/CreateAccountStore";
import { Formik } from "formik";
import { createAccountSchema } from "@/src/modules/auth/validation/createAccountSchema";
import DateTimePickerModal from "react-native-modal-datetime-picker";



const CreateAccountScreen = () => {
  const { setName, setLastName, setEmail, setBirthDate } = useCreateAccountStore();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const colorScheme = useColorScheme();
  const darkModeEnabled = colorScheme === "dark";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
      keyboardVerticalOffset={100}
    >
      <Formik
        initialValues={{
          name: "",
          lastName: "",
          email: "",
          birthDate: null,
        }}
        validationSchema={createAccountSchema}
        onSubmit={(values) => {
          setName(values.name);
          setLastName(values.lastName);
          setEmail(values.email);
          setBirthDate(values.birthDate!);
          router.push("/(stack)/customizeCreateAccount");
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View className="flex-1 justify-between py-4 w-[350px] mx-auto">
            <View className="items-center">
              <View className="w-12 h-12 bg-gray-300 rounded-full mb-6" />
              <Text className="text-2xl mb-12 font-poppins-bold">Crea tu cuenta</Text>

              {/* Nombre */}
              <View className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4">
                <TextInput
                  className="text-base font-poppins-regular"
                  placeholder="Nombre"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
              </View>
              {touched.name && errors.name && <Text className="text-red-500">{errors.name}</Text>}

              {/* Apellidos */}
              <View className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4">
                <TextInput
                  className="text-base font-poppins-regular"
                  placeholder="Apellidos"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                />
              </View>
              {touched.lastName && errors.lastName && <Text className="text-red-500">{errors.lastName}</Text>}

              {/* Correo electrónico */}
              <View className="w-full border border-gray-300 rounded-md px-4 py-1 mb-4">
                <TextInput
                  className="text-base font-poppins-regular"
                  placeholder="Correo electrónico"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  textContentType="emailAddress"
                />
              </View>
              {touched.email && errors.email && <Text className="text-red-500">{errors.email}</Text>}

              {/* Fecha de nacimiento */}
              <Pressable
                className="w-full border border-gray-300 rounded-md px-4 py-4 mb-4 flex-row justify-between items-center"
                onPress={() => setShowDatePicker(true)}
              >
                <Text className={`font-poppins-regular ${values.birthDate ? "text-black" : "text-gray-400"}`}>
                  {values.birthDate ? formatDate(values.birthDate) : "Fecha de nacimiento"}
                </Text>
                <Ionicons name="calendar" size={24} color="black" />
              </Pressable>
              {touched.birthDate && errors.birthDate && <Text className="text-red-500">{errors.birthDate}</Text>}

              {/* Modal Date Picker */}
              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onConfirm={(date) => {
                  setShowDatePicker(false);
                  setFieldValue("birthDate", date);
                }}
                onCancel={() => setShowDatePicker(false)}
                maximumDate={new Date()} // Evita fechas futuras
                locale="es-ES"
                themeVariant={darkModeEnabled ? "dark" : "light"}
              />
            </View>

            <View className="w-full">
              <Pressable
                className={`py-3 rounded-lg text-base ${Object.keys(errors).length === 0 && Object.values(values).every(Boolean)
                  ? "bg-black"
                  : "bg-gray-400"
                  }`}
                onPress={() => handleSubmit()}
              >
                <Text className="text-white text-[18px] text-center font-poppins-regular">Next</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;
