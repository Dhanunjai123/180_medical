/* eslint-disable prettier/prettier */

import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  ScrollView,
  NativeModules,
  Platform,
  StatusBar,
  Linking,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
// import Logo from '../../assets/images/logo.svg'
import LogoSvg from '../../assets/images/logo.svg';
import ChatSvg from '../../assets/images/talkdesk.svg';
import {AvoidSoftInputView} from 'react-native-avoid-softinput';

/* App Component Imports */
import TextInputField from '../common/MedTextInput';
import MedButton from '../common/MedButton';
import Styles from '../../../styles';
import LoginService from '../../api/services/Login';
import Constants from '../../globals/constants';
import {KeyboardAvoidingView} from 'native-base';
import VersionNumber from 'react-native-version-number';
import {compareVersions} from 'compare-versions';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import OneSignal from 'react-native-onesignal';
import DeviceInfo from 'react-native-device-info';
import DashboardService from '../../api/services/Dashboard';
import ActionButton from 'react-native-action-button';
import ChatWebView from './ChatWebView';
import {color} from 'framer-motion';
import {WebView} from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../globals/colors';
import ErrorPage from './ErrorPage';
import BiometricScreen from '../../Biometrics/Biometric';

interface LoginPageValues {
  [username: string]: string;
  password: string;
  browserfingerprint: string;
}

const initialValues: LoginPageValues = {
  username: '',
  password: '',
  browserfingerprint: 'mobile',
};

