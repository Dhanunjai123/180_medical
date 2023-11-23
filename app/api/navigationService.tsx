// NavigationService.js

import {useNavigation} from '@react-navigation/native';

let _navigator: any;
const navigation = useNavigation();

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params: any) {
  _navigator.dispatch(navigation.dispatch(routeName, params));
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
