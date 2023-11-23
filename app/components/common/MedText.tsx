import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TextFieldProps {
  value: string;
  _style?: any;
}
const TextField: React.FC<TextFieldProps> = ({value, _style}) => {
  return (
    <View>
      <Text style={[styles.signIn, _style]}>{value}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  signIn: {
    fontWeight: 'bold',
    backgroundColor: 'red',
    color: '#31729D',
  },
});

export default TextField;
