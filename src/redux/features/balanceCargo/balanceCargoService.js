import { REST_URL_BALANCE_CARGO, REST_URL_BALANCE_CARGO_HISTORY } from "../../../tools/constant";
import { sendGetRequest } from "../../../tools/helper";

export const downloadingBalanceCargo = async () => {
    const url = REST_URL_BALANCE_CARGO;
    const respon = await sendGetRequest(url);
    return respon.Data;
}

export const downloadingBalanceCargoHistory = async () => {
    const url = REST_URL_BALANCE_CARGO_HISTORY;
    const respon = await sendGetRequest(url);
    return respon.Data;
}

