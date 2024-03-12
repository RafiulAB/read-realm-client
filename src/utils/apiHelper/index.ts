
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export interface CommonRequestProps {
  methods: string;
  url: string;
  body?: any;
  header?: Record<string, string>;
}

export const commonrequest = async ({
  methods,
  url,
  body,
  header,
}: CommonRequestProps): Promise<AxiosResponse<any>> => {
  const config: AxiosRequestConfig = {
    method: methods,
    url,
    headers: header
      ? header
      : {
          "Content-Type": "application/json",
        },
    data: body,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    // If there's an error, AxiosError is thrown
    return Promise.reject((error as AxiosError).response || error);
  }
};
