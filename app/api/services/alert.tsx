import axios, {AxiosError} from 'axios';
import request from '../Interface';
// import {BASE_URL} from '@env';

import env from '../../config/environment/env';

const baseURL = env.APP_URL + 'auth/login';

// const baseURL =
//   'https://gateway-demo.180medical.com/demo/api/mobile-patient-portal/v1/auth/login';

const API = axios.create({baseURL: baseURL});

// Get all Statements
function getCsaForm() {
  return request(
    {
      url: '/PatientPortal',
      method: 'GET',
    },
    true,
  );
}

// Get all pending change request
function getPendingRequest() {
  return request(
    {
      url: '/patient/profile/changes/pending',
      method: 'GET',
    },
    true,
  );
}


// To delete the pending request
async function requestCancel(changeRequestId: any) {
  try {
    const response = await request(
      {
        url: `patient/profile/changes/${changeRequestId}/delete`,
        method: 'PUT',
      },
      true,
    );
    return response;
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

const AlertService = {
  getCsaForm,
  getPendingRequest,
  requestCancel,
};

export default AlertService;
