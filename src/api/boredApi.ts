/* eslint-disable no-unused-vars */
// doc - https://www.boredapi.com/documentation
import axios from 'axios'; 
import dataSlice from '../redux/dataSlice';
import { OptionsSliceType } from '../redux/optionsSlice';
import activityData from '../types/activityData';
import searchOption from '../types/seacrhOption';

const API = axios.create({
    baseURL: 'http://www.boredapi.com/api/activity/',
    timeout: 5000,
    method: 'GET',
})

const showError = (status: number) => {
    
}

const getRandomActivity: () => Promise<activityData> = async () => {
    const response = await API.get('')

    if (response.status !== 200) {
        // TODO: make error system
    }

    const result: activityData = response.data;
    return result;
}

const getActivityByKey: (key: string) => Promise<activityData> = async (key: string) => {
    const response = await API.get(`?key=${key}`)

    if (response.status !== 200) {
        // TODO: make error system
    }

    const result: activityData = response.data;
    return result;
}

const getActivityByProperties: (properties: OptionsSliceType) => Promise<activityData> = async (properties: OptionsSliceType) => {
    
    let url: string = '';

    switch(properties.searchOption) {
        case searchOption.ACCESSIBILITY:
            url = `?accessibility=${properties.accessibilityMax}`
            break;
        case searchOption.ACCESSIBILITY_RANGE:
            url = `?minaccessibility=${properties.accessibilityMin}&maxaccessibility=${properties.accessibilityMax}`
            break;
        case searchOption.PRICE:
            url = `?price=${properties.priceMax}`
            break;
        case searchOption.PRICE_RANGE:
            url = `?minprice=${properties.accessibilityMin}&maxprice=${properties.accessibilityMax}`
            break;
        case searchOption.ACTIVITY_TYPE:
            url = `?type=${properties.activityType.join('&type=')}`
            break;
        case searchOption.PARTICIPANTS:
            url = `?participants=${properties.participants}`
            break;
        default:
            break;                        
    }

    const response = await API.get(url)

    if (response.status !== 200) {
        // TODO: make error system
    }

    const result: activityData = { ...response.data, activityType: response.data.type }

    return result;
}

export {
    getRandomActivity,
    getActivityByKey,
    getActivityByProperties,
}