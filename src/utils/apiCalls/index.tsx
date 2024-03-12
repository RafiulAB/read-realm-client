// Assuming 'commonrequest.ts' is in the same directory

import { CommonRequestProps, commonrequest } from "../apiHelper";

const BASE_URL = 'https://read-realm-server.vercel.app'; // Replace with your actual base URL

export const bookGetFunc = async (
  search: string,
  category: string,
  page: number
): Promise<any> => {
  const endpoint = `/books/get-all?search=${search}&category=${category}&page=${page}`;

  const requestConfig: CommonRequestProps = {
    methods: 'GET',
    url: `${BASE_URL}${endpoint}`,
  };

  return await commonrequest(requestConfig);
};
