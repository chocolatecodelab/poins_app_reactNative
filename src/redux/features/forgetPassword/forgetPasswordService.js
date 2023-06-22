import { REST_URL_FORGET_PASSWORD_STEP_ONE, REST_URL_FORGET_PASSWORD_STEP_THREE, REST_URL_FORGET_PASSWORD_STEP_TWO } from "../../../tools/constant";
import { sendPostRequest } from "../../../tools/helper";

export const uploadEmailForgetPassword = async (data) => {
    const url = REST_URL_FORGET_PASSWORD_STEP_ONE
    const respon = sendPostRequest(url, data)
    return respon
}

export const uploadValidateOtpForgetPassword = async (data) => {
    const url = REST_URL_FORGET_PASSWORD_STEP_TWO
    const respon = sendPostRequest(url, data)
    return respon
}

export const uploadNewPassword = async (data) => {
    const url = REST_URL_FORGET_PASSWORD_STEP_THREE
    const respon = sendPostRequest(url, data)
    return respon
}
