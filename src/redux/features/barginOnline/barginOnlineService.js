import { REST_URL_BARGIN_ONLINE_BOOKING_DATE, REST_URL_BARGIN_ONLINE_CUSTOMER, REST_URL_CREATE_BARGIN_ONLINE, REST_URL_TIME_BARGIN_ONLINE } from "../../../tools/constant";
import { sendGetRequest, sendPostRequest, sortAsc } from "../../../tools/helper";

export const downloadCustomer = async () => {
    const url = REST_URL_BARGIN_ONLINE_CUSTOMER
    const respon = await sendGetRequest(url,)
    const result = {
        company: respon.Data.company.sort((a, b) => sortAsc(a.name, b.name)),
        barge: respon.Data.barge.sort((a, b) => sortAsc(a.name, b.name)),
        tugBoat: respon.Data.tugBoat.sort((a, b) => sortAsc(a.name, b.name)),
        jetty: respon.Data.jetty,
        capacity: respon.Data.capacity,
    }
    return result
}

export const uploadBargin = async (data) => {
    const url = REST_URL_CREATE_BARGIN_ONLINE
    const respon = await sendPostRequest(url, data)
    return respon
}

export const downloadListBooking = async (params) => {
    const url = REST_URL_BARGIN_ONLINE_BOOKING_DATE.replace(/\{id\}/, params.id).replace(/\{jetty\}/, params.jetty);
    const respon = await sendGetRequest(url)
    return respon.Data
}

export const downloadTimeBooking = async (params) => {
    const url = REST_URL_TIME_BARGIN_ONLINE.replace(/\{date\}/, params.date).replace(/\{jetty\}/, params.jetty);
    const respon = await sendGetRequest(url)
    return respon.Data
}

