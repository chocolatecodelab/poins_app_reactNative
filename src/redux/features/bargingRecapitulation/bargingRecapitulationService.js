import { REST_URL_BARGING_RECAPITULATION } from "../../../tools/constant";
import { sendGetRequest } from "../../../tools/helper";

export const downloadBargingRecapitulation = async (params) => {
    const url = REST_URL_BARGING_RECAPITULATION
        .replace(/\{id\}/, params.id)
        .replace(/\{startDate\}/, params.startDate)
        .replace(/\{finishDate\}/, params.finishDate);
    const respon = await sendGetRequest(url,)
    return respon.Data
}


