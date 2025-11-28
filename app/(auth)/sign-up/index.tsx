import { SignUpForm } from '@/components/sign-up-form';
import * as React from 'react';
import { View } from 'react-native';

export default function SignUpScreen() {
  return (
    <View className="w-full h-full sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6">
      <SignUpForm />
    </View>
  );
}
