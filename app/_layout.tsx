import { Stack, SplashScreen } from 'expo-router';
import useFrameworkReady from '../hooks/useFrameworkReady';
import {StatusBar} from "expo-status-bar";
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  return (
      <>
          <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="ats/index" />
              <Stack.Screen name="interview/index" />
          </Stack>
        <StatusBar style="auto" />
      </>
  );
}
