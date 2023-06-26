import {Platform} from 'react-native';
import Axios from 'axios';
import {get} from 'lodash';
import {getDeviceToken} from 'react-native-device-info';

interface ConfigParams {
  params: object;
}

export const AXIOS_AUTH_TOKEN_URL = 'http://localhost:8000/api';

export const AxiosInstance = Axios.create({
  baseURL:
    Platform.OS == 'android'
      ? 'http://10.0.2.2:8000/api'
      : AXIOS_AUTH_TOKEN_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'mobile',
  },
});

AxiosInstance.interceptors.request.use(
  (response: any) => response,
  (error: any) => {
    Promise.reject(error.response || error.request || error.message);
  },
);

AxiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    return Promise.reject(error.response);
  },
);

const http = {
  setAuthorizationHeader(accessToken: string) {
    AxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  },

  setDeviceTokenParam() {
    AxiosInstance.defaults.params = {
      device_token: getDeviceToken(),
    };
  },

  setUserIdAfterLogin(userId: string) {
    AxiosInstance.defaults.params = {
      user_id: userId,
    };
  },

  request(config: ConfigParams) {
    config.params = {
      ...config.params,
    };

    return AxiosInstance.request(config);
  },

  get(url: string, config?: ConfigParams) {
    if (config) {
      config.params = {
        ...config.params,
      };
    }

    return AxiosInstance.get(url, config);
  },

  post(url: string, data: any, config?: ConfigParams) {
    if (config) {
      config.params = {
        ...config.params,
      };
    }

    return AxiosInstance.post(url, data, config);
  },

  put(url: string, data = {}, config?: ConfigParams) {
    if (config) {
      config.params = {
        ...config.params,
      };
    }

    return AxiosInstance.put(url, data, config);
  },

  patch(url: string, data = {}, config?: ConfigParams) {
    if (config) {
      config.params = {
        ...config.params,
      };
    }

    return AxiosInstance.patch(url, data, config);
  },

  delete(url: string, config?: ConfigParams) {
    if (config) {
      config.params = {
        ...config.params,
      };
    }

    return AxiosInstance.delete(url, config);
  },
};

export const axiosHandler = (service: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await service();
      if (!response) {
        throw 'Request error';
      }
      const apiResponse = get(response, 'response', undefined);
      const httpStatus = get(response, 'status', 500);

      if (apiResponse === '' || (response && response.status >= 500)) {
        resolve({isSuccess: false, isInternalServerError: true});
      }
      let message = null;
      resolve({
        httpStatus,
        message,
        response,
        isInternalServerError: false,
        data: response.data.data,
      });
    } catch (error) {
      // TODO: Check this Error & Fill correct to reject
      console.log("🚀 ~ file: httpClient.ts:136 ~ returnnewPromise<any> ~ error:", error)
      reject({
        code_error: error,
        message_error: error,
        status: error || 'unknown',
      });
    }
  });
};

export default http;
