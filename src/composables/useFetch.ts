import { ref, watchEffect, toValue } from 'vue';
import type { Ref } from 'vue';
import { AxiosError } from 'axios';
import api from '../services/api';

export function useFetch<T>(url: Ref<string>) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  watchEffect(async () => {
    data.value = null;
    loading.value = true;
    error.value = null;
    const urlValue = toValue(url);

    try {
      const response = await api().get(urlValue);
      data.value = response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        error.value = err.message;
        console.error('Axios Error:', err.message);
      } else {
        error.value = 'Something went wrong.';
        console.error('Unknown Error:', err);
      }
    } finally {
      loading.value = false;
    }
  });

  return {
    data,
    error,
    loading,
  };
}
