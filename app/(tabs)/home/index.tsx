import React from 'react';
import { View, FlatList, Text } from 'react-native';

import { useRouter } from 'expo-router';
import AdCard from '@/src/shared/components/AdCard';
import useLoginStore from '@/src/modules/auth/context/LoginStore';
import useUserProfileStore from '@/src/modules/auth/context/UserProfileStore';

const ads = [
  {
    id: '1',
    title: 'Completa tu perfil',
    description: 'Actualiza tus datos para obtener mejores recomendaciones.',
    buttonLabel: 'Actualizar',
    backgroundColor: '#E8B931',
    bottomRightIconName: 'checkmark-circle-outline' as const,
  },
  {
    id: '2',
    title: 'Tareas disponibles',
    description: 'Descubre nuevas tareas y ofertas cerca de ti.',
    buttonLabel: 'Buscar',
    backgroundColor: '#CFF7D3',
    bottomRightIconName: 'information-circle-outline' as const,
  },
  {
    id: '3',
    title: 'Al día',
    description: 'No tenemos novedades por el momento, sigue atento a esta sección para poder participar.',
    buttonLabel: 'Ok',
    backgroundColor: '#FFCC00',
    bottomRightIconName: 'star-outline' as const,
  },
  // Agrega más anuncios si lo deseas...
];

export default function HomeScreen() {
  const router = useRouter();

  const { token, email, isAuthenticated, } = useLoginStore()

  const { userId } = useUserProfileStore()
  console.log('userid desde store', userId)

  const renderItem = ({ item }: { item: typeof ads[0] }) => (
    <AdCard
      title={item.title}
      description={item.description}
      buttonLabel={item.buttonLabel}
      backgroundColor={item.backgroundColor}
      bottomRightIconName={item.bottomRightIconName}
      onClose={() => {
        // Aquí podrías eliminar la card de la lista o marcarla como "cerrada"
        console.log('Cerrar anuncio', item.id);
      }}
    // onPressButton={() => {
    //   // Navega a una pantalla de detalle o realiza otra acción
    //   router.push(`/ad/${item.id}`);
    // }}
    />
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">

      <View>
        <Text>miToken: {token}</Text>
        <Text>micorreo: {email}</Text>
        <Text>isAuthenticated: {isAuthenticated ? 'true' : 'false'}</Text>


      </View>

      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}
