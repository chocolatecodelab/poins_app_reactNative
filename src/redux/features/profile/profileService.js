import { REST_URL_EDIT_PROFILE, REST_URL_MY_PROFILE, REST_URL_UPLOAD_IMAGE_PROFILE } from "../../../tools/constant";
import { sendGetRequest, sendPostFormRequest, sendPostRequest } from "../../../tools/helper";

export const downlodingProfile = async (id) => {
    const url = REST_URL_MY_PROFILE.replace(/\{id\}/, id);
    const respon = await sendGetRequest(url);
    const result = {
        email: respon.Data.EMAIL,
        photo: respon.Data.FOTO,
        id: respon.Data.ID,
        name: respon.Data.NAMA,
        phoneNumber: respon.Data.TELEPON,
    }
    return result
}

export const uploadImageProfile = async (data) => {
    const url = REST_URL_UPLOAD_IMAGE_PROFILE.replace(/\{id\}/, data?.id);
    const body = {
        FOTO: data.photo
    }
    const respon = await sendPostRequest(url, body);
    return respon
}

export const updatingProfile = async (data) => {
    const url = REST_URL_EDIT_PROFILE.replace(/\{id\}/, data?.id);
    const body = {
        EMAIL: data.email,
        // PASSWORD: data.password,
        TELEPON: data.phoneNumber,
        NAMA: data.name
    }
    const respon = await sendPostRequest(url, body)
    return respon
}
