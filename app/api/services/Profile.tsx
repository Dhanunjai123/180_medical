import axios, {AxiosError} from 'axios';
import request from '../Interface';
import env from '../../config/environment/env';

const baseURL = env.APP_URL;

// const baseURL =
//   'https://gateway-demo.180medical.com/demo/api/mobile-patient-portal/v1/';

const API = axios.create({baseURL: baseURL});

/* GET */

// Get user profile data
function getProfileData() {
  return request(
    {
      url: '/patient/profile',
      method: 'GET',
    },
    true,
  );
}

// Get contact types
function getContactTypes() {
  return request(
    {
      url: '/patient/profile/patientContactTypes',
      method: 'GET',
    },
    true,
  );
}

// Get contact types
function getContact(contactId: any) {
  return request(
    {
      url: `/patient/profile/contacts/${contactId}`,
      method: 'GET',
    },
    true,
  );
}

// Get address
function getAddress(addressId: any) {
  return request(
    {
      url: `/patient/profile/addresses/${addressId}`,
      method: 'GET',
    },
    true,
  );
}

// Get states
function getStates() {
  return request(
    {
      url: '/app/usstates',
      method: 'GET',
    },
    true,
  );
}

// Get states
function getAocc() {
  return request(
    {
      url: '/patient/documents/aocc',
      method: 'GET',
    },
    true,
  );
}

/* POST */

// Add a new contact
async function addNewContact(body: any) {
  try {
    const response = await request(
      {
        url: '/patient/profile/contacts',
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

// Add and Edit a email
async function addEmail(
  contactId: any,
  values: any,
  isAdd: boolean,
  contactEmailId: any,
) {
  let email = JSON.stringify(values.value);
  try {
    if (isAdd) {
      // Add Email
      const response = await request(
        {
          url: `/patient/profile/contacts/${contactId}/email`,
          method: 'POST',
          data: email,
        },
        true,
      );
      return response;
    } else {
      // Edit Email
      const response = await request(
        {
          url: `/patient/profile/contacts/${contactId}/email/${contactEmailId}`,
          method: 'POST',
          data: email,
        },
        true,
      );
      return response;
    }
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

// Add and Edit a phone number
async function addPhoneNumber(
  contactId: any,
  values: any,
  isAdd: boolean,
  contactPhoneId: any,
) {
  let phone = values.value;
  try {
    if (isAdd) {
      // Add Phone number
      const response = await request(
        {
          url: `/patient/profile/contacts/${contactId}/phone`,
          method: 'POST',
          data: phone,
        },
        true,
      );

      return response;
    } else {
      // Edit Phone number
      const response = await request(
        {
          url: `/patient/profile/contacts/${contactId}/phone/${contactPhoneId}`,
          method: 'POST',
          data: phone,
        },
        true,
      );

      return response;
    }
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

// Verify and change address
async function verifyChangeAddress(body: any, isVerify: boolean) {
  try {
    if (isVerify) {
      const response = await request(
        {
          url: '/validation/address',
          method: 'POST',
          data: body,
        },
        true,
      );
      return response;
    } else {
      const response = await request(
        {
          url: '/patient/profile/address',
          method: 'PUT',
          data: body,
        },
        true,
      );
      return response;
    }
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

// Add a insurance detail
async function addInsurance(data: any) {
  var formData = new FormData();

  // data.Files.forEach((fileUri: any, index: number) => {
  //   formData.append(`files[${index}]`, {
  //     uri: fileUri.uri,
  //     type: fileUri.type, // 'image/jpeg', // Replace with the appropriate file type
  //     name: fileUri.name, // `file${index + 1}.jpg`, // Replace with the appropriate file name
  //   });
  // });

  // Append additional data to the FormData
  formData.append('GroupNumber', data.GroupNumber);
  formData.append('InsuranceName', data.InsuranceName);
  formData.append('InsuranceName', data.InsuranceName);
  formData.append('InsurancePhoneNumber', data.InsurancePhoneNumber);
  formData.append('PolicyHolder', data.PolicyHolder);
  formData.append('PolicyNumber', data.PolicyNumber);

  console.log(data, 'insuranceee');
  try {
    const response = await request(
      {
        url: '/patient/profile/insurance',
        method: 'POST',
        data: formData,
      },
      true,
      true,
    );
    return response;
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

/* DELETE */

// Remove a contact
async function deleteContact(contactId: any) {
  try {
    const response = await request(
      {
        url: `/patient/profile/contacts/${contactId}`,
        method: 'DELETE',
      },
      true,
    );

    return response;
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

// Remove a email or phone
async function deleteEmailPhone(
  contactId: any,
  isEmailDelete: any,
  contactEmailPhoneId: any,
) {
  try {
    if (isEmailDelete) {
      const response = await request(
        {
          url: `/patient/profile/contacts/${contactId}/email`,
          method: 'DELETE',
          data: contactEmailPhoneId,
        },
        true,
      );

      return response;
    } else {
      const response = await request(
        {
          url: `/patient/profile/contacts/${contactId}/phone`,
          method: 'DELETE',
          data: contactEmailPhoneId,
        },
        true,
      );

      return response;
    }
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

// Remove a contact
async function clearContactEmergency(contactId: any) {
  try {
    const response = await request(
      {
        url: '/patient/profile/contacts/emergency',
        method: 'DELETE',
        data: contactId,
      },
      true,
    );

    return response;
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

// Make a contact as a designee - Save AOCC
async function makeDesigneeSaveAocc(body: any) {
  try {
    const response = await request(
      {
        url: '/patient/documents/aocc',
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

/* PUT */

// To make email or phone number as primary
async function makePhoneEmailPrimary(
  contactId: any,
  phoneId: any,
  emailId: any,
  type: any,
) {
  try {
    if (type == 'phone number') {
      const response = await request(
        {
          url: `/patient/profile/contacts/${contactId}/phone/${phoneId}/primary`,
          method: 'PUT',
          data: {
            contactId: contactId,
          },
        },
        true,
      );

      return {isError: false, data: response};
    } else {
      const response = await request(
        {
          url: `/patient/profile/contacts/${contactId}/email/${emailId}/primary`,
          method: 'PUT',
          data: {
            contactId: contactId,
          },
        },
        true,
      );

      return response;
    }
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

// To enable a contact as emergency contact
async function makeContactEmergency(contactId: any) {
  try {
    const response = await request(
      {
        url: '/patient/profile/contacts/emergency',
        method: 'PUT',
        data: contactId,
      },
      true,
    );
    return response;
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

// Make a contact as a designee - Set Designee
async function setDesignee(documentId: any, contactId: any) {
  try {
    const response = await request(
      {
        url: `patient/profile/contacts/${contactId}/designee`,
        method: 'PUT',
        data: documentId,
      },
      true,
    );
    return response;
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
}

const ProfileService = {
  getProfileData,
  getContactTypes,
  addNewContact,
  addEmail,
  getContact,
  addPhoneNumber,
  deleteContact,
  deleteEmailPhone,
  getAddress,
  verifyChangeAddress,
  getStates,
  makePhoneEmailPrimary,
  makeContactEmergency,
  addInsurance,
  clearContactEmergency,
  getAocc,
  makeDesigneeSaveAocc,
  setDesignee,
};

export default ProfileService;
