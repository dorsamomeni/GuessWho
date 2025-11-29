import { Stack } from 'expo-router';

const SCREEN_OPTIONS = {
  headerShown: false,
};
export default function AccountSetupLayout() {
  return <Stack screenOptions={SCREEN_OPTIONS} />;
}
