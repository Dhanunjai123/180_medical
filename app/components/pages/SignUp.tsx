/* eslint-disable react-native/no-inline-styles */
/* React Imports */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Moment from 'moment';

/* App Component Imports */
import TextInputField from '../common/MedTextInput';
import MedButton from '../common/MedButton';
import DatePicker from 'react-native-date-picker';
import Styles from '../../../styles';
import LoginService from '../../api/services/Login';
import Constants from '../../globals/constants';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FormControl} from 'native-base';
import LogoSvg from '../../assets/images/logo.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../../App';
import {AvoidSoftInputView} from 'react-native-avoid-softinput';

interface signUpFormValues {
  [PatientFirstName: string]: string;
  PatientLastName: string;
  PatientDateOfBirth: string;
}

const initialValues: signUpFormValues = {
  PatientFirstName: '',
  PatientLastName: '',
  PatientDateOfBirth: '',
};

const SignUp: React.FC = () => {
  /* State Declarations */
  const [open, setOpen] = useState(false);
  const [dobDate, setDobDate] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  /* Const Declarations */
  const {width, height} = useWindowDimensions();
  const isTablet = width > 600; // Customize this threshold as per your needs
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const _format = 'MM-DD-YYYY';

  const validateForm = Yup.object().shape({
    PatientFirstName: Yup.string()
      // .max(20, 'Invalid email')
      .required('First Name is required')
      .trim(),
    PatientLastName: Yup.string()
      // .max(20, 'Must be 8 characters')
      .required('Last Name is required')
      .trim(),
    PatientDateOfBirth: Yup.date().required('Date of Birth is Required'),
  });

  // React.useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', e => {
  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();
  //     }),
  //   [navigation],
  // );

  /* Methods */
  /* Handle sign up form submit */
  const handleSubmit = (values: signUpFormValues) => {
    setSpinner(true);

    const filteredData = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== ''),
    );

    console.log(filteredData, "filteredData")
    LoginService.signupVerifyApi(filteredData)
      .then((response: any) => {
        // setTimeout(() => {
        //   setSpinner(false);
        // }, 100);
        console.log(response, 'responseresponseresponse');
        let responseData = response?.isError
          ? response?.data.data
          : response?.data;

        if (response?.isError == false) {
          if ('isFlooded' in responseData) {
            if (responseData.isFlooded == false) {
              if (responseData.isSuccess == true) {
                setTimeout(() => {
                  setSpinner(false);
                  navigation.push('SignupNext', {values, response});
                }, 100);
              } else {
                setTimeout(function () {
                  setSpinner(false);
                  Alert.alert('Create Account', Constants.SIGNUP_VERIFY_ERROR, [
                    {text: 'OK'},
                  ]);
                }, 300);
              }
            } else {
              setTimeout(function () {
                setSpinner(false);
                Alert.alert(
                  'Create Account',
                  'We apologize for the inconvenience. Due to a high volume of attempts, our server is currently unavailable. Please try again later. Thank you for your patience.',
                  [{text: 'OK'}],
                );
              }, 300);
            }
          } else {
            if (responseData.isSuccess == true) {
              navigation.push('SignupNext', {values, response});
            } else {
              setTimeout(function () {
                setSpinner(false);
                Alert.alert('Create Account', Constants.SIGNUP_VERIFY_ERROR, [
                  {text: 'OK'},
                ]);
              }, 300);
            }
          }
        } else {
          let errorMessage = responseData.errors.PatientDateOfBirth
            ? responseData.errors.PatientDateOfBirth[0]
            : Constants.SIGNUP_VERIFY_ERROR;

          setTimeout(function () {
            Alert.alert('Create Account', errorMessage, [{text: 'OK'}]);
          }, 300);
        }
      })
      .catch(error => {
        console.log('error', JSON.stringify(error));
        setTimeout(() => {
          setSpinner(false);
          // Alert.alert('Signup', error.message, [{text: 'OK'}]);
        }, 100);
      });
  };

  /* To Convert Date Object into String */
  const dateObjectToString = (_date_object: any) => {
    const formattedDate = _date_object.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return formattedDate;
  };

  // Handle whitespace in the form
  const validate = (values: signUpFormValues) => {
    const errors: Partial<signUpFormValues> = {};

    Object.keys(values).forEach(key => {
      if (values[key].includes(' ')) {
        errors[key] = 'Whitespace is not allowed.';
      }
    });

    return errors;
  };

  const handleConfirm = (date) => {
    // Get the current date
    const currentDate = new Date();

    // Check if the selected date is before or equal to the current date
    if (date <= currentDate) {
      setDobDate(date);
    }
    setOpen(false);
  };

  return (
    <View style={Styles.container}>
      {/* <View style={Styles.container}> */}
      <Spinner visible={spinner} />
      <AvoidSoftInputView avoidOffset={10} easing="easeIn">
        <ScrollView keyboardShouldPersistTaps="always">
          {/* <Image style={Styles.logoImage} source={require('../../assets/images/logo1.png')} /> */}
          <LogoSvg
            height={isTablet ? 450 : Platform.OS == 'ios' ? 300 : 200}
            width={isTablet ? 820 : '100%'}
          />
          <View style={isTablet ? Styles.backIconContainer : Styles.p20}>
            <Text style={Styles.headerText}>Create Account</Text>
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
                setFieldValue,
              }) => (
                <>
                  <TextInputField
                    placeholder="First Name"
                    onChangeText={handleChange('PatientFirstName')}
                    value={values.PatientFirstName}
                  />
                  {errors.PatientFirstName && touched.PatientFirstName ? (
                    <Text style={Styles.error}>{errors.PatientFirstName}</Text>
                  ) : null}

                  <TextInputField
                    placeholder="Last Name"
                    onChangeText={handleChange('PatientLastName')}
                    value={values.PatientLastName}
                  />
                  {errors.PatientLastName && touched.PatientLastName ? (
                    <Text style={Styles.error}>{errors.PatientLastName}</Text>
                  ) : null}

                  <FormControl w="100%">
                    <TouchableOpacity
                      style={[Styles.inputBox, {flexDirection: 'row'}]}
                      onPress={() => setOpen(!open)}>
                      <View>
                        <MaterialCommunityIcons
                          name="calendar-plus"
                          style={[
                            isTablet
                              ? Styles.calendarIconTab
                              : Styles.calendarIcon,
                          ]}
                        />
                      </View>
                      <View>
                        {dobDate != null ? (
                          <Text
                            style={[
                              {
                                top: isTablet
                                  ? 11
                                  : Platform.OS == 'ios'
                                  ? 10
                                  : 7,
                                paddingLeft: 10,
                                fontSize: 16,
                                color: '#000000',
                              },
                            ]}>
                            {dobDate != null
                              ? Moment(dobDate).format(_format)
                              : 'Date of Birth'}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              {
                                top: isTablet
                                  ? 10
                                  : Platform.OS == 'ios'
                                  ? 11
                                  : 8,
                                paddingLeft: 10,
                                fontSize: isTablet ? 18 : 14,
                                color: '#BFBFBF',
                              },
                            ]}>
                            Date of Birth
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                    <View style={{paddingTop: 10, zIndex: 999}}>
                      {open && (
                        <View style={{zIndex: 999}}>
                          <DatePicker
                            modal
                            open={open}
                            date={
                              dobDate != null ? new Date(dobDate) : new Date()
                            }
                            onConfirm={dateVal => {
                              setOpen(false);
                              setDobDate(dateVal);
                              setFieldValue('PatientDateOfBirth', dateVal);
                              handleConfirm(dateVal);
                            }}
                            onCancel={() => {
                              setOpen(false);
                            }}
                            mode="date"
                            maximumDate={currentDate}
                          />
                        </View>
                      )}
                    </View>
                  </FormControl>
                  {errors.PatientDateOfBirth && touched.PatientDateOfBirth ? (
                    <Text style={Styles.error}>
                      {errors.PatientDateOfBirth}
                    </Text>
                  ) : null}

                  <MedButton
                    title="Verify"
                    // onPress={() => navigation.push('BottomTabs')}
                    style={{marginTop: 15}}
                    onPress={() => handleSubmit()}
                  />

                  <View
                    style={[
                      Styles.viewHeader,
                      {flexDirection: 'row', justifyContent: 'center'},
                    ]}>
                    <Text style={Styles.linkText}>
                      Already have an account?{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.push('LoginPage')}
                      style={{marginTop: -1}}>
                      <Text style={[Styles.linkTextBlue]}>Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </AvoidSoftInputView>
    </View>
  );
};

export default SignUp;
