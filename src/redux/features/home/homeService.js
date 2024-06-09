import { REST_URL_CHANGE_NOTIFICATION, REST_URL_CHECK_VERSION, REST_URL_LIST_NOTIFICATION, REST_URL_MENU_APP } from "../../../tools/constant";
import { sendGetRequest, sendPostRequest, sortDesc } from "../../../tools/helper";

export const downlodingMenu = async (id) => {
    const url = REST_URL_MENU_APP.replace(/\{id\}/, id);
    const respon = await sendGetRequest(url);
    return respon.Data.sort((a, b) => sortDesc(a.STATUS, b.STATUS)) 
}

export const downlodingCheckVersion = async () => {
    const url = REST_URL_CHECK_VERSION
    const respon = await sendGetRequest(url);
    return respon.Data
}

export const downlodingNotification = async (id) => {
    const url = REST_URL_LIST_NOTIFICATION.replace(/\{id\}/, id);
    const respon = await sendGetRequest(url);
    return respon.Data
}

export const uploadNotificationChange = async (params) => {
    const url = REST_URL_CHANGE_NOTIFICATION.replace(/\{id_notifikasi\}/, params);
    const respon = await sendPostRequest(url);
    return respon
}