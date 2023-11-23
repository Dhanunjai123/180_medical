import React, {FC} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  useWindowDimensions,
} from 'react-native';
import Styles from '../../../styles';
import Colors from '../../globals/colors';

interface MedButtonProps extends TouchableOpacityProps {
  title: string;
  style?: any;
}

const MedButton: FC<MedButtonProps> = ({title, onPress, style, ...rest}) => {
  /* Const Declaration */
  const {width, height} = useWindowDimensions();
  const isTablet = width > 600; // Customize this threshold as per your needs

  return (
    <TouchableOpacity
      style={[isTablet ? styles.buttonTab : styles.button, style]}
      onPress={onPress}
      {...rest}>
      <Text style={Styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryDeepNavy,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTab: {
    backgroundColor: Colors.primaryDeepNavy,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
});

export default MedButton;
