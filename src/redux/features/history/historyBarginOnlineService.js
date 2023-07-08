import { REST_URL_HISTORY_BARGIN_ONLINE } from "../../../tools/constant";
import { sendGetRequest } from "../../../tools/helper";

export const downloadHistoryBarginOnline = async (params) => {
    const url = REST_URL_HISTORY_BARGIN_ONLINE
        .replace(/\{id\}/, params.id)
        .replace(/\{startDate\}/, params.startDate)
        .replace(/\{finishDate\}/, params.finishDate);
    const respon = await sendGetRequest(url,)
    return respon.Data
}


