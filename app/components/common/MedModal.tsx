/* React Imports */
import React, {FC, useState} from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AvoidSoftInputView} from 'react-native-avoid-softinput';

/* App Components Imports*/
import Colors from '../../globals/colors';
import Styles from '../../../styles';
import TextInputField from './MedTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileService from '../../api/services/Profile';
import Constants from '../../globals/constants';

interface updateContactFormValues {
  UpdateContactField: string;
}

interface MedModalProps {
  isModalVisible: boolean;
  onClose: () => void;
  modalHeader: string;
  handleSubmit: (value: updateContactFormValues) => void;
  placeholder: string;
  type?: string;
  contactName?: string;
  initialData?: any; // Edit object
  handleDeleteSubmit: () => void;
  contactData?: any;
  fullData?: any;
}

const MedModal: FC<MedModalProps> = ({
  isModalVisible,
  onClose,
  modalHeader,
  handleSubmit,
  placeholder,
  type = 'email',
  contactName = 'Contact Name',
  initialData = '',
  handleDeleteSubmit,
  contactData,
  fullData,
}) => {
  /* Const Declaration */
  const {width, height} = useWindowDimensions();
  const isTablet = width > 600; // Customize this threshold as per your needs

  /* State Declaration */
  const [spinner, setSpinner] = useState(false);

  const initialValues: updateContactFormValues = {
    UpdateContactField: initialData,
  };

  // const validateForm = Yup.object().shape({
  //   UpdateContactField: Yup.string().required('Field is required').trim(),
  // });

  const validateForm = Yup.object().shape({
    UpdateContactField: Yup.string()
      .test('is-email-or-phone', 'Invalid format', value => {
        if (!value) {
          return true;
        } // Allow empty values
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$/; // Update the regex as per your phone number format
        return emailRegex.test(value) || phoneRegex.test(value);
      })
      .required('Field is required'),
  });

  /* Methods */

  // To make email or phone number as primary
  const makePrimary = () => {
    setSpinner(true);
    ProfileService.makePhoneEmailPrimary(
      fullData.patientContactId,
      contactData.patientContactPhoneId,
      contactData.patientContactEmailId,
      type,
    ).then(response => {
      setTimeout(() => {
        setSpinner(false);
      }, 100);

      if (response?.status == 200) {
        if (!response.data) {
          setTimeout(function () {
            let errorMessage = Constants.CONTACT_ERROR; // change to unable to create contact message
            Alert.alert(Constants.CONTACTS_TEXT, errorMessage, [
              {text: Constants.OK_TEXT},
            ]);
          }, 50);
        } else {
          setTimeout(function () {
            Alert.alert(Constants.CONTACTS_TEXT, 'Primary contact updated', [
              {
                text: Constants.OK_TEXT,
                onPress: () => {
                  onClose();
                },
              },
            ]);
          }, 50);
        }
      } else {
        // Error message from server side validation or any other error occurred during the request/response cycle

        let responseData = response?.isError
          ? response?.data.data
          : response?.data;

        if ('isError' in response && response?.isError) {
          if (!responseData.isValid) {
            setTimeout(function () {
              let errorMessage = responseData.errorMessages
                ? responseData.errorMessages[0]
                : Constants.CONTACT_ERROR;
              Alert.alert(Constants.CONTACTS_TEXT, errorMessage, [
                {text: Constants.OK_TEXT},
              ]);
            }, 50);
          }
        }
      }
    });
  };

  // const handleBackgroundPress = () => {
  //   // Handle clicking outside the modal to dismiss it
  //   console.log("333333333")
  //   if (isModalVisible) {
  //     onClose();
  //     Keyboard.dismiss();
  //   }
  // };

  const handleBackgroundPress = () => {
    // Handle clicking on the background/margins to dismiss the keyboard
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
      <View>
        <Modal
          isVisible={isModalVisible}
          animationInTiming={1}
          animationOutTiming={1}
          hideModalContentWhileAnimating={true}
          backdropTransitionInTiming={1}
          backdropTransitionOutTiming={1}
          onBackdropPress={handleBackgroundPress}
          useNativeDriver={true}
          scrollOffsetMax={400 - 300}>
          <View style={Styles.smModelLayout}>
            <View style={Styles.contactHeader}>
              <View>
                <Text style={Styles.modalHeader}>{modalHeader}</Text>
              </View>
              <View style={[Styles.headerRight, {marginRight: -18}]}>
                <TouchableOpacity style={{top: 5}} onPress={() => onClose()}>
                  <MaterialCommunityIcons
                    name="window-close"
                    style={[
                      {
                        fontSize: 20,
                        fontWeight: '300',
                        color: 'gray',
                        width: 50,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={Styles.flexColumn}>
              <AvoidSoftInputView avoidOffset={10} easing="easeIn">
                <ScrollView>
                  <View style={[Styles.p20, {paddingTop: 0}]}>
                    {!type.includes('delete') ? (
                      <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validateForm}>
                        {({
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          values,
                          errors,
                          touched,
                        }) => (
                          <>
                            <View>
                              <View>
                                {initialData == '' && (
                                  <Text
                                    style={[Styles.linkText, {paddingTop: 0}]}>
                                    Please enter the {type} you would like to
                                    add for{' '}
                                    <Text style={{fontWeight: '800'}}>
                                      {contactName}
                                    </Text>
                                    .
                                  </Text>
                                )}
                              </View>
                              {initialData == '' ? (
                                <TextInputField
                                  placeholder={placeholder}
                                  onChangeText={handleChange(
                                    'UpdateContactField',
                                  )}
                                  value={values.UpdateContactField}
                                  selectTextOnFocus={true}
                                  editable={true}
                                  keyboard={
                                    type == 'phone number'
                                      ? 'phone-pad'
                                      : 'default'
                                  }
                                />
                              ) : (
                                <TextInputField
                                  placeholder={placeholder}
                                  onChangeText={handleChange(
                                    'UpdateContactField',
                                  )}
                                  value={values.UpdateContactField}
                                  selectTextOnFocus={contactData.canDelete}
                                  editable={contactData.canDelete}
                                  keyboard={
                                    type == 'phone number'
                                      ? 'phone-pad'
                                      : 'default'
                                  }
                                />
                              )}
                              {errors.UpdateContactField &&
                              touched.UpdateContactField ? (
                                <Text style={Styles.error}>
                                  {errors.UpdateContactField}
                                </Text>
                              ) : null}
                            </View>

                            {initialData != '' &&
                              !contactData?.isContactPrimary && (
                                <View>
                                  <TouchableOpacity
                                    onPress={() => makePrimary()}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}>
                                      <AntDesign
                                        name="star"
                                        color={Colors.primaryBlue}
                                        size={isTablet ? 26 : 17}
                                        style={{paddingLeft: 4, marginTop: -2}}
                                      />
                                      <Text
                                        style={[
                                          Styles.linkTextBlue,
                                          {
                                            textAlign: 'left',
                                            fontSize: isTablet ? 20 : 12,
                                            paddingLeft: 5,
                                          },
                                        ]}>
                                        Make Primary
                                      </Text>
                                      {type == 'phone number' ? (
                                        <Text
                                          style={[
                                            Styles.linkTextBlue,
                                            {
                                              textAlign: 'left',
                                              fontSize: isTablet ? 20 : 12,
                                              paddingLeft: 5,
                                            },
                                          ]}>
                                          Phone Number
                                        </Text>
                                      ) : (
                                        <Text
                                          style={[
                                            Styles.linkTextBlue,
                                            {
                                              textAlign: 'left',
                                              fontSize: isTablet ? 20 : 12,
                                              paddingLeft: 5,
                                            },
                                          ]}>
                                          Email Address
                                        </Text>
                                      )}
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              )}

                            {initialData != '' && !contactData?.canDelete && (
                              <View style={Styles.flatListLayout}>
                                {/* <MaterialCommunityIcons
                              name="information-outline"
                              color={Colors.plusColor}
                              size={20}
                            /> */}
                                <Text style={[Styles.contactActionText]}>
                                  Primary Phone Number or Email - Cannot Remove
                                  or Edit.
                                </Text>
                              </View>
                            )}

                            <View
                              style={{
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                width: '100%',
                                // marginVertical: 20,
                                marginBottom: 5,
                              }}>
                              {/* <View> */}

                              <View style={{flexDirection: 'row'}}>
                                <View style={{}}>
                                  {initialData == '' ||
                                  (initialData != '' &&
                                    contactData.canDelete) ? (
                                    <TouchableOpacity
                                      style={Styles.modalSubmitButton}
                                      onPress={() => handleSubmit()}>
                                      <Text
                                        style={[
                                          Styles.buttonText,
                                          {fontWeight: '800'},
                                        ]}>
                                        Save
                                      </Text>
                                    </TouchableOpacity>
                                  ) : null}
                                </View>
                                <View style={{marginLeft: 10}}>
                                  <TouchableOpacity
                                    style={Styles.modalCancelButton}
                                    onPress={() => onClose()}>
                                    <Text
                                      style={[
                                        Styles.buttonText,
                                        {fontWeight: '800'},
                                      ]}>
                                      Cancel
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                              {/* </View> */}
                            </View>
                          </>
                        )}
                      </Formik>
                    ) : (
                      <View>
                        <View>
                          <Text style={[Styles.linkText, {paddingTop: 0}]}>
                            Are you sure you would like to delete the contact{' '}
                            <Text style={{fontWeight: '800'}}>
                              {contactName}
                            </Text>
                            ?
                          </Text>
                        </View>

                        <View
                          style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            width: '100%',
                            // marginVertical: 20,
                            marginBottom: 5,
                          }}>
                          {/* <View> */}

                          <View style={{flexDirection: 'row'}}>
                            <View style={{}}>
                              <TouchableOpacity
                                style={Styles.modalSubmitButton}
                                onPress={() => handleDeleteSubmit()}>
                                <Text
                                  style={[
                                    Styles.buttonText,
                                    {fontWeight: '800'},
                                  ]}>
                                  Delete
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View style={{marginLeft: 10}}>
                              <TouchableOpacity
                                style={Styles.modalCancelButton}
                                onPress={() => onClose()}>
                                <Text
                                  style={[
                                    Styles.buttonText,
                                    {fontWeight: '800'},
                                  ]}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          {/* </View> */}
                        </View>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </AvoidSoftInputView>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MedModal;
