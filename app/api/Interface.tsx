import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../config/environment/env';

const request = async function (
  options: any,
  isHeader: boolean,
  isFile?: boolean,
): Promise<any> {
  let authHeader: string | null = null;

  let file: string = 'application/json';
  if (isHeader) {
    authHeader = await AsyncStorage.getItem('userToken'); /// Add header
  }


  if (isFile) {
    file = 'multipart/form-data'; /// Add header
  }

  const client: AxiosInstance = axios.create({
    // production url
    // baseURL:
    //   'https://gateway-demo.180medical.com/demo/api/mobile-patient-portal/v1',
    baseURL: env.APP_URL,
    headers: {
      Authorization: `Bearer ${authHeader}`,
      'Content-Type': file,
    },
  });

  const onSuccess = function (response: AxiosResponse<any>): any {
    if (
      typeof response.data === 'string' ||
      typeof response.data === 'number'
    ) {
      return response;
    } else if (typeof response === 'object') {
      return response;
    } else {
      return response.data;
    }
  };

  const onError = async function (error: any): Promise<any> {
    if (error.response) {
      if (error.response.status === 401) {
        await AsyncStorage.clear();
      } else if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // Handle the axios error response
          return {isError: true, data: axiosError.response};
        }
      } else {
        // Handle non-Axios errors
        return {isError: true, data: error};
      }

      // Request was made but server responded with something
      if (
        error.response.status === 401 &&
        error.response.data.message !== "You don't have permission"
      ) {
        console.log('401 ............');
        await AsyncStorage.clear();
      }
    } else {
      // Something else happened while setting up the request
      await AsyncStorage.clear();
    }

    return Promise.reject(
      error.response || {
        data: {errors: {detail: error.message}, message: error.message},
      },
    );
  };
  return client(options).then(onSuccess).catch(onError);
};

export default request;
