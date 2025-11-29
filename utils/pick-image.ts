import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import type { UserResource } from '@clerk/types';
import { getErrorMessage } from './getErrorMessage';

export const pickImage = async (
  isLoaded: boolean,
  user: UserResource | null | undefined,
  setUploadingImage: (value: boolean) => void
) => {
  if (!isLoaded || !user) {
    Alert.alert('Error', 'User not loaded.');
    return;
  }

  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permission Required',
      'Sorry, we need camera roll permissions to select an image!'
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    base64: true,
  });  

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const asset = result.assets[0];

    if (!asset.base64) {
      Alert.alert('Error', 'Failed to process image. Please try again.');
      return;
    }

    setUploadingImage(true);
    try {
      const mimeType = asset.mimeType || 'image/jpeg';
      const dataUri = `data:${mimeType};base64,${asset.base64}`;

      await user.setProfileImage({ file: dataUri });
      setUploadingImage(false);
    } catch (err: unknown) {
      setUploadingImage(false);
      Alert.alert('Error', getErrorMessage(err));
    }
  }
};
