import { Linking } from "react-native";
import { REST_BASE_URL, REST_URL_DELIVERY_CARGO_EXPORT_TO_EXCEL, REST_URL_DELIVERY_CARGO_EXPORT_TO_PDF, REST_URL_GET_DELIVERY_CARGO } from "../../../tools/constant"
import { sendGetRequest } from "../../../tools/helper";

export const downloadingDeliveryCargo = async (params) => {
    const url = REST_URL_GET_DELIVERY_CARGO
        .replace(/\{startDate\}/, params.startDate)
        .replace(/\{endDate\}/, params.endDate);
    const respon = await sendGetRequest(url);
    console.log(url);
    return respon.Data
}

export const downloadingExport = async (params) => {
    let url = '';
    if (params.type == "excel") {
      console.log("excel");
      url = REST_URL_DELIVERY_CARGO_EXPORT_TO_EXCEL.replace(/\{startDate\}/, params.start).replace(/\{endDate\}/, params.finish).replace(/\{shift\}/, params.shift).replace(/\{jetty\}/, encodeURIComponent(params.jetty));
    } else {
      console.log("pdf");
      url = REST_URL_DELIVERY_CARGO_EXPORT_TO_PDF.replace(/\{startDate\}/, params.start).replace(/\{endDate\}/, params.finish).replace(/\{shift\}/, params.shift).replace(/\{jetty\}/, encodeURIComponent(params.jetty));
    }
    console.log(url);
    const fullUrl = `${REST_BASE_URL}${url}`;
    console.log(fullUrl);
    openLinkInBrowser(fullUrl);
  };
  
  const openLinkInBrowser = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };