import { REST_URL_HISTORY_BARGING } from "../../../tools/constant"
import { sendGetRequest } from "../../../tools/helper";

export const downloadingHistoryBarging = async (id) => {
    const url = REST_URL_HISTORY_BARGING.replace(/\{id\}/, id);
    const respon = await sendGetRequest(url);
    return respon.Data
}