// ErrorScreen.tsx

import React, {FC, useEffect} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import Constants from '../../globals/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native'; // Import the required hooks from React Navigation

interface ErrorScreenProps {
  navigation?: string;
  errorType: any;
}
const ErrorScreen: FC<ErrorScreenProps> = ({navigation, errorType}) => {
  const navigate = useNavigation();

  useEffect(() => {
    if (errorType == 'unauthorized') {
      callUnauthorized();
    } else if (errorType == 'network') {
      callNetworkError();
      console.log('Network Error');
    }
  }, []);

  const callUnauthorized = () => {
    setTimeout(function () {
      Alert.alert('Alert', 'Session Expired, Please log in again', [
        {
          text: Constants.OK_TEXT,
          onPress: async () => {
            await AsyncStorage.clear();
            navigate.push('LoginPage', {});
          },
        },
      ]);
    }, 50);
  };

  const callNetworkError = () => {
    setTimeout(function () {
      Alert.alert('Alert', 'Network Error', [
        {
          text: Constants.OK_TEXT,
          onPress: async () => {
            await AsyncStorage.clear();
            navigate.push('LoginPage', {});
          },
        },
      ]);
    }, 50);
  };

  return (
    <View>
      <Text>An error occurred: {errorType}</Text>
    </View>
  );
};

export default ErrorScreen;
