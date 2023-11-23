/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MedButton from '../common/MedButton';
import Constants from '../../globals/constants';

const ErrorPage = ({type,onPress}) => {

  return (
    <View style={styles.errorContainer}>
       <View style={styles.errorMsg}>
            <Text style={styles.errorTxtMsg}>{Constants[type].message}</Text>
       </View>
       <View style={styles.btnContainer}>
            <MedButton title={Constants[type].title} onPress={onPress}/>
       </View>
    </View>
  )
}

export default ErrorPage;

const styles = StyleSheet.create({
  errorTxtMsg:{
    color: 'rgb(255, 0, 0)',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
		textAlign:'center',
  },
  errorContainer:{
		marginLeft : 30,
		marginRight: 30,
		// flex:1,
		// justifyContent: 'space-between',
		// height:200,
  },
	btnContainer: {
		marginTop: 50,
	},
})