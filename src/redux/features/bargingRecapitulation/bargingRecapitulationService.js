import { Linking } from "react-native";
import { REST_BASE_URL, REST_URL_BARGING_RECAPITULATION, REST_URL_BARGING_RECAPITULATION_EXPORT_TO_EXCEL, REST_URL_BARGING_RECAPITULATION_EXPORT_TO_PDF } from "../../../tools/constant";
import { sendGetRequest } from "../../../tools/helper";

export const downloadBargingRecapitulation = async (params) => {
  const url = REST_URL_BARGING_RECAPITULATION
    .replace(/\{id\}/, params.compUserId)
    .replace(/\{startDate\}/, params.startDate)
    .replace(/\{finishDate\}/, params.finishDate);
  const respon = await sendGetRequest(url,)
  return respon.Data
}

export const downloadingExport = async (params) => {
  let url = '';
  if (params.type == "excel") {
    console.log("excel");
    url = REST_URL_BARGING_RECAPITULATION_EXPORT_TO_EXCEL.replace(/\{startDate\}/, params.start).replace(/\{endDate\}/, params.finish).replace(/\{company_id\}/, params.companyId);
  } else {
    console.log("pdf");
    url = REST_URL_BARGING_RECAPITULATION_EXPORT_TO_PDF.replace(/\{startDate\}/, params.start).replace(/\{endDate\}/, params.finish).replace(/\{company_id\}/, params.companyId);
  }

  console.log(url);
  const fullUrl = `${REST_BASE_URL}${url}`;
  openLinkInBrowser(fullUrl);
};

const openLinkInBrowser = (url) => {
  Linking.openURL(url).catch((err) => console.error('An error occurred', err));
};


