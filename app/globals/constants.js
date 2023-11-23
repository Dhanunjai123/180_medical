const Constants = {
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGIN_ERROR: 'Unable to login',
  SIGNUP_VERIFY_ERROR: 'Unable to verify',
  SIGNUP_SUCCESS: 'You have been signed up successfully',
  FORGOT_VERIFY_ERROR: 'Unable to create forgot password request',
  CONTACT_ERROR: 'Unable to process',
  ADDRESS_UPDATE_SUCCESS: 'Address updated successfully',
  OK_TEXT: 'OK',
  CONTACTS_TEXT: 'Contacts',
  CONTACT_SUCCESS: 'Contact addded successfully',
  ADDRESS_TEXT: 'Addresses',
  INSURACNCE_TEXT: 'Insurance',
  DOCUMENT_TEXT: 'Documents',
  CHANGE_REQUEST_TEXT: 'Change Request',
  LOGIN_UNDEFINED_ERROR: 'Unable to login, Please check your internet',
  DELETE_PHONE_ERROR:
    'Failed to delete phone. Please try again and if the problem continues please contact us.',
  IDEL_MESSAGE:
    'Your session is about to expire due to inactivity. To continue use this application without interruption, please log in again. We value your security and want to ensure the best experience for you.',
  LOGIN_TEXT: 'Login',
  FORGET_TEXT: 'Forgot Password',
  FLOODED_TRUE:
    'We apologize for the inconvenience. Due to a high volume of attempts, our server is currently unavailable. Please try again later. Thank you for your patience.',
  FILE_TYPES_INFO:
    'Accepted file types: jpg, png, pdf, tif, Max file size: 100 MB. Max file count: 10 files. Please upload both front and back.',
  SET_ADDRESS_SUCCESS: 'Address update requested successfully',
  INVALID_LOGIN: {
    message: "I'm sorry but the Email and Password combination do not match",
    title: 'Try Again',
  },
  MAX_ATTEMPTS: {
    message: 'You have tried to log in with the wrong password 5 times. Please try again in 30 min or put in a ticket to unlock your account or to have your password reset',
    title: 'Unlock / Reset Password',
  },
};

export default Constants;
