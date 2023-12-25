import { Dimensions, Platform } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { HTTP_HEADER_VALUE_JSON, REST_BASE_URL, REST_METHOD_DELETE, REST_METHOD_GET, REST_METHOD_POST, REST_METHOD_PUT } from "./constant";
import DeviceInfo from 'react-native-device-info';

export const iconTools = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  Entypo,
  Octicons,
  EvilIcons,
}
export const ios = Platform.OS === 'ios';
export const android = Platform.OS === 'android';
export const iPad = DeviceInfo.getModel().includes('iPad');

export const stringMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des"
];


export const getScreenDimension = () => {
  const { height, width } = Dimensions.get('window');
  return { height, width };
};

export const sortAsc = (a, b) => (a > b ? 1 : -1);
export const sortDesc = (a, b) => (a > b ? -1 : 1);

export const convertArrToObj = (array, objKey) => (!array ? {} : array.reduce(
  (obj, item) => ({ ...obj, [item[objKey]]: item }), {},
));

const getHttpHeaders = async (authenticationToken) => {
  let headers = {
    'Content-Type': HTTP_HEADER_VALUE_JSON,
  };

  if (authenticationToken) {
    headers = { ...headers, Authorization: authenticationToken };
  }
  return headers;
};

const getHttpHeadersFormData = async (authenticationToken) => {
  let headers = {
    'Content-Type': 'multipart/form-data',
  };

  if (authenticationToken) {
    headers = { ...headers, Authorization: authenticationToken };
  }
  return headers;
};

export const sendPostFormRequest = async (apiPath, body, authenticationToken, customBaseUrl) => {
  const url = customBaseUrl ? `${customBaseUrl}${apiPath}` : `${REST_BASE_URL}${apiPath}`;
  const method = REST_METHOD_POST;
  const headers = await getHttpHeadersFormData(authenticationToken);
  const response = await fetch(url, { method, headers, body });
  return processResponse(response, url);
};

export const sendGetRequest = async (apiPath, authenticationToken, customBaseUrl) => {
  const url = customBaseUrl ? `${customBaseUrl}${apiPath}` : `${REST_BASE_URL}${apiPath}`;
  const method = REST_METHOD_GET;
  const headers = await getHttpHeaders(authenticationToken);
  const response = await fetch(url, { method, headers });
  return processResponse(response, url);
};

export const sendPostRequest = async (apiPath, body, authenticationToken, customBaseUrl) => {
  const bodyStr = JSON.stringify(body);
  const url = customBaseUrl ? `${customBaseUrl}${apiPath}` : `${REST_BASE_URL}${apiPath}`;
  const method = REST_METHOD_POST;
  const headers = await getHttpHeaders(authenticationToken);
  const response = await fetch(url, { method, headers, body: bodyStr });
  return processResponse(response, url);
};

export const sendPutRequest = async (apiPath, body, authenticationToken, customBaseUrl) => {
  const bodyStr = JSON.stringify(body);
  const url = customBaseUrl ? `${customBaseUrl}${apiPath}` : `${REST_BASE_URL}${apiPath}`;
  const method = REST_METHOD_PUT;
  const headers = await getHttpHeaders(authenticationToken);
  const response = await fetch(url, { method, headers, body: bodyStr });
  return processResponse(response);
};

export const sendDeleteRequest = async (apiPath, authenticationToken, customBaseUrl) => {
  const url = customBaseUrl ? `${customBaseUrl}${apiPath}` : `${REST_BASE_URL}${apiPath}`;
  const method = REST_METHOD_DELETE;
  const headers = await getHttpHeaders(authenticationToken);
  const response = await fetch(url, { method, headers });
  return processResponse(response);
};

const processResponse = async (response, url) => {
  const responseJSON = await response.json();
  console.log(responseJSON);
  if (response.status >= 200 && response.status <= 299) {
    return responseJSON;
  }
  
  const errorMessage = responseJSON ? responseJSON.Message ? responseJSON.Message : responseJSON.message : '';
  throw new Error(errorMessage);
};

