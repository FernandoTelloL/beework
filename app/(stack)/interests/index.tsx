import { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

const categories = [
  { id: "1", name: "Category 1" },
  { id: "2", name: "Category 2" },
  { id: "3", name: "Category 3" },
  { id: "4", name: "Category 4" },
  { id: "5", name: "Category 5" },
  { id: "6", name: "Category 6" },
  { id: "7", name: "Category 7" },
  { id: "8", name: "Category 8" },
  { id: "9", name: "Category 9" },
  { id: "10", name: "Category 10" },
  { id: "11", name: "Category 11" },
  { id: "12", name: "Category 12" },
  { id: "13", name: "Category 13" },
  { id: "14", name: "Category 14" },
  { id: "15", name: "Category 15" },
  { id: "16", name: "Category 16" },
  { id: "17", name: "Category 17" },
  { id: "18", name: "Category 18" },
  { id: "19", name: "Category 19" },
];

const InterestsScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Contenedor superior */}
      <View className="items-center">
        {/* Círculo gris */}
        <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />

        {/* Título */}
        <Text className="text-2xl text-center font-poppins-bold mb-2">
          What do you want to see on the app?
        </Text>

        {/* Subtítulo */}
        <Text className="text-base font-poppins-regular text-black-800 mt-2 mb-6 text-center">
          Select at least 3 interests to personalize your experience. They will be visible on your profile.
        </Text>
      </View>

      {/* Contenedor de la lista para que el scroll se mantenga fijo en la pantalla */}
      <View className="flex-1">
        <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 8 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16, gap: 10 }}
          renderItem={({ item }) => {
            const isSelected = selectedCategories.includes(item.id);
            return (
              <Pressable
                onPress={() => toggleCategory(item.id)}
                className={`w-[48%] px-4 py-10 border rounded-lg items-center justify-center relative ${isSelected ? "bg-[#DFE2E8]" : "bg-white border-gray-400"
                  }`}
              >
                <Text className="text-black font-poppins-regular text-base">{item.name}</Text>
                {isSelected && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color="black"
                    className="absolute top-2 right-2"
                  />
                )}
              </Pressable>
            );
          }}
        />
      </View>

      {/* Sección de selección y botón Next, siempre visible abajo */}
      <View className="py-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-poppins-regular">
            {selectedCategories.length >= 3 ? "Great Job" : `${selectedCategories.length} of 3 selected`}
          </Text>
          <Pressable
            className={`py-3 px-6 rounded-lg ${selectedCategories.length >= 3 ? "bg-black" : "bg-gray-400"
              }`}
            disabled={selectedCategories.length < 3}
            onPress={() => router.push("/follow")}
          >
            <Text className="text-white font-poppins-bold text-lg">Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default InterestsScreen;
