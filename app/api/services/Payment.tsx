import axios, {AxiosError} from 'axios';
import request from '../Interface';
// import {BASE_URL} from '@env';

import env from '../../config/environment/env';

const baseURL = env.APP_URL;

// const baseURL =
//   'https://gateway-demo.180medical.com/demo/api/mobile-patient-portal/v1/';

const API = axios.create({baseURL: baseURL});

// Get all Payments
function getPaymentList() {
  return request(
    {
      url: '/patient/statements/balance',
      method: 'GET',
    },
    true,
  );
}

// Get all Statements
function getPaymentStatement() {
  return request(
    {
      url: '/patient/statements',
      method: 'GET',
    },
    true,
  );
}

const PaymentService = {
  getPaymentList,
  getPaymentStatement,
};

export default PaymentService;
