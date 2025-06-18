import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../app/globals.css";


export default function RootLayout() {
  return (
    <SafeAreaProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
    </Stack>
    </SafeAreaProvider>
  );
}
