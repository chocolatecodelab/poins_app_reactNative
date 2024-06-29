import moment from 'moment';
import React from 'react'
import { Text, View } from "react-native";
import { COLOR_GRAY_2 } from '../../tools/constant';
import { formatTotal } from '../../tools/helper';

// Fungsi utama untuk membuat data berdasarkan rentang tanggal
export const generateChartData = (data, companyUserId) => {
  let dates;
  dates = getDatesInRangeSecondMethod(data, companyUserId);
  const result = createDataObject(dates);
  return result;
};

// Fungsi untuk membuat array jam dan tanggal yang digabungkan
const getDatesInRangeSecondMethod = (data, companyUserId) => {
  const mergeAndSortData = (data) => {
    // Menggabungkan semua data menjadi satu array
    const combinedData = data.reduce((acc, item) => {
      return acc.concat(item);
    }, []);

    // Mengurutkan data berdasarkan Tanggal
    const sortedData = combinedData.sort((a, b) => new Date(a.TANGGAL) - new Date(b.TANGGAL));
    return sortedData;
  }
  const mergedData = mergeAndSortData(data);
  let jam;
  let tanggal;
  let cargo;
  let dates = {};
  mergedData.forEach(item => {
    if (item.ID_COMPANY === companyUserId) {
      jam = formatHour(item.JAM);
      tanggal = (moment(item.TANGGAL).format('DD MMMM YYYY'));
      cargo = item.CARGO;
      dates[`${tanggal} ${jam}`] = cargo;
    }
  })
  return dates;
}


// Fungsi untuk menjumlahkan nilai dengan kunci yang sama
const aggregateDataByKey = (data) => {
  // Mengonversi objek dates menjadi array
  const datesArray = Object.entries(data);

  // Mengurutkan array secara terbalik
  datesArray.sort((a, b) => new Date(a[0]) - new Date(b[0]));

  // Mengonversi kembali array yang sudah diurutkan menjadi objek
  const sortedDates = Object.fromEntries(datesArray);
  const aggregatedData = {};

  Object.entries(sortedDates).forEach(([key, value]) => {
    if (aggregatedData[key]) {
      aggregatedData[key] += value;
    } else {
      aggregatedData[key] = value;
    }
  });

  return aggregatedData;
};

const formatHour = (hour) => {
  if (hour == null) {
    return;
  } else {
    const parts = hour.split(' ');
    return parts[0]; // This will return the time without "AM" or "PM"
  }
};

// Fungsi untuk membuat objek data untuk setiap tanggal
const createDataObject = (date) => {
  const aggregatedDates = aggregateDataByKey(date);
  const keys = Object.keys(date);
  // Ambil kunci terakhir
  const lastKey = keys[keys.length - 1];
  // Ambil kunci pertama
  const firstKey = keys[0];
  return Object.entries(aggregatedDates).map(([key, value], index) => {

    // Memisahkan kembali key menjadi tanggal dan jam
    const formattedDate = key;
    return {
      value,
      labelComponent: () => {
        return (
          <View style={{ marginLeft: key == lastKey ? 30 : 50 }}>
            <Text style={{ color: COLOR_GRAY_2, fontSize: 12 }}>{formattedDate}</Text>
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
              marginLeft: 10
            }}>
            <Text style={{ color: 'white', fontSize: 15 }}>{formatTotal(value)}</Text>
          </View>
        );
      },
      dataPointLabelShiftY: -40,
      dataPointLabelShiftX: key == lastKey ? -40 : 0,
      stripHeight: value,
    };
  }
  );

};

