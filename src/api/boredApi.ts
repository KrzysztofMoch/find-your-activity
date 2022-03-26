/* eslint-disable no-unused-vars */
// doc - https://www.boredapi.com/documentation
import axios from 'axios';
import Netinfo from '@react-native-community/netinfo';

import { handleNoConnection, handleObsoleteApi, showError } from '../helpers/handleError';
import { OptionsSliceType } from '../redux/optionsSlice';
import activityData from '../types/activityData';
import searchOption from '../types/searchOption';

const emptyResult: activityData = {
  price: 0,
  accessibility: 0,
  activity: '#ERROR',
  activityType: 'busywork',
  participants: 0,
  key: 0,
};

const API = axios.create({
  baseURL: 'http://www.boredapi.com/api/activity/',
  timeout: 5000,
  method: 'GET',
});

const handleStatusError = (status: number) => {
  showError(
    'Something went wrong',
    `Response has code ${status}, if the error persists please let me know`
  );
};

const hasInternetConnection: () => Promise<boolean | null> = async () => {
  return (await Netinfo.fetch()).isInternetReachable;
};

// ------------------------- requests -------------------------

const getRandomActivity: () => Promise<activityData> = async () => {
  if (!(await hasInternetConnection())) {
    handleNoConnection();
    return emptyResult;
  }

  const response = await API.get('');

  if (response.status !== 200) {
    handleStatusError(response.status);
    return emptyResult;
  }

  const result: activityData = response.data;
  return result;
};

const getActivityByKey: (key: string) => Promise<activityData> = async (key: string) => {
  if (!(await hasInternetConnection())) {
    handleNoConnection();
    return emptyResult;
  }

  const response = await API.get(`?key=${key}`);

  if (response.status !== 200) {
    handleStatusError(response.status);
    return emptyResult;
  }

  const result: activityData = response.data;
  return result;
};

const getActivityByProperties: (properties: OptionsSliceType) => Promise<activityData> = async (
  properties: OptionsSliceType
) => {
  if (!(await hasInternetConnection())) {
    handleNoConnection();
    return emptyResult;
  }

  let url: string = '';

  switch (properties.searchOption) {
    case searchOption.ACCESSIBILITY:
      url = `?accessibility=${properties.accessibilityMax}`;
      break;
    case searchOption.ACCESSIBILITY_RANGE:
      url = `?minaccessibility=${properties.accessibilityMin}&maxaccessibility=${properties.accessibilityMax}`;
      break;
    case searchOption.PRICE:
      url = `?price=${properties.priceMax}`;
      break;
    case searchOption.PRICE_RANGE:
      url = `?minprice=${properties.accessibilityMin}&maxprice=${properties.accessibilityMax}`;
      break;
    case searchOption.ACTIVITY_TYPE:
      url = `?type=${properties.activityType.join('&type=')}`;
      break;
    case searchOption.PARTICIPANTS:
      url = `?participants=${properties.participants}`;
      break;
    default:
      break;
  }

  const response = await API.get(url);

  if (response.status !== 200) {
    handleStatusError(response.status);
    return emptyResult;
  }

  try {
    const result: activityData = { ...response.data, activityType: response.data.type };
    return result;
  } catch {
    handleObsoleteApi();
  }

  return emptyResult;
};

export { getRandomActivity, getActivityByKey, getActivityByProperties };
