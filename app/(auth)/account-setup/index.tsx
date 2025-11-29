import { AccountSetupForm } from '@/components/account-setup-form';
import * as React from 'react';
import { View } from 'react-native';

export default function AccountSetupScreen() {
  return (
    <View className="w-full h-full sm:flex-1">
      <AccountSetupForm />
    </View>
  );
}
