import { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { router } from "expo-router";

interface User {
  id: string;
  name: string;
  username: string;
  description: string;
}

const users: User[] = [
  { id: "1", name: "Leo Messi", username: "@leo.messi", description: "Football star" },
  { id: "3", name: "National Geographic", username: "@ng", description: "Nature and photos" },
  { id: "4", name: "BBC", username: "@bbc", description: "World news" },
  { id: "5", name: "CNN", username: "@cnn", description: "World news" },
  { id: "6", name: "Cristiano Ronaldo", username: "@cr7", description: "Soccer legend" },
  { id: "7", name: "Neymar Jr", username: "@neymar", description: "Brazilian forward" },
  { id: "8", name: "Elon Musk", username: "@elonmusk", description: "Tesla & SpaceX CEO" },
  { id: "9", name: "NASA", username: "@nasa", description: "Exploring the universe" },
  { id: "10", name: "Bill Gates", username: "@billgates", description: "Philanthropist & Microsoft" },
  { id: "11", name: "The New York Times", username: "@nytimes", description: "Breaking news & journalism" },
  { id: "12", name: "Jeff Bezos", username: "@jeffbezos", description: "Amazon founder" },
  { id: "13", name: "Oprah Winfrey", username: "@oprah", description: "Talk show host & media mogul" },
  { id: "14", name: "LeBron James", username: "@kingjames", description: "Basketball legend" },
  { id: "15", name: "Netflix", username: "@netflix", description: "Streaming entertainment" },
  { id: "16", name: "Barack Obama", username: "@barackobama", description: "44th U.S. President" },
  { id: "17", name: "Tesla", username: "@tesla", description: "Electric cars & AI" },
  { id: "18", name: "Google", username: "@google", description: "Tech & AI leader" },
  { id: "19", name: "Spotify", username: "@spotify", description: "Music streaming service" },
  { id: "20", name: "Mark Zuckerberg", username: "@zuck", description: "Meta (Facebook) CEO" },
  { id: "21", name: "Taylor Swift", username: "@taylorswift", description: "Singer-songwriter" },
  { id: "22", name: "Kylie Jenner", username: "@kyliejenner", description: "Beauty & fashion entrepreneur" },
  { id: "23", name: "NASA Mars", username: "@marsrover", description: "Updates from the Red Planet" },
  { id: "24", name: "FC Barcelona", username: "@fcbarcelona", description: "Football club" },
  { id: "25", name: "Real Madrid", username: "@realmadrid", description: "Football club" },
  { id: "26", name: "Amazon", username: "@amazon", description: "E-commerce & cloud services" },
  { id: "27", name: "Apple", username: "@apple", description: "Innovation & technology" },
  { id: "28", name: "Microsoft", username: "@microsoft", description: "Software & cloud computing" },
  { id: "29", name: "Dua Lipa", username: "@dualipa", description: "Pop star & singer" },
  { id: "30", name: "NASA Webb Telescope", username: "@nasajwst", description: "Deep space exploration" },
  { id: "31", name: "SpaceX", username: "@spacex", description: "Revolutionizing space travel" },
  { id: "32", name: "Cristiano Ronaldo Jr", username: "@cr7jr", description: "Future football star" },
  { id: "33", name: "FC Bayern", username: "@fcbayern", description: "German football club" },
  { id: "34", name: "Forbes", username: "@forbes", description: "Business & finance news" },
  { id: "35", name: "Harvard University", username: "@harvard", description: "Education & research" },
  { id: "36", name: "MIT", username: "@mit", description: "Technology & innovation" }
];


const FollowScreen = () => {
  const [following, setFollowing] = useState<string[]>([]);

  const toggleFollow = (id: string) => {
    setFollowing((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Circulo gris */}
      <View className="items-center">
        <View className="w-16 h-16 bg-gray-300 rounded-full mb-6" />
        <Text className="text-2xl font-poppins-bold mt-5 mb-6">Don’t miss out</Text>
        <Text className="text-base text-center font-poppins-regular text-black-800">
          When you follow someone, you’ll see their feed in your Timeline. You’ll also get more relevant recommendations.
        </Text>
        <Text className="text-2xl font-poppins-bold ml-8 mt-10 mb-10 w-full">Follow 1 or more accounts</Text>
      </View>

      {/* Lista de usuarios */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isFollowing = following.includes(item.id);
          return (
            <View className="flex-row items-center p-4">
              {/* Avatar */}
              <View className="w-12 h-12 bg-gray-300 rounded-full" />
              {/* Información */}
              <View className="ml-4 flex-1">
                <Text className="font-poppins-bold text-lg">{item.name}</Text>
                <Text className="font-poppins-regular text-lg text-black">{item.username}</Text>
                <Text className="font-poppins-regular text-lg text-black">{item.description}</Text>
              </View>
              {/* Botón Follow */}
              <Pressable
                onPress={() => toggleFollow(item.id)}
                className={`px-4 py-1 rounded-xl ${isFollowing ? "bg-gray-300" : "bg-black"
                  }`}
              >
                <Text className={`font-poppins-regular text-lg px-2 py-4 ${isFollowing ? "text-gray-700, text-base" : "text-white"}`}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
      {/* Botón Next */}
      <View className="p-4">
        <Pressable
          onPress={() => router.push("/(tabs)/home")}
          disabled={following.length === 0}
          className={`py-3 rounded-lg text-center ${following.length > 0 ? "bg-black" : "bg-gray-400"
            }`}
        >
          <Text className="text-white text-lg text-center font-poppins-bold">Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FollowScreen;
