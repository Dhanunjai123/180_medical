/* React Imports */
import React, {FC} from 'react';
import {
  HStack,
  Menu,
  Text,
  Pressable,
  HamburgerIcon,
  Avatar,
  View,
  Stack,
} from 'native-base';
import {useRoute, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImageBackground, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* App Component Imports */
import Styles from '../../../styles';
import Colors from '../../globals/colors';

interface AppBarProps {
  label: string;
  isHomebar: boolean;
  initials?: string;
}

// const AppBar: FC<AppBarProps> = ({ label, isHomebar, initials }) => {

//     const route = useRoute<any>();
//     const navigation = useNavigation<any>();

//     // Handle Logout
//     const handleLogout = async () => {
//         await AsyncStorage.clear();
//         navigation.push('LoginPage', {})
//     };

//     return (
//         // <Stack>
//                 <Stack style={[isHomebar ? Styles.AppContainerHome : Styles.AppContainer]}>
//             <HStack alignItems="center">
//                 {
//                     isHomebar ?
//                         <Menu w="190" trigger={triggerProps => {
//                             return <Pressable {...triggerProps}>
//                                 {/* <HamburgerIcon /> */}
//                                 {/* <Text>Jman</Text> */}
//                                 <Avatar bg="grey" size={10} source={{
//                                     uri: "https://pbs.twimg.com/profile_images/1188747996843761665/8CiUdKZW_400x400.jpg"
//                                 }}>
//                                     {initials}
//                                 </Avatar>
//                             </Pressable>
//                         }}>
//                             <Menu.Item onPress={() => navigation.push('Contacts', {})}>
//                                 <Text style={{ fontSize: 15 }} >Edit Profile </Text>
//                             </Menu.Item>
//                             <Menu.Item onPress={() => navigation.push('ChangePassword', {})}>
//                                 <Text style={{ fontSize: 15 }}>Change Password</Text>
//                             </Menu.Item>
//                             <Menu.Item onPress={() => handleLogout()}>
//                                 <Text style={{ fontSize: 15 }}>Log out</Text>
//                             </Menu.Item>
//                         </Menu>
//                         :
//                         <View style={{ margin: -15}}>
//                             <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: '#25556c', borderRadius: 25, padding: 5, marginLeft: 10 }}>
//                                 <Icon name="arrow-back" size={25} style={{ color: '#d9e2df' }} />
//                             </TouchableOpacity>
//                         </View>
//                 }
//                 <Text style={[isHomebar ? Styles.AppBarHomeText : Styles.AppBarText]}>{label}</Text>
//                 {/* <View >
//                 <MaterialCommunityIcons  name="message-reply-outline" size={30} style={{ float: 'left', paddingRight: 15, marginiRght: 10, color: '#42474b'}} />
//                 </View> */}
//             </HStack>
//         </Stack>
//     )
// }

const AppBar: React.FC = () => {
  return (
    <SafeAreaView style={{padding: 20}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>ANTO</Text>
        <ImageBackground
          source={require('../../assets/images/notification.png')}
          style={{width: 35, height: 20, backgroundColor: 'blue'}}
          imageStyle={{borderRadius: 25}}
        />
      </View>
    </SafeAreaView>
  );
};

export default AppBar;
