import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Pressable, ScrollView, Keyboard, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { UserAvatar } from './user-avatar';
import { pickImage } from '@/utils/pick-image';

export function AccountSetupForm({ onComplete }: { onComplete?: () => void }) {
  const { user, isLoaded } = useUser();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [ready, setReady] = useState(true);

  const keyboardHeight = useSharedValue(0);
  const fadeOpacity = useSharedValue(1);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    
    const showSubscription = Keyboard.addListener(showEvent, (e) => {
      keyboardHeight.value = withTiming(e.endCoordinates.height, { duration: 250 });
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      keyboardHeight.value = withTiming(0, { duration: 250 });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    marginBottom: keyboardHeight.value,
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: withTiming(fadeOpacity.value, { duration: 250 }),
  }));

  useEffect(() => {
    if (username.length >= 4) {
      setReady(true);
      return;
    }
    setReady(false);
  }, [username]);

  const onSubmit = async () => {
    setError('');

    if (!username || username.length < 4) {
      setError('Username must be at least 4 characters.');
      return;
    }
    if (!isLoaded || !user) {
      setError('User not loaded.');
      return;
    }

    setLoading(true);
    try {
      await user.update({ username });
      setLoading(false);

      if (onComplete) {
        onComplete();
      } else {
        router.back();
      }
    } catch (err: any) {
      setLoading(false);
      setError(
        err?.errors?.[0]?.message ||
          err.message ||
          'Failed to update username.'
      );
    }
  };

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <ScrollView
        contentContainerClassName="flex-grow items-center justify-center"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3 items-center justify-center w-full px-4 py-8">
          <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5 w-full max-w-md">
            <Animated.View style={fadeStyle}>
              <CardHeader className="mb-6">
                <CardTitle className="text-center text-3xl sm:text-left">
                  Let's Get You Set Up
                </CardTitle>
                <CardDescription className="text-center sm:text-left">
                  Almost there! Just have to sort out your appearance...
                </CardDescription>
              </CardHeader>
            </Animated.View>
            <CardContent className="gap-6 flex items-center">
              <Text className="text-lg font-semibold">Choose your Avatar</Text>
              <Pressable
                onPress={() => pickImage(isLoaded, user, setUploadingImage)}
                disabled={uploadingImage}
              >
                <View className={uploadingImage ? 'opacity-50' : ''}>
                  <UserAvatar className="size-36" />
                </View>
              </Pressable>
              {uploadingImage && (
                <Text className="text-sm text-muted-foreground">
                  Uploading image...
                </Text>
              )}
              <Text className="text-lg font-semibold">Choose your Username</Text>
              <Input
                value={username}
                placeholder="Username"
                autoCapitalize="none"
                onChangeText={setUsername}
                editable={!loading}
                className="w-64"
                onFocus={() => (fadeOpacity.value = 0)}
                onBlur={() => (fadeOpacity.value = 1)}
              />
              {error ? (
                <Text className="text-red-600 text-xs">{error}</Text>
              ) : null}
              <Animated.View style={fadeStyle}>
                <Button
                  onPress={onSubmit}
                  disabled={loading || !ready}
                  className="w-24 mt-6"
                  variant="secondary"
                >
                  <Text>Let's Play</Text>
                </Button>
              </Animated.View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
