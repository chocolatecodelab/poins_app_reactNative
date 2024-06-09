import moment from 'moment';
import React from 'react'
import { Text, View } from "react-native";
import { COLOR_BLACK, COLOR_GRAY_2 } from '../../../tools/constant';

// Fungsi utama untuk membuat data berdasarkan rentang tanggal
export const generateChartData = (listHistory) => {
  const dates = getDatesInRange(listHistory);
  const result = createDataObject(dates);
  return result;
};

// Fungsi untuk membuat array tanggal antara startDate dan endDate
const getDatesInRange = (listHistory) => {
  let dateBooking;
  let capacity;
  let dates = {};
  listHistory.forEach(item => {
    dateBooking = item.DATE_BOOKING_TIME;
    capacity = item.ACTUAL_LOAD;
    dates[dateBooking] = capacity;
  })
  return dates;
}

// Fungsi untuk menjumlahkan nilai dengan kunci yang sama
const aggregateDataByKey = (data) => {
  // Mengonversi objek dates menjadi array
  const datesArray = Object.entries(data);

  // Mengurutkan array secara terbalik
  datesArray.sort((b, a) => new Date(b[0]) - new Date(a[0]));

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

// Fungsi untuk membuat objek data untuk setiap tanggal
const createDataObject = (date) => {
  const aggregatedDates = aggregateDataByKey(date);
  return Object.entries(aggregatedDates).map(([key, value]) => {
    const formattedDate = moment(key).format('     DD MMMM');
    return {
      value,
      labelComponent: () => {
        return (
          <View style={{ marginLeft: 10, }}>
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
            }}>
            <Text style={{ color: 'white' }}>{value}</Text>
          </View>
        );
      },
      dataPointLabelShiftY: -40,
      dataPointLabelShiftX: 0,
      stripHeight: value,
    };
  }
  );

};

