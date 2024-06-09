import { REST_URL_ACTIVE_BARGING } from "../../../tools/constant";
import { sendGetRequest } from "../../../tools/helper";

export const downloadBargingActive = async () => {
    const url = REST_URL_ACTIVE_BARGING;
    const respon = await sendGetRequest(url)
    return respon.Data
}


