import React from 'react'
import { Text, View } from "react-native";
import { COLOR_GRAY_2 } from '../../../tools/constant';
import moment from 'moment';
import { formatTotal } from '../../../tools/helper';

// Fungsi utama untuk membuat data berdasarkan rentang tanggal
export const generateChartData = (listDeliveryCargo, type, interval, date) => {
  let dates;
  if (interval == "hour") {
    dates = getDatesInRange(listDeliveryCargo, date);
  } else if (interval == "period") {
    dates = getDatesInRangePeriod(listDeliveryCargo);
  }
  let result;
  if (type == "GROSS") {
    result = createDataObject(dates, "GROSS", interval);
  } else if (type == "TARE") {
    result = createDataObject(dates, "TARE", interval);
  } else {
    result = createDataObject(dates, "NETTO", interval);
  }
  return result;
};

// Fungsi untuk membuat array tanggal antara startDate dan endDate
const getDatesInRange = (listDeliveryCargo, date) => {
  if (!Array.isArray(listDeliveryCargo)) {
    throw new TypeError('listDeliveryCargo harus berupa array');
  }

  let dates = {};
  const filteredList = listDeliveryCargo.filter(item => {
    const itemDate = new Date(item.TANGGAL_WB3);
    return itemDate.toDateString() === date.toDateString();
  });
  const sortList = [...filteredList].sort((a, b) => {
    const timeA = a.JAM_WB3.split(':').map(Number);
    const timeB = b.JAM_WB3.split(':').map(Number);
    const dateA = new Date(0, 0, 0, timeA[0], timeA[1], timeA[2]);
    const dateB = new Date(0, 0, 0, timeB[0], timeB[1], timeB[2]);
    return dateA - dateB;
  });
  sortList.forEach(item => {
    const hour = parseInt(item.JAM_WB3.split(':')[0]); // Mendapatkan jam
    if (!dates[hour]) {
      dates[hour] = {
        GROSS_WB3: 0,
        TARE_WB3: 0,
        NETTO_WB3: 0
      };
    }
    dates[hour].GROSS_WB3 += item.GROSS_WB3;
    dates[hour].TARE_WB3 += item.TARE_WB3;
    dates[hour].NETTO_WB3 += item.NETTO_WB3;
  });
  return dates;
}

const getDatesInRangePeriod = (listDeliveryCargo) => {
  if (!Array.isArray(listDeliveryCargo)) {
    throw new TypeError('listDeliveryCargo harus berupa array');
  }

  let dates = {};
  const sortList = [...listDeliveryCargo].sort((a, b) => {
    const dateA = new Date(a.TANGGAL_WB3);
    const dateB = new Date(b.TANGGAL_WB3);
    return dateA - dateB;
  });

  sortList.forEach(item => {
    const date = item.TANGGAL_WB3; // Mendapatkan tanggal
    if (!dates[date]) {
      dates[date] = {
        GROSS_WB3: 0,
        TARE_WB3: 0,
        NETTO_WB3: 0
      };
    }
    dates[date].GROSS_WB3 += item.GROSS_WB3;
    dates[date].TARE_WB3 += item.TARE_WB3;
    dates[date].NETTO_WB3 += item.NETTO_WB3;
  });

  return dates;
}


// // Fungsi untuk membuat objek data untuk setiap tanggal
const createDataObject = (date, type, interval) => {
  const keys = Object.keys(date);
  // Ambil kunci terakhir
  const lastKey = keys[keys.length - 1];
  return Object.entries(date).map(([key, value]) => {
    if (type == "GROSS") {
      value = value.GROSS_WB3;
    } else if (type == "TARE") {
      value = value.TARE_WB3
    } else {
      value = value.NETTO_WB3
    }
    return {
      value,
      labelComponent: () => {
        return (
          <View style={{ marginLeft: interval == "hour" ? 40 : key == lastKey ? 20 : 40 }}>
            <Text style={{ color: COLOR_GRAY_2, fontSize: 12 }}>{interval == "hour" ? key : moment(key).format('DD-MMMM')}</Text>
          </View>
        );
      },
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 4,
            }}>
            <Text style={{ color: 'white', fontSize: 10 }}>{formatTotal(value)}</Text>
          </View>
        );
      },
      dataPointLabelShiftY: -40,
      dataPointLabelShiftX: key == "0" ? 10 : key == "23" ? -20 : key == lastKey ? -20 : 0,
      stripHeight: value,
    };
  }
  );

};

