import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';
import Colors from './app/globals/colors';
import { Center } from 'native-base';

// Get the device screen dimensions
const {width, height} = Dimensions.get('window');

// Calculate the pixel density scale
const scale = width / 320; // Assuming the design is based on an iPhone 5/SE (320 points wide)

const isTablet = width > 600; // Customize this threshold as per your needs

// Calculate the relative font size
/* We calculate the scale based on the device's width relative to the design width (320 points). We then multiply the base font size (16) by the scale to get the relative font size. */

const fs6 = PixelRatio.roundToNearestPixel(6 * scale);
const fs8 = PixelRatio.roundToNearestPixel(8 * scale);
const fs10 = PixelRatio.roundToNearestPixel(10 * scale);
const fs12 = PixelRatio.roundToNearestPixel(12 * scale);
const fs14 = PixelRatio.roundToNearestPixel(14 * scale);
const fs16 = PixelRatio.roundToNearestPixel(16 * scale);
const fs18 = PixelRatio.roundToNearestPixel(18 * scale);
const fs20 = PixelRatio.roundToNearestPixel(20 * scale);

// console.log(fs8, fs10, fs12, fs14, fs16, fs18, fs20, 'fontSize', scale);

const Styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? -50 : 0,
  },

  chatContainer:{
    // flex: 1,
    flexDirection: 'column',
    flex: 1,
    position: 'absolute',
    bottom: 40,
    backgroundColor: Colors.primaryNavy,
    borderWidth: 1,
    borderRadius: 50,
    width: 70,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    marginTop: 7, // added for ipad screen
  },
  headerText: {
    fontSize: isTablet ? 20 : fs16,
    color: '#0D3644',
    fontWeight: '600',
    // paddingBottom: 8,
  },
  linkTextBlue: {
    paddingVertical: isTablet ? 14 : 12,
    fontSize: isTablet ? 17 : fs12,
    color: Colors.linkBlue,
  },
  linkText: {
    paddingVertical: 12,
    fontSize: isTablet ? 18 : fs12,
    color: Colors.cancelButtonGrey,
  },
  emptyScreenLinkText: {
    // paddingVertical: 10,
    fontSize: isTablet ? fs8 : fs12,
    color: '#cacfd6',
  },
  forgotLinkText: {
    paddingVertical: 14,
    fontSize: isTablet ? fs6 : fs10,
  },
  alignFlex: {
    display: 'flex',
    alignItems: 'center',
  },
  p20: {
    padding: 20,
  },
  p15: {
    padding: 15,
  },
  p5: {
    padding: 5,
  },
  logoImage: {
    width: '100%',
    height: isTablet ? 400 : 200,
  },
  viewHeader: {
    marginTop: 10,
  },
  colorBlack: {
    color: 'Black',
  },
  colorRed: {
    color: 'Red',
  },
  menuPopUp: {
    fontSize: 15,
    color: 'black',
    lineHeight: 16,
  },
  menuHome: {
    borderRadius: 15,
    width: '100%',
    right: 18
  },
  // menuPopContent: {
  //   marginLeft:10, width:200
  // },

  // Payment list expandable
  paymentCard: {
    backgroundColor: '#31729d',
    borderColor: '#31729d',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    padding: 15,
  },
  paymentButton: {
    // backgroundColor: '#98b8ce',
    backgroundColor: '#6e9cba'
  },
  paymentText: {
    fontSize: isTablet ? 20 : 14,
    color: Colors.white,
    paddingTop: 4,
  },
  // Flat list expandable
  flatCard: {
    backgroundColor: '#f8f8fe',
    borderColor: '#f8f8fe',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    // borderColor: '#fff',
    // elevation: 3,
    // shadowColor: '#f8f8fe',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  flatTitle: {
    fontSize: isTablet ? 20 : 16,
    color: Colors.black,
    fontWeight: isTablet ? '700' : '800',
  },
  flatSubTitle: {
    fontSize: isTablet ? 20 : 14,
    color: Colors.primaryHeadingGrey,
    flexDirection: 'row',
  },
  flatText: {
    fontSize: isTablet ? 16 : 14,
    color: Colors.primaryHeadingGrey,
    paddingTop: 4,
  },
  flatListLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: '#FFE5B4',
    borderRadius: 5,
    padding: 6,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#FFE5B4',
  },
  alertText: {
    color: Colors.primaryBlue,
    marginLeft: 10,
    // fontStyle: 'italic',
    fontSize: 14,
    // textDecorationLine: 'underline',
    // flexShrink: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  alertListLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    width: '96%',
  },
  orderContainer: {
    backgroundColor: '#f8f8fe',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cacfd6',
  },
  orderTopContainer: {
    backgroundColor: '#FFE5B4',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFE5B4',
  },
  contactDetailContainer: {
    backgroundColor: '#CFEBFC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CFEBFC',
  },
  orderVerifyContainer: {
    backgroundColor: '#9FD7F9',
    borderRadius: 8,
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#9FD7F9',
  },
  verifyAddress: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: isTablet ? '25%' : '20%',
    alignItems: 'flex-end',
  },

  infoSocialMediaContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  expandableCard: {
    paddingTop: 5,
    color: '#9ba4b4',
  },
  spinnerTextStyle: {
    color: '#fff',
  },
  expandableContent: {
    fontSize: 16,
  },
  lineHorizontal: {
    borderTopColor: '#9ba4b4',
    borderTopWidth: 2,
    paddingTop: 10,
    marginTop: 10,
    borderStyle: 'dashed',
  },
  // Walk through Screen
  pv8: {
    paddingVertical: 8,
  },
  pv15: {
    paddingVertical: isTablet ? 25 : 15,
  },
  pv10: {
    paddingVertical: isTablet ? 20 : 10,
  },
  pt15: {
    paddingTop: isTablet ? 25 : 15,
  },
  pt10: {
    paddingTop: 10,
  },
  pt12: {
    paddingTop: isTablet ? 22 : 12,
  },
  pb4: {
    paddingBottom: 4,
  },
  pr6: {
    paddingRight: isTablet ? 12 : 6,
  },
  lh4: {
    lineHeight: isTablet ? 32 : 22,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  walkThroughHeaderText: {
    fontSize: isTablet ? fs8 : fs12,
    color: '#454042',
    paddingBottom: 2,
    fontWeight: '500',
  },
  walkThroughHelpText: {
    fontSize: isTablet ? fs8 : fs10,
    color: '#8a94a6',
    paddingTop: 5,
  },
  // Empty Screen
  emptyScreen: {
    justifyContent: 'center',
    flex: 1,
  },
  AppHeader: {
    flex: 1,
  },
  AppBarHomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
    textTransform: 'none',
    color: Colors.black,
  },
  AppBarText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 25,
    textTransform: 'none',
    color: '#F0F1FD',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: isTablet ? 16 : fs12,
    textAlign: 'center',
  },
  AppContainerHome: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    // height: 60,
    // borderColor: '#1C4F66'
    // shadowColor: 'black',
    // shadowOpacity: 0.3,
    // elevation: 2
    borderColor: '#fff',
    elevation: 3,
    shadowColor: '#cacfd6',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: Colors.white,
  },
  AppContainer: {
    // paddingVertical: 20,
    // paddingHorizontal: 20,
    borderBottomWidth: 1,
    // height: 50,
    // borderColor: '#1C4F66'
    // shadowColor: 'black',
    // shadowOpacity: 0.3,
    // elevation: 2
    borderColor: '#fff',
    elevation: 3,
    shadowColor: '#cacfd6',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: Colors.primaryDeepNavy,
  },
  inputBox: {
    height: isTablet ? 50 : 40,
    borderColor: '#cacfd6',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginTop: isTablet ? 10 : 7, // updated by SM
    fontSize: isTablet ? 16.5 : 14,
    color: 'black',
    borderRadius: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  /* iPad */
  backIconContainer: {
    marginTop: width * 0.03,
    marginLeft: width > 600 ? width * 0.25 : width * 0.2,
    fontSize: width * 0.055,
    width: width * 0.5,
    flexDirection: 'column',
  },
  walkthroughContainer: {
    marginTop: width * 0.03,
    marginLeft: width > 600 ? width * 0.1 : width * 0.2,
    fontSize: width * 0.055,
    width: width * 0.8,
  },
  flatListButton: {
    color: 'red',
    fontSize: 40,
  },
  editText: {
    fontSize: isTablet ? 18 : 14,
    color: Colors.textGrey,
    paddingTop: 4,
    paddingBottom: 4,
  },
  label: {
    fontSize: isTablet ? 16 : 14,
    // fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 8,
    color: '#454042',
  },
  labelBlack: {
    fontSize: isTablet ? 20 : 14,
    color: '#000',
    marginBottom: 5,
  },
  labelBlackHome: {
    fontSize: isTablet ? 20 : 16,
    color: '#000',
    marginBottom: 5,
    marginTop: 3,
  },

  /* Contacts */
  contactContainer: {
    backgroundColor: '#f8f8fe',
    borderRadius: 8,
    padding: 10,
    margin: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  contactItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#E4E4E4',
    paddingBottom: isTablet ? 28 : 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactActionText: {
    fontSize: isTablet ? 18 : 14,
    color: Colors.primaryHeadingGrey,
  },
  contactRemoveText: {
    fontSize: isTablet ? 18 : 14,
    color: Colors.red,
    paddingBottom: 1,
  },
  contactEditContactText: {
    fontSize: isTablet ? 16 : 12,
    paddingBottom: 1,
    color: Colors.primaryHeadingGrey,
  },
  flexColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  addressEditText: {
    fontSize: isTablet ? 18 : 14,
    color: Colors.white,
    paddingTop: 4,
  },
  /* Drop-down */
  placeholderStyle: {
    fontSize: isTablet ? 16 : 14,
    flexWrap: 'nowrap',
    color: '#cacfd6', // Make it global
    marginLeft: 5,
  },
  selectedTextStyle: {
    fontSize: isTablet ? 16 : 14,
    marginTop: isTablet ? 0 : 2,
    color: '#333333', // Make it global
    marginLeft: isTablet ? -4 : 0,
    paddingLeft: 10,
  },
  // inputSearchStyle: {
  //   height: 40,
  //   fontSize: isTablet ? 16 : 16,
  //   borderRadius: 6,
  //   color: '#333333', // Make it global
  //   width: '75%',
  //   // backgroundColor: 'red'
  // },
  inputSearchStyle: {
    height: 40,
    fontSize: isTablet ? 16 : 16,
    borderRadius: 6,
    color: '#333333', // Make it global
    width: '96%',
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: isTablet ? 30 : 15,
  },
  quickAdd: {
    backgroundColor: '#2F54EB',
    borderColor: '#2F54EB',
    alignSelf: 'center',
  },
  smModelLayout: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    height: 'auto',
    borderRadius: 10,
    marginTop: 50,
  },
  contactHeader: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 20,
    marginHorizontal: 12,
  },
  modalHeader: {
    fontSize: isTablet ? 24 : 20,
    color: Colors.black,
    fontWeight: '600',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingRight: 20,
    marginRight: 20,
    paddingBottom: 10,
  },
  modalSubmitButton: {
    backgroundColor: Colors.colorBlue,
    borderRadius: 6,
    justifyContent: 'center',
    height: 38,
    width: 100,
    alignItem: 'center',
    marginTop: 15,
  },
  modalCancelButton: {
    backgroundColor: Colors.cancelButtonGrey,
    borderRadius: 6,
    justifyContent: 'center',
    height: 38,
    width: 100,
    alignItem: 'center',
    marginTop: 15,
  },

  dropdownInput: {
    borderColor: '#cacfd6',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    paddingTop: 0,
    marginRight: 20,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: -10, // before  it was 7
  },
  contactEdit: {
    backgroundColor: Colors.plusColor,
    padding: 5,
    paddingHorizontal: 5,
    borderRadius: 25,
    marginRight: 5,
  },
  contactDelete: {
    backgroundColor: Colors.red,
    padding: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
  },
  checkboxActive: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.primaryDeepNavy,
    backgroundColor: Colors.primaryDeepNavy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  checkboxInActive: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#a8a8a8',
    borderRadius: 5,
    backgroundColor: Colors.white,
  },
  calendarIconTab: {
    fontSize: 18,
    paddingTop: 12,
    color: Colors.textGrey,
  },
  calendarIcon: {
    fontSize: 16,
    paddingTop: 11.5,
    color: Colors.textGrey,
  },
  addressBillingText: {
    paddingLeft: isTablet ? 8 : 4,
    fontSize: isTablet ? 16 : 12,
    color: Colors.black,
    marginTop: 2,
  },
  selectedFiles: {
    marginTop: 10,
    height: 'auto',
    backgroundColor: Colors.white,
    // padding: 10,
  },
  infoTextView: {
    flexDirection: 'row',
    paddingTop: 5,
    marginLeft: 20,
  },
  infoText: {
    flex: 1,
    paddingLeft: 10,
    color: Colors.primaryNavy,
  },
  mt10: {
    marginTop: 10,
  },
  infoBg: {
    backgroundColor: Colors.infoBg,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.textBlack,
  },
  authHeader: {
    fontWeight: '700',
    fontSize: 16,
  },
  authBody: {
    fontSize: isTablet ? 18 : 16,
    marginBottom: 15,
    marginTop: 15,
    color: Colors.primaryHeadingGrey,
  },
  authHeaderKey: {
    fontSize: 12,
    paddingBottom: 10,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
    width: 500,
    height: 500,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
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
    marginLeft:  -17,
    top: isTablet ? -2 : 0
  },
  checkedButton: {
    width:  17,
    height:  17,
    backgroundColor: Colors.primaryNavy,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primaryNavy,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:  -16,
  },
  boxShadow: {
    elevation: 2,

    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.26,
    backgroundColor: Colors.dropdownBgColor,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: -10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textStyle: {
    color: '#0E0F11',
    fontSize: 14,
    fontWeight: '400',
  },
  textRed: {
    color: Colors.red,
  },
  badgeContainer: {
    backgroundColor: Colors.messagePurple, // Change the background color to your desired color
    borderRadius: 15, // Adjust the border radius to make it rounder or less round
    paddingHorizontal: 10,
    paddingBottom: 0,
    paddingTop: 5,
  },
  badgeText: {
    color: Colors.black, // Change the text color to your desired color
    fontSize: 14, // Adjust the font size as needed
    fontWeight: 'bold', // You can adjust the font weight as well
  },
  switchView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactTitle: {
    fontSize: isTablet ? 20 : 18,
    color: Colors.black,
    fontWeight: isTablet ? '700' : '800',
  },
  contactText: {
    fontSize: isTablet ? 18 : 16,
    color: Colors.secondaryTextGrey,
    paddingTop: 4,
  },
  emergencyText: {
    // paddingVertical: isTablet ? 14 : 12, // check ipad and enable by applying condition for ipad
    fontSize: isTablet ? 16 : 13,
    color: Colors.linkBlue,
    textAlign: 'right',
  },
  contactEmailPhoneText: {
    fontSize: isTablet ? 18 : 16,
    color: Colors.contactText,
    paddingTop: 4,
  },
  forgotContainer: {
    flex: 1,
    flexDirection: 'row', // To align content and touchable area horizontally
  },
  contentFgContainer: {
    flex: 1, // Take up remaining space
    justifyContent: 'center', // Align content vertically
    paddingLeft: 20, // Add some padding to separate content from touchable area
  },
  designeeHeader: {
    fontSize: isTablet ? 18 : 16,
    color: Colors.textBlack,
    paddingTop: 4,
    fontWeight: '700',
  },
  designeeHeaderKey: {
    fontSize: isTablet ? 16 : 14,
    paddingBottom: 10,
    color: Colors.primaryHeadingGrey,
  },
  twitterIcon: {
    height: 25,
    width: 25,
    // transform: [{scaleX: -1}],
    color: Colors.white,
  },

  //New styles
  termsContainer:{
    color: 'rgb(49, 114, 157)',
    fontSize: 14,
    lineHeight: 18,
    fontWeight:500,
   },
   terms:{
     marginTop: 40,
   },
   btnContainer: {
     marginTop: 30,

   }

};

export default Styles;
