import axios from 'axios';
import type { App } from 'vue';

interface AxiosOptions {
  baseUrl?: string;
  token?: string;
}

export default {
  install: (app: App, options: AxiosOptions) => {
    const axiosInstance = axios.create({
      baseURL: options.baseUrl,
      headers: {
        // NOTE not needed in NagerAPI unless we have to auth in our own API
        Authorization: options.token ? `Bearer ${options.token}` : '',
      },
    });
    app.config.globalProperties.$axios = axiosInstance;
    app.provide('axios', axiosInstance);
  },
};
