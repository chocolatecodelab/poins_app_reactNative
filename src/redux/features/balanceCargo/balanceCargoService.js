import { REST_URL_BALANCE_CARGO, REST_URL_BALANCE_CARGO_HISTORY, REST_URL_BALANCE_CARGO_HISTORY_PERIODIC } from "../../../tools/constant";
import { sendGetRequest, sendGetRequestBalanceCargo } from "../../../tools/helper";

export const downloadingBalanceCargo = async () => {
    const url = REST_URL_BALANCE_CARGO;
    const respon = await sendGetRequest(url);
    return respon.Data;
}

export const downloadingBalanceCargoHistory = async (params) => {
    const url = REST_URL_BALANCE_CARGO_HISTORY_PERIODIC
    .replace(/\{startDateTime\}/, params.startDate)
    .replace(/\{endDateTime\}/, params.finishDate);
    console.log(url);
    const respon = await sendGetRequestBalanceCargo(url);
    return respon.Data;
}

