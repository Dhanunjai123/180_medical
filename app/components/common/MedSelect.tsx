/* React Imports */
import React, {FC, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-select-dropdown-search';
import {View, Text} from 'react-native';

/* App Components Imports*/
import Colors from '../../globals/colors';
import Styles from '../../../styles';

interface MyObject {
  label: string;
  value: string;
}

interface MedSelectProps {
  placeholder: string;
  dropdownType: string;
  value: any;
  onChange: (option: MyObject) => void;
  _style?: any;
  options: MyObject[];
  // renderSelectItem?: (item: object, selected: Boolean | undefined) => JSX.Element;
  labelField?: Object;
  valueField?: Object;
  selectedItems?: [];
  dropdownPosition?: string;
}

const MedSelect: FC<MedSelectProps> = ({
  placeholder,
  dropdownType,
  value,
  onChange,
  _style,
  options,
  selectedItems,
  dropdownPosition = 'bottom',
  ...rest
}) => {
  /* Const Declaration */
  const [dropDownWidth, setDropDownWidth] = useState(null);
  const {width, height} = useWindowDimensions();
  const isTablet = width > 600; // Customize this threshold as per your needs

  const onLayout = (event: any) => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setDropDownWidth(width);
  };

  // Handle dropdown onchange and pass the selected to parent
  const onChangeItem = (item: any) => {
    onChange(item);
  };

  const renderSelectItem = (item: any) => {
    return (
      <View style={{padding: 17}}>
        {
          // companyId?.includes(item.id) ?
          //     <View style={[]}>
          //         <Text style={[Styles.selectedBgStyle, {marginLeft: Platform.OS === 'ios' ? 0 : -8}]}>{item?.name}</Text>
          //     </View>
          //     :
          //     <View >
          //         <Text style={[Styles.selectedStyle, {marginLeft: Platform.OS === 'ios' ? 0 : -8}]}>{item?.name}</Text>
          //     </View>

          <View style={{}}>
            <Text style={{}}>{item?.label}</Text>
          </View>
        }
      </View>
    );
  };

  return (
    <View onLayout={onLayout} style={[Styles.dropdownInput, _style]}>
      {dropdownType == 'single' ? (
        <Dropdown
          style={[{paddingVertical: 3, paddingHorizontal: 5}]}
          activeColor={'#f4f3f7'}
          placeholderStyle={Styles.placeholderStyle}
          selectedTextStyle={[Styles.selectedTextStyle]}
          inputSearchStyle={Styles.inputSearchStyle}
          iconStyle={Styles.iconStyle}
          itemTextStyle={{color: Colors.black}}
          // itemContainerStyle={{ borderBottomColor: 'red', borderBottomWidth: 0.7 }}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{
            width: isTablet ? '100.5%' : '101%',
            marginLeft: isTablet ? -2 : -1,
            marginBottom: 5,
          }}
          data={options}
          search
          dropdownPosition={dropdownPosition}
          searchPlaceholder="Search"
          // renderItem={renderSelectItem}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          onChange={item => {
            onChangeItem(item);
          }}
          autoScroll={false}
          // containerStyle
        />
      ) : (
        <MultiSelect
          style={{padding: 5}}
          activeColor={'#f4f3f7'}
          // containerStyle={[Styles.containerStyle, { width: '150%', marginLeft: -1 }]}
          placeholderStyle={[Styles.placeholderStyle]}
          selectedTextStyle={Styles.selectedTextStyle}
          inputSearchStyle={Styles.inputSearchStyle}
          iconStyle={Styles.iconStyle}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search"
          data={options}
          search
          renderItem={renderSelectItem}
          value={selectedItems}
          visibleSelectedItem={false} // To hide the tags or chips of the selected items
          onChange={item => {
            onChangeItem(item);
          }}
          selectedStyle={{backgroundColor: 'white'}}
          showsVerticalScrollIndicator={false} // To hide the scroll
        />
      )}
    </View>
  );
};

export default MedSelect;
