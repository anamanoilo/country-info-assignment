import type { AxiosInstance } from 'axios';
import type { InjectionKey } from 'vue';

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryInfo[] | null;
}

export interface Holiday {
  date?: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed?: boolean; // deprecated: true
  global?: boolean;
  counties?: null;
  launchYear?: null;
  types: ['Public' | 'Private'];
}

export interface Country {
  countryCode: string;
  name: string;
}

export interface CountryWidget {
  name: string;
  countryCode: string;
  holidayName?: string;
  holidayDate?: string;
}

export const axiosKey = Symbol() as InjectionKey<AxiosInstance>;
