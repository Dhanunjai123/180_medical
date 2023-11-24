/* eslint-disable prettier/prettier */
// BiometricScreen.js
import React, {useState,useEffect} from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import MedButton from '../components/common/MedButton';
import {useNavigation} from '@react-navigation/native';

const BiometricScreen = () => {
  console.log("before biot")
    const [isAuthenticate, setIsAuthenticate] = useState(false);

  const rnBiometrics = new ReactNativeBiometrics();
  const [biometricType, setBiometricType] = useState(null);
  const navigation = useNavigation<any>();

  const checkBiometrics = async () => {
     console.log("before biometry")
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported');
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported',biometryType);
        // navigation.navigate('GetStarted')
      } else {
        console.log('Biometrics not supported');
      }

    } catch (error) {
        navigation.navigate('LoginPage')
    }
  };

  const authenticateBiometrics = async () => {
    try {
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate',
      });

      if (success) {
         setIsAuthenticate(true)
         navigation.navigate('SignUp')
      } else {
        navigation.navigate('LoginPage')
      }
    } catch (error) {
      console.error(error);
      navigation.navigate('SignUp')
    }
  };

  useEffect(() => {
    // checkBiometrics()
     if(!isAuthenticate){
        authenticateBiometrics()
     }
  }, [])


  return (
    <View style={styles.container}>
      {/* <Text style={styles.message}>Authenticate to access the page</Text> */}
      {/* <Text style={styles.cancelButton} onPress={() => onAuthenticate(false)}>
        Cancel
      </Text>
      <Text style={styles.authButton} onPress={handleBiometricAuth}>
        Authenticate
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    message: {
      fontSize: 18,
      marginBottom: 20,
    },
    cancelButton: {
      fontSize: 16,
      color: 'red',
      marginBottom: 10,
      textAlign: 'center',
    },
    authButton: {
      fontSize: 16,
      color: 'blue',
      textAlign: 'center',
    },
  });

export default BiometricScreen;
