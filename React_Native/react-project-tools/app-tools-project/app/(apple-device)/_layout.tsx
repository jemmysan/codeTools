import { Tabs } from 'expo-router';

export default function AppleDeviceLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Accueil',
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Magasin',
        }}
      />
      <Tabs.Screen
        name="divers"
        options={{
          title: 'Divers',
        }}
      />
    </Tabs>
  );
}
