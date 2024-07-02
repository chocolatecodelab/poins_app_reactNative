import moment from 'moment';
import React from 'react'
import { Text, View } from "react-native";
import { COLOR_GRAY_2 } from '../../tools/constant';
import { formatTotal } from '../../tools/helper';

// Fungsi utama untuk membuat data berdasarkan rentang tanggal
export const generateChartData = (data, companyName) => {
  let dates;
  dates = getDatesInRangeSecondMethod(data, companyName);
  const result = createDataObject(dates);
  return result;
};

// Fungsi untuk membuat array jam dan tanggal yang digabungkan
const getDatesInRangeSecondMethod = (data, companyName) => {
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
    if (item.CUSTOMER === companyName) {
      jam = parseInt(item.JAM.split(":")[0]);
      tanggal = (moment(item.TANGGAL).format('DD MMMM YYYY'));
      cargo = item.CARGO;
      if (!dates[jam]) {
        dates[`${tanggal} ${jam}`] = cargo;
      }
      dates[`${tanggal} ${jam}`] += cargo;
    }
  })
  console.log(dates);
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
  return `${hour.toString().padStart(2, '0')}:00`;
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
    const parts = key.split(' ');
    const tanggal = `${parts[0]} ${parts[1]}`;
    const lastValue = parts[parts.length - 1];
    const formattedHour = formatHour(lastValue);
    // const formattedday = `${}`;
    // Memisahkan kembali key menjadi tanggal dan jam
    const formattedDate = `${tanggal} ${formattedHour}`;
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

