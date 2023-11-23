/* React Imports */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/* App Component Imports */
import MedButton from '../common/MedButton';
import {ScrollView} from 'native-base';
import Styles from '../../../styles';
import LogoSvg from '../../assets/images/logo.svg';
import Constants from '../../globals/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginService from '../../api/services/Login';

const GetStarted: React.FC = () => {
  /* Const Declarations */

  const {width, height} = useWindowDimensions();
  const isTablet = width > 600; // Customize this threshold as per your needs
  const navigation = useNavigation();

  React.useEffect(() => {
    // This event listener will capture deep links when the app is already running.
    const handleDeepLink = event => {
      handleUrl(event.url);
    };

    // Add the event listener
    const deepLinkListener = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url: url});
      }
    });

    // This function will handle the URL, parse it, and navigate accordingly.
    const handleUrl = async url => {
      console.log(url, "urlllllllll")
      const route = url.replace(/.*?:\/\//g, '');
      const routeName = route.split('/')[4];
      const authHeader = await AsyncStorage.getItem('userToken');

      console.log(routeName, 'route');
      LoginService.VerifyresetPassword(routeName)
        .then(response => {
          console.log(response, 'red');
          if (response?.data?.expires) {
            if (route.includes('password')) {
              if (authHeader == null) {
                navigation.navigate('ResetPassword', {routeName});
              } else {
                navigation.push('BottomTabs');
              }
              console.log('can be used for other urls');
            }
          } else {
            setTimeout(function () {
              Alert.alert(
                'Alert',
                'Password Expired, Contact admin for more details',
                [
                  {
                    text: Constants.OK_TEXT,
                    // onPress: () => {
                    //   navigation.navigate('LoginPage');
                    // },
                  },
                ],
              );
            }, 50);
          }
        })
        .catch(error => {
          console.log('Version error');
        });
    };

    // Clean up the event listener when the component unmounts.
    return () => {
      // Linking.removeEventListener('url', handleDeepLink);
      deepLinkListener.remove();
    };
  }, []);

  return (
    <View style={Styles.container}>
      {/* <Image style={Styles.logoImage} source={require('../../assets/images/logo1.png')} /> */}
      <ScrollView>
        <View style={isTablet ? Styles.walkthroughContainer : Styles.p20}>
          <Text style={Styles.headerText}>After logging in, you can:</Text>
          <View style={Styles.pv10}>
            <Text style={Styles.walkThroughHeaderText}>Access Orders</Text>
            <Text style={Styles.walkThroughHelpText}>
             Payyyyyyyyyyyyyy Screen
            </Text>
          </View>
        
          <View style={Styles.pt15}>
            <MedButton
              title="Get Started"
              onPress={() => navigation.push('LoginPage')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GetStarted;
