// Home.tsx

import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Styles from '../../../styles';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  useWindowDimensions,
  Linking,
} from 'react-native';
import LogoSvg from '../../assets/images/logo.svg';
import MedButton from '../common/MedButton';
import Colors from '../../globals/colors';

const SignUpModal: React.FC = () => {
  /* Const Declarations */
  const {width} = useWindowDimensions();
  const isTablet = width > 600; // Customize this threshold as per your need

  /* State Declarations */
  const [spinner, setSpinner] = useState(false);
  const [isDataAvailable, setDataAvailable] = useState(false);
  const navigation = useNavigation<any>();

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }



  /* Methods */
  /* */
  return (
    <View style={Styles.container}>
      <LogoSvg
        height={isTablet ? 450 : Platform.OS == 'ios' ? 300 : 200}
        width={isTablet ? 820 : '100%'}
      />
      <View style={Styles.p20}>
        <View style={[Styles.flexColumn]}>
          <View style={[Styles.flatCard, {marginHorizontal: 2}]}>
            <View style={Styles.flexColumn}>
              <View>
                <Text
                  style={[
                    Styles.headerText,
                    {paddingBottom: 10, textAlign: 'center'},
                  ]}>
                  Welcome to my.180medical
                </Text>

                <View>
                  <Text
                    style={[Styles.label, {marginTop: 15, marginBottom: 0}]}>
                    We have emailed you a link to reset your password.
                  </Text>
                </View>
                <View>
                  <Text
                    style={[Styles.label, {marginTop: 15, marginBottom: 0}]}>
                    Please be patient, as it may take a few minutes to receive.
                  </Text>
                </View>
                <View>
                  <Text
                    style={[Styles.label, {marginTop: 15, marginBottom: 0}]}>
                    If you cannot find one, please check your spam/junk folder.
                  </Text>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={Styles.label}>
                    If you are still having trouble logging in, please give us a
                    call at{' '}
                    <Text
                      onPress={() => {
                        Linking.openURL('tel:(877)688-2729');
                      }}
                      style={{
                        fontSize: isTablet ? 17 : 14,
                        color: Colors.linkBlue,
                      }}>
                      {' '}
                      (877)688-2729
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <MedButton
        title="Back to Sign In"
        onPress={() => navigation.push('LoginPage')}
        // onPress={() => handleSubmit()}
        style={{margin: 15}}
      />
    </View>
  );
};

export default SignUpModal;
