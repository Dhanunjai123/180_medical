/* eslint-disable prettier/prettier */
// BiometricScreen.js
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import MedButton from '../components/common/MedButton';

const BiometricScreen = () => {
  const rnBiometrics = new ReactNativeBiometrics();
  const [biometricType, setBiometricType] = useState(null);

  const checkBiometrics = async () => {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();
      if (available && biometryType) {
        setBiometricType(biometryType);
      } else {
        console.log('Biometrics not available on this device.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const authenticateBiometrics = async () => {
    try {
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate',
      });

      if (success) {
        console.log('Biometric authentication successful!');
      } else {
        console.log('Biometric authentication failed or was cancelled.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>
        {biometricType
          ? `Biometric Type: ${biometricType}`
          : 'Checking biometrics...'}
      </Text>
      <View  style={{ flex:1,flexDirection:'row',rowGap:10,justifyContent: 'space-evenly', alignItems: 'center'}}>
      <View>
        <MedButton title="CheckBiometrics" onPress={checkBiometrics} />
      </View>

      <View>
        <MedButton
          title="Authenticate"
          onPress={authenticateBiometrics}
        />
      </View>
      </View>
    </View>
  );
};

export default BiometricScreen;