const LoginPage: React.FC = () => {
  // OneSignal.setAppId('e6d5dd45-d6a3-4c7f-9541-24fbaa748eda');
  // const data = await OneSignal.getDeviceState();
  // const userDate = await OneSignal.getUserId();

  // const player_id = data;

  /* State Declarations */
  const [spinner, setSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notificatioDetails, setNotificatioDetails] = useState<any>({});
  const [deviceName, setDeviceName] = useState('');
  const [deviceOS, setDeviceOS] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [showChat, setShowChat] = useState(false);
  //  const { setUser } = useContext(AuthContext);
  const [errorType, setErrorType] = useState('');
  const [attempts, setAttempts] = useState(0);

  /* Const Declarations */
  const {width, height} = useWindowDimensions();
  const isTablet = width > 600; // Customize this threshold as per your needs
  const navigation = useNavigation<any>();

  const validateForm = Yup.object().shape({
    username: Yup.string()
      .email('Invalid email')
      .required('Email is required')
      .matches(/^\S+@\S+\.\S+$/, 'Please enter a valid email')
      .max(77, 'Email too long')
      .trim(),
    password: Yup.string()
      // .max(20, 'Must be 8 characters')
      .required('Password is required')
      .trim(),
  });

  useEffect(() => {
    getAppVersion();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getOneSignalDetails();
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchDeviceInfo();
    }, 100);
  }, []);

  /* Methods */

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

  const getOneSignalDetails = async () => {
    OneSignal.setAppId('e6d5dd45-d6a3-4c7f-9541-24fbaa748eda');
    // await OneSignal.getDeviceState();
    const userDate = await OneSignal.getDeviceState();
    // const deviceDate = await OneSignal.d
    // const player_id = data;
    setNotificatioDetails(userDate);
  };

  const fetchDeviceInfo = async () => {
    const name = await DeviceInfo.getDeviceName();
    const model = await DeviceInfo.getModel();
    const os = await DeviceInfo.getSystemName();
    setDeviceName(name);
    setDeviceModel(model);
    setDeviceOS(os);
  };

  /* Handle login form submit */
  const handleSubmit = async (values: LoginPageValues) => {
    // setSpinner(true);
    console.log(values);

    if (attempts < 2) {
      setAttempts(state => state + 1);
      setErrorType('INVALID_LOGIN');
    } else {
      setErrorType('MAX_ATTEMPTS');
    }
    // OneSignal.setAppId('e6d5dd45-d6a3-4c7f-9541-24fbaa748eda');
    // const userDate = await OneSignal.getDeviceState();
    // let data = {
    //   // username: 'antolarence@jamngroup.com',
    //   // password: '123456',
    //   username: values.username,
    //   password: values.password,
    //   browserfingerprint: 'mobile',

      // browserfingerprint: values.browserfingerprint,
      // device: {
      //   appid: 'e6d5dd45-d6a3-4c7f-9541-24fbaa748eda',
      //   playerid:
      //     notificatioDetails.userId == undefined
      //       ? userDate?.userId
      //       : notificatioDetails.userId,
      //   devicetype: Platform.OS == 'ios' ? 0 : 1,
      //   devicemodel: deviceModel,
      //   deviceOS: deviceOS,
      // },
    // };
    // StatusBar.setBarStyle('dark-content');
    // StatusBar.setBackgroundColor('rgb(255, 255, 255)');

    // // Handle form submission here
    // // values.username = values.username.toLowerCase();
    // LoginService.loginApi(data)
    //   .then(async response => {
    //     // navigation.navigate('BottomTabs');
    //     if (response.status == 400) {
    //       if (attempts < 2) {
    //         setAttempts(state => state + 1);
    //         setErrorType('INVALID_LOGIN');
    //       } else {
    //         setErrorType('MAX_ATTEMPTS');
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.log('error', JSON.stringify(error));
    //     setTimeout(() => {
    //       setSpinner(false);

    //       Alert.alert('Login', Constants.LOGIN_ERROR, [
    //         {text: Constants.OK_TEXT},
    //       ]);
    //     }, 50);
    //   });
  };

  // To change the password type
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = useCallback(() => {
    var userFullName;
    const getUserName = async () => {
      // const userLastName = await AsyncStorage.getItem('userLastName');
      userFullName = await AsyncStorage.getItem('userName');
    };
    getUserName();
  }, []);

  useFocusEffect(handleFocus);

  // Handle whitespace in the form
  const validate = (values: LoginPageValues) => {
    const errors: Partial<LoginPageValues> = {};

    Object.keys(values).forEach(key => {
      if (values[key].includes(' ')) {
        errors[key] = 'Whitespace is not allowed.';
      }
    });

    return errors;
  };

  return (
    <View style={Styles.container}>
      <Spinner visible={spinner} />
      <>
        <AvoidSoftInputView avoidOffset={10} easing="easeIn" style={{flex:1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="always">
            <LogoSvg
              height={isTablet ? 450 : Platform.OS == 'ios' ? 300 : 200}
              width={isTablet ? 820 : '100%'}
            />
            <BiometricScreen/>
            {errorType && errorType.length > 0 ? (
              <View style={{justifyContent:'center',height:500}}>
                <ErrorPage type={errorType} onPress={() => setErrorType('')} />
              </View>
            ) : (
              <View style={isTablet ? Styles.backIconContainer : Styles.p20}>
                <View>
                  <Text style={Styles.headerText}>Sign In</Text>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validateForm}

                    // validateOnBlur={false}
                    // validateOnChange={false}
                    // validate={validate}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                    }) => (
                      <>
                        <TextInputField
                          placeholder="Email Address"
                          onChangeText={handleChange('username')}
                          value={values.username}
                          keyboard="email-address"
                          autoCapitalize="none"
                        />
                        {errors.username && touched.username ? (
                          <Text style={Styles.error}>{errors.username}</Text>
                        ) : null}

                        <View>
                          <TextInputField
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            value={values.password}
                            secureTextEntry={!showPassword}
                          />
                          <TouchableOpacity
                            onPress={togglePasswordVisibility}
                            style={Styles.eyeIcon}>
                            {/* <Icon name={showPassword ? 'eye' : 'eye-off'} size={22} /> */}
                            {values.password ? (
                              <Icon
                                name={showPassword ? 'eye' : 'eye-off'}
                                size={22}
                                color={'black'}
                              />
                            ) : (
                              ''
                            )}
                          </TouchableOpacity>
                        </View>

                        {errors.password && touched.password ? (
                          <Text style={Styles.error}>{errors.password}</Text>
                        ) : null}

                        {/* <View style={Styles.forgotContainer}>
                      <View style={Styles.contentFgContainer}>
                        <Text>&nbsp;</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('ForgetPassword')}>
                        <Text
                          style={[Styles.linkTextBlue, {textAlign: 'right'}]}>
                          Forgot Password?
                        </Text>
                      </TouchableOpacity>
                    </View> */}

                        <View style={Styles.btnContainer}>
                          <MedButton
                            title="Sign In"
                            // onPress={() => navigation.push('BottomTabs')}
                            onPress={() => handleSubmit()}
                          />
                        </View>

                        {/* <View
                      style={[
                        Styles.viewHeader,
                        {flexDirection: 'row', justifyContent: 'center'},
                      ]}>
                      <Text style={Styles.linkText}>
                        Don't have an account?{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.push('SignUp', {})}>
                        <Text style={[Styles.linkTextBlue]}>Sign Up</Text>
                      </TouchableOpacity>
                    </View> */}
                      </>
                    )}
                  </Formik>
                </View>

                <View style={Styles.terms}>
                  <Text style={Styles.termsContainer}>
                    This app is properly of Convatec and 180 Medical and is for
                    business use only. By logging onto the app you consent to
                    the following. You are a 180 Medical Sales Rep and
                    authorized by 180 Medical to access this app. If you do not
                    accept this condition do not attempt to access the App.
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        </AvoidSoftInputView>
        {/* <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            console.log('hi');
          }}
        /> */}
      </>
    </View>
  );
};

export default LoginPage;
