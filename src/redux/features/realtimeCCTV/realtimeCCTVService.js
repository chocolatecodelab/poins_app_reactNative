import { REST_URL_LIST_CCTV } from "../../../tools/constant";
import { sendGetRequest } from "../../../tools/helper";

export const downlodingCCTV = async () => {
    const url = REST_URL_LIST_CCTV;
    const respon = await sendGetRequest(url);
    return respon.Data
}