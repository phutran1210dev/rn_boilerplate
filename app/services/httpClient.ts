import Axios from 'axios';
import {get} from 'lodash';
import {getDeviceToken} from 'react-native-device-info';
import Config from 'react-native-config';
// import store from '@store';

/**
 * Interface for the configuration parameters.
 */
interface ConfigParams {
  params: object;
}

/**
 * The base URL for the Axios instance.
 */
const API_URL = Config.API_BASE_URL;

/**
 * Create an instance of Axios with default configuration.
 */
const AxiosInstance = Axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add an interceptor for the request.
 */
AxiosInstance.interceptors.request.use(
  (config: any) => {
    // const {access_token} = store.getState(); // Update this to retrieve the access token from the store
    // config.headers['Authorization'] = `Bearer ${access_token}`;
    return config;
  },
  (error: any) => {
    Promise.reject(error.response || error.request || error.message);
  },
);

/**
 * Add an interceptor for the response.
 */
AxiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error.response);
  },
);

/**
 * Utility functions for making HTTP requests.
 */
const Http = {
  /**
   * Set the authorization header for the Axios instance.
   * @param access_token The access token to be set in the header.
   */
  setAuthorizationHeader(access_token: string) {
    AxiosInstance.defaults.headers.Authorization = `Bearer ${access_token}`;
  },

  /**
   * Set the device token as a parameter in the Axios instance.
   */
  setDeviceTokenParam() {
    AxiosInstance.defaults.params = {
      device_token: getDeviceToken(),
    };
  },

  /**
   * Set the user ID as a parameter in the Axios instance.
   * @param userId The user ID to be set as a parameter.
   */
  setUserIdAfterLogin(userId: string) {
    AxiosInstance.defaults.params = {
      user_id: userId,
    };
  },

  /**
   * Send a custom request using the Axios instance.
   * @param config The configuration parameters for the request.
   * @returns A promise that resolves to the response.
   */
  request(config: ConfigParams) {
    config.params = {
      ...config.params,
    };

    return AxiosInstance.request(config);
  },

  /**
   * Send a GET request using the Axios instance.
   * @param url The URL for the GET request.
   * @param config The configuration parameters for the request.
   * @returns A promise that resolves to the response.
   */
  get(url: string, config?: ConfigParams) {
    if (config) {
      config.params = {
        ...config.params,
      };
    }

    return AxiosInstance.get(url, config);
  },

  // Other HTTP methods...
};

/**
 * Handle the Axios service call and return a promise.
 * @param service The Axios service function to be called.
 * @returns A promise that resolves to the response or rejects with an error.
 */
export const axiosHandler = (service: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await service();
      if (!response) {
        throw 'Request error';
      }
      const apiResponse = get(response, 'response', undefined);
      const httpStatus = get(response, 'status', 500);

      // TODO: Change response status
      if (apiResponse === '' || (response && response.status >= 500)) {
        resolve({isSuccess: false, isInternalServerError: true});
      }
      let message = null;
      resolve({
        httpStatus,
        message,
        response,
        isInternalServerError: false,
        data: response.data,
      });
    } catch (error) {
      reject({
        code_error: error.data.status,
        message_error: error,
        status: error || 'unknown',
      });
    }
  });
};

export default Http;
