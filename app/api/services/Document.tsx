import request from '../Interface';
import axios, {AxiosError} from 'axios';
import env from '../../config/environment/env';

const baseURL = env.APP_URL;

// const baseURL =
//   'https://gateway-demo.180medical.com/demo/api/mobile-patient-portal/v1/';

const API = axios.create({baseURL: baseURL});

/* GET */

// Get all Messages
function getDocumentList() {
  return request(
    {
      url: 'patient/documents',
      method: 'GET',
    },
    true,
  );
}

// Get document by id
function getDocumentById(documentId: any) {
  return request(
    {
      url: `patient/documents/${documentId}`,
      method: 'GET',
    },
    true,
  );
}

// Get document by id
function getStatemnetCsa() {
  return request(
    {
      url: 'patient/documents/csa/form',
      method: 'GET',
    },
    true,
  );
}

// Get document by Survey
function getSurveyQue() {
  return request(
    {
      url: 'patient/documents/survey',
      method: 'GET',
    },
    true,
  );
}

async function confirmationSave(body: any) {
  try {
    const response = await API.post('/patient/documents/survey', body);
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

async function confirmationSurveySave(body: any) {
  try {
    const response = await request(
      {
        url: '/patient/documents/survey',
        method: 'POST',
        data: body,
      },
      true,
    );
    // console.log(response, 'loloooloo');
    return response;
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

// To save CSA form
async function saveCsa(body: any) {
  try {
    const response = await request(
      {
        url: '/patient/documents/csa',
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

const DocumentService = {
  getDocumentList,
  getDocumentById,
  getStatemnetCsa,
  getSurveyQue,
  confirmationSurveySave,
  saveCsa,
};

export default DocumentService;
