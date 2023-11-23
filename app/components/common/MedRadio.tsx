/* React Imports */
import React, {useState} from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import {StyleSheet} from 'react-native';

/* App Components Imports*/
import Styles from '../../../styles';
import Colors from '../../globals/colors';

interface RadioProps {
  key: string;
  label: string;
  value: string;
  onSelecting: (value: any) => void;
  selected: string;
  name: string;
}

const MedRadio: React.FC<RadioProps> = ({
  key,
  label,
  value,
  onSelecting,
  selected,
  name,
  ...rest
}) => {
  /* Const Declaration */
  const [dropDownWidth, setDropDownWidth] = useState(null);
  const {width, height} = useWindowDimensions();
  const isTablet = width > 600; // Customize this threshold as per your needs

  // Update radio button state
  const select = (val: any) => {
    onSelecting(val);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        key={key}
        style={[
          styles.button,
          {
            borderColor:
              selected == value ? Colors.primaryNavy : Colors.borderGrey,
            marginTop: isTablet ? 3 : 0,
          },
        ]}
        onPress={() => {
          select(value);
        }}>
        {selected == value && <View style={styles.checkedButton} />}
      </TouchableOpacity>
      <Text
        style={{
          color: Colors.black,
          fontSize: isTablet ? 16 : 12,
          marginLeft: isTablet ? -6 : 0,
        }}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    margin: 7,
  },
  button: {
    height: 17,
    width: 17,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: -6,
  },
  checkedButton: {
    width: 13,
    height: 13,
    backgroundColor: Colors.primaryNavy,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primaryNavy,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MedRadio;
