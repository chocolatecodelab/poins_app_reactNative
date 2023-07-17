import { REST_URL_BARGING_SCHEDULE } from "../../../tools/constant";
import { sendGetRequest } from "../../../tools/helper";

export const downloadBargingSchedule = async (params) => {
    const url = REST_URL_BARGING_SCHEDULE
        .replace(/\{id\}/, params.id)
        .replace(/\{startDate\}/, params.startDate)
        .replace(/\{finishDate\}/, params.finishDate);
    const respon = await sendGetRequest(url,)
    const result = respon.Data.map(item => ({
        ...item,
        Data: item.Data.map(dataItem => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return ({
                ...dataItem,
                SHOW_DETAIL: false,
                COLOR: color
            })
        })
    }));
    return result
}


