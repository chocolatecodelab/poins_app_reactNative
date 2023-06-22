import { REST_URL_LOGIN, REST_URL_OTP_LOGIN } from "../../../tools/constant";
import { sendPostRequest } from "../../../tools/helper";

export const uploadLogin = async (data) => {
    const url = REST_URL_LOGIN
    const respon = sendPostRequest(url, data)
    return respon
}

export const uploadOtpLogin = async (data) => {
    const url = REST_URL_OTP_LOGIN
    const respon = sendPostRequest(url, data)
    return respon
}
