export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryInfo[] | null;
}

export interface Holiday {
  date?: 'string';
  localName: 'string';
  name: 'string';
  countryCode: 'string';
  fixed?: boolean; // deprecated: true
  global?: boolean;
  counties?: null;
  launchYear?: null;
  types: ['Public' | 'Private'];
}

export interface Country {
  countryCode: 'string';
  name: 'string';
}
