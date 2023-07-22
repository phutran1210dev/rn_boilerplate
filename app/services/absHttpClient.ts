import Axios from 'axios';
import {get} from 'lodash';
import {getDeviceToken} from 'react-native-device-info';
import Config from 'react-native-config';

/**
 * Interface for the configuration parameters.
 */
interface ConfigParams {
  params: object;
}

/**
 * The base URL for the Axios instance.
 */
export const API_URL = Config.API_BASE_URL;

/**
 * Abstract class for making HTTP requests using Axios.
 */
abstract class HttpService {
  protected axiosInstance = Axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    this.setupInterceptors();
  }

  /**
   * Set up request and response interceptors.
   */
  protected setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      config => {
        this.addAuthorizationHeader(config);
        return config;
      },
      error => {
        return Promise.reject(error.response || error.request || error.message);
      },
    );

    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error.response);
      },
    );
  }

  /**
   * Add the authorization header to the request config.
   * @param config The request configuration.
   */
  protected abstract addAuthorizationHeader(config: any): void;

  /**
   * Set the device token as a parameter in the request config.
   */
  protected setDeviceTokenParam(): void {
    this.axiosInstance.defaults.params = {
      device_token: getDeviceToken(),
    };
  }

  /**
   * Send a custom request using the Axios instance.
   * @param config The configuration parameters for the request.
   * @returns A promise that resolves to the response.
   */
  protected request(config: ConfigParams) {
    config.params = {
      ...config.params,
    };

    return this.axiosInstance.request(config);
  }

  /**
   * Send a GET request using the Axios instance.
   * @param url The URL for the GET request.
   * @param config The configuration parameters for the request.
   * @returns A promise that resolves to the response.
   */
  protected get(url: string, config?: ConfigParams) {
    if (config) {
      config.params = {
        ...config.params,
      };
    }

    return this.axiosInstance.get(url, config);
  }

  // Other HTTP methods...
}

/**
 * Utility class for making HTTP requests.
 */
class Http extends HttpService {
  /**
   * Add the authorization header to the request config.
   * @param _config The request configuration.
   */
  protected addAuthorizationHeader(_config: any): void {
    // const { access_token } = store.getState(); // Update this to retrieve the access token from the store
    // config.headers['Authorization'] = `Bearer ${access_token}`;
  }

  // Additional utility methods...
}

/**
 * Handle the Axios service call and return a promise.
 * @param service The Axios service function to be called.
 * @returns A promise that resolves to the response or rejects with an error.
 */
export const axiosHandler = (service: any): Promise<any> => {
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
