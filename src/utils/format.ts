import { AxiosResponse } from 'axios';

interface jsonResponse<T = any> {
  data: T;
  message: string;
  state: number;
}

export function responseFormatter<T>(
  axiosResponse: AxiosResponse<jsonResponse<T>>,
): T {
  return axiosResponse.data.data;
}
