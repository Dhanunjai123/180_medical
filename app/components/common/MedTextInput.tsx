/* React Imports */
import React from 'react';
import {View, TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native';

/* App Components Import */
import Styles from '../../../styles';
import Colors from '../../globals/colors';

interface TextInputFieldProps {
  placeholder: string;
  secureTextEntry?: boolean;
  value: any;
  onChangeText: (text: string) => void;
  _onPress?: any;
  keyboard?: KeyboardTypeOptions | undefined;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  maxLength?: any;
  _style?: any;
  autoCapitalize?: any;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  _onPress,
  keyboard,
  autoCapitalize,
  editable = true,
  selectTextOnFocus = true,
  maxLength,
  _style,
}) => {
  return (
    <View style={styles.textBoxContainer}>
      <TextInput
        style={[
          Styles.inputBox,
          {backgroundColor: editable ? Colors.white : Colors.grey},
          _style,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#cacfd6" // get this from colors file
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        onPressIn={_onPress}
        keyboardType={keyboard}
        editable={editable}
        selectTextOnFocus={selectTextOnFocus}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        returnKeyType="done"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textBoxContainer: {
    marginBottom: 5,
  },
});

export default TextInputField;
