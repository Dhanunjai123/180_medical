import axios, {AxiosError} from 'axios';
import request from '../Interface';
// import {BASE_URL} from '@env';

import env from '../../config/environment/env';

const baseURL = env.APP_URL;

// const baseURL =
//   'https://gateway-demo.180medical.com/demo/api/mobile-patient-portal/v1/';

const API = axios.create({baseURL: baseURL});

// Get all Orders
function getOrders() {
  return request(
    {
      url: '/patient/orders',
      method: 'GET',
    },
    true,
  );
}

// Get Upcoming Orders
function getUpcomingOrders() {
  return request(
    {
      url: '/patient/orders/upcoming',
      method: 'GET',
    },
    true,
  );
}

// Get order details based on Id

function getOrderId(id: any) {
  return request(
    {
      url: '/patient/orders/confirmation',
      method: 'POST',
      data: {
        ConfOrderId: id,
      },
    },
    true,
  );
}

// Get Change Request order details

function getChangeRequest(id: any) {
  return request(
    {
      url: '/patient/orders/changeRequest/' + id,
      method: 'GET',
    },
    true,
  );
}

async function confirmationSave(body: any) {
  try {
    const response = await API.post('/patient/orders/confirm', body);
    return {isError: false, data: response.data};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle the error response
        return {isError: true, data: axiosError.response};
      }
    } else {
      // Handle non-Axios errors
      console.log(error);
    }
  }
}

// confirmationRequestSave

async function confirmationRequestSave(body: any) {
  try {
    const response = await request(
      {
        url: '/patient/orders/changeRequest',
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

// validationSave

async function orderValidationSave(body: any) {
  try {
    const response = await request(
      {
        url: '/patient/orders/validate/confirm',
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

// Get Terms and service

function getTerms() {
  return request(
    {
      url: '/app/PatientPortal',
      method: 'GET',
    },
    true,
  );
}

// Get CSA alert
function getCsaAlerts() {
  return request(
    {
      url: '/patient/documents/csa',
      method: 'GET',
    },
    true,
  );
}

// Get Balance
function getBalance() {
  return request(
    {
      url: '/patient/statements/balance',
      method: 'GET',
    },
    true,
  );
}

// Get Survey Check
function getSurveyNeededCheck() {
  return request(
    {
      url: '/patient/documents/surveys/needed',
      method: 'GET',
    },
    true,
  );
}

// To change the password - authenticated
async function changePassword(body: any) {
  try {
    const response = await request(
      {
        url: '/auth/change_password',
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

//Get version number

function getVersionNumber() {
  return request(
    {
      url: '/app/version',
      method: 'GET',
    },
    true,
  );
}

const DashboardService = {
  getUpcomingOrders,
  getOrders,
  getOrderId,
  confirmationSave,
  getChangeRequest,
  getTerms,
  confirmationRequestSave,
  getCsaAlerts,
  getBalance,
  getSurveyNeededCheck,
  changePassword,
  orderValidationSave,
  getVersionNumber,
};

export default DashboardService;
