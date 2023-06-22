import { REST_URL_HISTORY_BARGIN_ONLINE } from "../../../tools/constant";
import { sendGetRequest } from "../../../tools/helper";

export const downloadHistoryBarginOnline = async (id) => {
    const url = REST_URL_HISTORY_BARGIN_ONLINE.replace(/\{id\}/, id);
    const respon = await sendGetRequest(url,)
    return respon.Data
}


