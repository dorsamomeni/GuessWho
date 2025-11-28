import { SignInForm } from '@/components/sign-in-form';
import * as React from 'react';
import { ScrollView, View } from 'react-native';

export default function SignInScreen() {
  return (
    <View className="w-full h-full sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6">
      <SignInForm />
    </View>
  );
}
