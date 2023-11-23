import axios, {AxiosError} from 'axios';
import request from '../Interface';
// import {BASE_URL} from '@env';
import env from '../../config/environment/env';

const baseURL = env.APP_URL;

// const baseURL =
//   'https://gateway-demo.180medical.com/demo/api/mobile-patient-portal/v1/';

const API = axios.create({baseURL: baseURL});

// Get all Messages
function getMessageList(messagePerPage: any, pageNumber: any) {
  return request(
    {
      url: `/patient/messages?messagesPerPage=${messagePerPage}&pageNumber=${pageNumber}`,
      method: 'GET',
    },
    true,
  );
}

// Get message notification
function getMessageCount() {
  return request(
    {
      url: '/patient/messages/count/unread',
      method: 'GET',
    },
    true,
  );
}

// Update Message Status
function updateMessageStatus(emailQueueId: any) {
  return request(
    {
      url: '/patient/messages/read',
      method: 'PUT',
      data: JSON.stringify(emailQueueId),
    },
    true,
    false,
  );
}

const MessageService = {
  getMessageList,
  getMessageCount,
  updateMessageStatus,
};

export default MessageService;
