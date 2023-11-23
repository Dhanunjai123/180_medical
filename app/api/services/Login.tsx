import axios, {AxiosError} from 'axios';
import request from '../Interface';
import {Alert} from 'react-native';
import {err} from 'react-native-svg/lib/typescript/xml';
import env from '../../config/environment/env';
import Constants from '../../globals/constants';

const baseURL = env.APP_URL + 'auth/';

// const baseURL =
//   'https://gateway-demo.180medical.com/demo/api/mobile-patient-portal/v1/auth/';

const API = axios.create({baseURL: baseURL});

// Authenticate user
async function loginApi(body: any) {
  try {
    const response = await API.post('login/PatientPortal', body);
    return {isError: false, data: response.data};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle the axios error response
        return {isError: true, data: axiosError.response};
      } else if (axiosError.message == 'Network Error') {
        setTimeout(function () {
          Alert.alert('Login', 'Check your internet connection and retry.', [
            {text: Constants.OK_TEXT},
          ]);
        }, 100);
      } else {
        setTimeout(function () {
          Alert.alert('Login', 'Please try after sometime.', [
            {text: Constants.OK_TEXT},
          ]);
        }, 100);
      }
    } else {
      // Handle non-Axios errors
      console.log(error);
    }
  }
}

// Signup first call
async function signupVerifyApi(body: any) {
  try {
    const response = await API.post('patient-portal/verify', body);
    return {isError: false, data: response.data};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle the axios error response
        return {isError: true, data: axiosError.response};
      } else if (axiosError.message == 'Network Error') {
        setTimeout(function () {
          Alert.alert(
            'Create Account',
            'Check your internet connection and retry.',
            [{text: Constants.OK_TEXT}],
          );
        }, 100);
      } else {
        setTimeout(function () {
          Alert.alert('Create Account', 'Please try after sometime.', [
            {text: Constants.OK_TEXT},
          ]);
        }, 100);
      }
    } else {
      // Handle non-Axios errors
      console.log(error, 'error');
    }
  }
}

// Signup second call
async function signupApiVerifyOptional(body: any) {
  try {
    const response = await API.post('patient-portal/verifyOptional', body);
    // Handle the successful response
    return {isError: false, data: response.data};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle the axios error response
        return {isError: true, data: axiosError.response};
      } else if (axiosError.message == 'Network Error') {
        setTimeout(function () {
          Alert.alert(
            'Create Account',
            'Check your internet connection and retry.',
            [{text: Constants.OK_TEXT}],
          );
        }, 100);
      } else {
        setTimeout(function () {
          Alert.alert('Create Account', 'Please try after sometime.', [
            {text: Constants.OK_TEXT},
          ]);
        }, 100);
      }
    } else {
      // Handle non-Axios errors
      console.log(error);
    }
  }
}

// Signup finall call
async function finalSignup(body: any) {
  try {
    const response = await API.post('patient-portal/create', body);
    return {isError: false, data: response.data};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle the error response
        return {isError: true, data: axiosError.response};
      } else if (axiosError.message == 'Network Error') {
        setTimeout(function () {
          Alert.alert(
            'Create Account',
            'Check your internet connection and retry.',
            [{text: Constants.OK_TEXT}],
          );
        }, 100);
      } else {
        setTimeout(function () {
          Alert.alert('Create Account', 'Please try after sometime.', [
            {text: Constants.OK_TEXT},
          ]);
        }, 100);
      }
    } else {
      // Handle non-Axios errors
      console.log(error);
    }
  }
}

// Forgot password
async function forgotPassword(body: any) {
  try {
    const response = await API.post('patient_portal_forgot_password', body);
    return {isError: false, data: response};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle the error response
        return {isError: true, data: axiosError.response};
      } else if (axiosError.message == 'Network Error') {
        setTimeout(function () {
          Alert.alert(
            'Forgot Password',
            'Check your internet connection and retry.',
            [{text: Constants.OK_TEXT}],
          );
        }, 100);
      } else {
        setTimeout(function () {
          Alert.alert('Forgot Password', 'Please try after sometime.', [
            {text: Constants.OK_TEXT},
          ]);
        }, 100);
      }
    } else {
      // Handle non-Axios errors
      console.log(error);
    }
  }
}

// To reseting the user's password (from forgot password reset link)
async function resetPassword(body: any) {
  try {
    const response = await API.post('patient-portal/reset_password', body);
    return {isError: false, data: response.data};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle the error response
        return {isError: true, data: axiosError.response};
      } else if (axiosError.message == 'Network Error') {
        setTimeout(function () {
          Alert.alert(
            'Reset Password',
            'Check your internet connection and retry.',
            [{text: Constants.OK_TEXT}],
          );
        }, 100);
      } else {
        setTimeout(function () {
          Alert.alert('Reset Password', 'Please try after sometime.', [
            {text: Constants.OK_TEXT},
          ]);
        }, 100);
      }
    } else {
      // Handle non-Axios errors
      console.log(error);
    }
  }
}

// To Verify the user's password (from forgot password reset link)
async function VerifyresetPassword(token: any) {
  console.log(token, "token srv", API)
  try {
   
    const response = await API.get(
      `/verify_email_token/passwordreset/${token}`,
    );
    return {isError: false, data: response.data};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle the error response
        return {isError: true, data: axiosError.response};
      } else if (axiosError.message == 'Network Error') {
        setTimeout(function () {
          Alert.alert(
            'Reset Password',
            'Check your internet connection and retry.',
            [{text: Constants.OK_TEXT}],
          );
        }, 100);
      } else {
        setTimeout(function () {
          Alert.alert('Reset Password', 'Please try after sometime.', [
            {text: Constants.OK_TEXT},
          ]);
        }, 100);
      }
    } else {
      // Handle non-Axios errors
      console.log(error);
    }
  }
}

// Add a new contact
async function switchAccount(body: any) {
  try {
    const response = await request(
      {
        url: '/switchaccount',
        method: 'POST',
        data: body,
      },
      true,
    );
    return response;
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

/* GET */

// Get available users for switching the account
function getAvailablePatients() {
  return request(
    {
      url: '/switchaccount',
      method: 'GET',
    },
    true,
  );
}


const LoginService = {
  loginApi,
  signupApiVerifyOptional,
  signupVerifyApi,
  finalSignup,
  forgotPassword,
  resetPassword,
  VerifyresetPassword,
  getAvailablePatients,
  switchAccount,
};

export default LoginService;
