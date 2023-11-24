/* React Imports */
import React, {useState, useEffect} from 'react';
import {
  useColorScheme,
  StatusBar,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';

/* App Component Imports */
import MedTheme from './app/globals/MedTheme';
import LoginPage from './app/components/pages/LoginPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from './app/components/pages/SignUp';
import GetStarted from './app/components/pages/GetStarted';
import BottomTabs from './app/components/pages/BottomTabs';
import DashboardService from './app/api/services/Dashboard';
import VersionNumber from 'react-native-version-number';
import {compareVersions} from 'compare-versions';
import BiometricScreen from './app/Biometrics/Biometric';

// Declared the stack
export type AppStackParamList = {
  BottomTabs: undefined;
  LoginPage: undefined;
  SignUp: undefined;
};

export const MessageBadge = React.createContext(null as any);

const Stack = createNativeStackNavigator<AppStackParamList>();

function App(): JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';
  const [authHeader, setAuthHeader] = useState<string | null>(null);
  const [messageBadge, setMessageBadge] = useState<number | null>(0);

  // OneSignal Initialization - Have to update in the env file
  OneSignal.setAppId('e6d5dd45-d6a3-4c7f-9541-24fbaa748eda');

  useEffect(() => {
    getAppVersion();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const authHeader = await AsyncStorage.getItem('userToken');
      setAuthHeader(authHeader);
    }

    fetchData();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (authHeader == null) {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('rgb(255, 255, 255)');
  } else {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('rgb(13, 54, 68)');
  }

  const getAppVersion = async () => {
    DashboardService.getVersionNumber()
      .then(response => {
        console.log(
          'Version check',
          response.data.appVersion,
          VersionNumber.buildVersion,
        );
        const outputString = response.data.appVersion.replace(/[A-Za-z]/g, '');
        if (compareVersions(VersionNumber.appVersion, outputString) < 0) {
          storeCheck();
        } else {
          console.log('Version Same');
        }
      })
      .catch(error => {
        console.log('Version error');
      });
  };

  const storeCheck = async () => {
    setTimeout(() => {
      Alert.alert('Alert', 'Please update your app to the latest version', [
        {
          text: 'OK',
          onPress: () =>
            Platform.OS === 'android'
              ? Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.one80medicalpatient',
                )
              : Linking.openURL(
                  'https://testflight.apple.com/v1/app/6451387765?build=121649201',
                ),
        },
      ]);
    }, 2000);
  };

  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: '#0D3644',
    },
    gestureEnabled: false,
    headerTintColor: '#fff',
  };

  return (
    <NativeBaseProvider theme={MedTheme}>
      <NavigationContainer independent={true}>
        <MessageBadge.Provider
          value={{
            messageBadge: messageBadge,
            setMessageBadge: setMessageBadge,
          }}>

          {authHeader != null && (
            <>

              <Stack.Navigator
                initialRouteName="BottomTabs"
                screenOptions={globalScreenOptions}>
                <Stack.Screen
                  name="BottomTabs"
                  component={BottomTabs}
                  options={{headerShown: false, headerBackTitle: ''}}
                />
                <Stack.Screen
                  name="LoginPage"
                  component={LoginPage}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="GetStarted"
                  component={GetStarted}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </>
          )}
          {authHeader == null && (
            <>
              <Stack.Navigator
                initialRouteName="BiometricScreen"
                screenOptions={{gestureEnabled: false}}>
                <Stack.Screen
                  name="BiometricScreen"
                  component={BiometricScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="GetStarted"
                  component={GetStarted}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="LoginPage"
                  component={LoginPage}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{headerShown: false}}
                />
                  <Stack.Screen
                  name="BottomTabs"
                  component={BottomTabs}
                  options={{headerShown: false, headerBackTitle: ''}}
                />

              </Stack.Navigator>
            </>
          )}
        </MessageBadge.Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
