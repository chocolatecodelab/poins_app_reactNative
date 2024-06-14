import { REST_URL_WEATHER } from "../../../tools/constant";
import { sendGetRequest, sendGetRequestWeather } from "../../../tools/helper";

export const downloadingWeather = async () => {
    const url = REST_URL_WEATHER;
    const respon = await sendGetRequestWeather(url);
    return respon.sensors[0].data[0];
}