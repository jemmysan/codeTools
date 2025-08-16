import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "./themes/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView  style={{ flex: 1, backgroundColor : COLORS.gray}}>
        <StatusBar hidden={true} />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
