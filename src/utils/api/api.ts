import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import NetInfo from '@react-native-community/netinfo';

export const axiosInstance = axios.create({
  baseURL: Config.API_HOST,
  timeout: 1000 * 300, // 5 minutes
  timeoutErrorMessage: 'request.timed.out',
});

type DefaultApiReponse<T> = {
  data: T;
  message: string | boolean;
  success: boolean;
};

/**
 * This is because all the apis support a format of DefaultApiReponse type, and we don't want to repeat these types,
 * rather we want to only add types for the data
 *
 */
export const api = {
  get: function <T extends any>(
    ...params: Parameters<typeof axiosInstance.get>
  ) {
    return axiosInstance.get<DefaultApiReponse<T>>(...params);
  },
  post: function <T extends any>(
    ...params: Parameters<typeof axiosInstance.post>
  ) {
    return axiosInstance.post<DefaultApiReponse<T>>(...params);
  },
  put: function <T extends any>(
    ...params: Parameters<typeof axiosInstance.put>
  ) {
    return axiosInstance.put<DefaultApiReponse<T>>(...params);
  },
  delete: function <T extends any>(
    ...params: Parameters<typeof axiosInstance.delete>
  ) {
    return axiosInstance.delete<DefaultApiReponse<T>>(...params);
  },
};

axiosInstance.interceptors.request.use(async config => {
  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      throw new Error('Network Error');
    }
  } catch (error) {
    return Promise.reject(error);
  }
  console.log('Starting Request', JSON.stringify(config));
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // if (response.data.success !== true) {
    //   const errorMessage = response?.data?.message || 'Something went wrong';
    //   throw new Error(errorMessage);
    // }
    return response;
  },
  (error: any) => {
    // eslint-disable-next-line no-console
    console.log({ apiError: error });
    if (error?.message === 'Network Error') {
      throw new Error('Please check your internet');
    }
    const errorMessage =
      error?.response?.data?.message || 'Something went wrong';
    throw new Error(errorMessage);
  },
);
