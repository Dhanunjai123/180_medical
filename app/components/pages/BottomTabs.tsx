/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import HomeStackNavigator from './Home';
import PayScreen from './Pay';
import MessageScreen from './MessageScreen';
import OrderScreen from './OrderScreen';
import Colors from '../../globals/colors';
import Home from './Home';
import AppBar from './AppBar';
import {
  useIsFocused,
  useNavigation,
  useRoute,
  CommonActions,
} from '@react-navigation/native';
import {useState} from 'react';
import OrderDetailScreen from './OrderDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import {Avatar, Button, Menu, Popover, Image} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageDetailScreen from './MessageDetailScreen';
import MessageService from '../../api/services/Message';
import Styles from '../../../styles';
import {MessageBadge} from '../../../App';
import {IsSwitch} from '../../../App';
import OrderChangeScreen from './OrderChangeScreen';
import Contacts from './Contacts';
import Documents from './Documents';
import ChangePassword from './ChangePassword';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InfoPolicy from './InfoPolicy';
import ContactInfo from './ContactInfo';
import AddressInfo from './AddressInfo';
import CsaForm from './CsaForm';
import SurveyForm from './SurveyForm';
import DoctorInfo from './DoctorInfo';
import InsuranceInfo from './InsuranceInfo';
import PrivacyPage from './Privacy';
import ChatWebView from './ChatWebView';
import SwitchAccount from './SwitchAccount';
import MakeDesignee from './MakeDesignee';
import DashboardService from '../../api/services/Dashboard';
import {compareVersions} from 'compare-versions';
import VersionNumber from 'react-native-version-number';

// Get the device screen dimensions
const {width, height} = Dimensions.get('window');
const isTablet = width > 600;

// For Bottom tabs we created a group

export type RootStackParamList = {
  HomeStack: HomeStackParam;  
};

const RootStack = createBottomTabNavigator<RootStackParamList>();

// Grouping the nested home page which is from the bottom tab

export type HomeStackParam = {
  Home: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParam>();

const HomeScreenStack = () => {
  const [isSwitch, setIsSwitch] = useState(false);

  const getSwitch = async () => {
    let isSwitchCase = (await AsyncStorage.getItem('isSwitchAccount'))
      ? true
      : false;
    setIsSwitch(isSwitchCase);
  };

  getSwitch();

  const logout = async (navigation: {
    dispatch: (arg0: CommonActions.Action) => void;
  }) => {
    await AsyncStorage.clear();
    setIsSwitch(false);
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('rgb(255, 255, 255)');
    const resetAction = CommonActions.reset({
      index: 0, // Reset to the first screen in the stack
      routes: [{name: 'LoginPage'}], // Replace with the actual route name of the first screen in your stack
    });
    navigation.dispatch(resetAction);
  };

  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={({route, navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.primaryDeepNavy,
          },
          headerTitleStyle: {
            color: 'white',
          },
         
        })}
      />
    </HomeStack.Navigator>
  );
};

// Grouping the nested order page which is from the bottom tab

export type OrderStackParam = {
  Orders: undefined;
};

const OrderStack = createNativeStackNavigator<OrderStackParam>();


const OrderScreenStack = () => {

  return (
    <OrderStack.Navigator initialRouteName="Orders">
      <OrderStack.Screen
        name="Orders"
        component={OrderScreen}
        options={({route, navigation}) => ({
          headerTitle: 'Orders',
          headerStyle: {
            backgroundColor: Colors.primaryDeepNavy,
          },
          headerTitleStyle: {color: Colors.white},
         
        })}
      />
    </OrderStack.Navigator>
  );
};

export type PayStackParam = {
  PayScreen: undefined;
};

const PayStack = createNativeStackNavigator<PayStackParam>();

// Pay screen even if doesn't contain nested page to set the global app bar we are giving in stack
const PayScreenStack = () => {
 

  return (
    <PayStack.Navigator initialRouteName="PayScreen">
      <PayStack.Screen
        name="PayScreen"
        component={PayScreen}
        options={({route, navigation}) => ({
          headerTitle: 'Payments',
          headerStyle: {
            backgroundColor: Colors.primaryDeepNavy,
          },
          headerTitleStyle: {color: Colors.white},

        })}
      />
    </PayStack.Navigator>
  );
};

export type MessageStackParam = {
  Message: undefined;
};

const MessageStack = createNativeStackNavigator<MessageStackParam>();

const MessageScreenStack = () => {
  
  return (
    <MessageStack.Navigator initialRouteName="Message">
      <MessageStack.Screen
        name="Message"
        component={MessageScreen}
        options={({route, navigation}) => ({
          headerTitle: 'Messages',
          headerStyle: {
            backgroundColor: Colors.primaryDeepNavy,
          },
          headerTitleStyle: {color: Colors.white}
        })}
      />
    </MessageStack.Navigator>
  );
};


const BottomTabs: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [initial, setInitial] = useState('');
  // const [messageCount, setMessageCount] = useState<number>(0);
  const {messageBadge, setMessageBadge} = React.useContext(MessageBadge);
  const [isSwitch, setIsSwitch] = useState(false);

  const route = useRoute<any>();
  const response = route.params; // Place to get all params from previous page




  // React.useEffect(() => {
  //   getSwitch();
  // }, []);
  StatusBar.setBarStyle('light-content');
  StatusBar.setBackgroundColor('rgb(13, 54, 68)');

  /* Methods */
  /* */

  return (
    <>
      <RootStack.Navigator initialRouteName="HomeStack">
        <RootStack.Screen
          name="HomeStack"
          component={HomeScreenStack}
          // initialParams={{switchCase: isSwitch}}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarStyle: {
              paddingBottom: Platform.OS === 'ios' ? 20 : 5,
              // div: {
              //   width: windowWidth - 34,
              // },
            },
            unmountOnBlur: true,
            lazy: true,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                style={{marginTop: 4}}
                name="home-outline"
                color={color}
                size={28}
              />
            ),
          }}
          listeners={{
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
              //Any custom code here
              navigation.navigate('HomeStack', {screen: 'Home'});
            },
          }}
        />
        <RootStack.Screen
          name="OrderStack"
          component={OrderScreenStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Orders',
            tabBarStyle: {
              paddingBottom: Platform.OS === 'ios' ? 20 : 5,
            },
            unmountOnBlur: true,
            lazy: true,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                style={{marginTop: 4}}
                name="order-bool-ascending-variant"
                color={color}
                size={25}
              />
            ),
          }}
        />
        <RootStack.Screen
          name="PayStack"
          component={PayScreenStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Pay',
            tabBarStyle: {
              paddingBottom: Platform.OS === 'ios' ? 20 : 5,
            },
            unmountOnBlur: true,
            lazy: true,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                style={{marginTop: 4}}
                name="wallet-outline"
                color={color}
                size={25}
              />
            ),
          }}
        />
        <RootStack.Screen
          name="MessageStack"
          component={MessageScreenStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Messages',
            tabBarStyle: {
              paddingBottom: Platform.OS === 'ios' ? 20 : 5,
            },
            unmountOnBlur: true,
            lazy: true,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                style={{marginTop: 4}}
                name="email-outline"
                color={color}
                size={25}
              />
            ),
            tabBarBadge: messageBadge != 0 ? messageBadge : null,
            tabBarBadgeStyle: {
              fontSize: isTablet ? 12 : 10,
            },
          }}
        />
      </RootStack.Navigator>
    </>
  );
};

export default BottomTabs;
