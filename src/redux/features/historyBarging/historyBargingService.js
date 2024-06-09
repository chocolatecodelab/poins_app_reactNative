import { REST_URL_HISTORY_BARGING } from "../../../tools/constant"
import { sendGetRequest } from "../../../tools/helper";

export const downloadingHistoryBarging = async (companyUserId) => {
    const url = REST_URL_HISTORY_BARGING.replace(/\{id\}/, companyUserId);
    const respon = await sendGetRequest(url);
    return respon.Data
}