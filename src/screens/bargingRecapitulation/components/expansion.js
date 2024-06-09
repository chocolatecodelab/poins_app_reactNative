import React from 'react'
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { COLOR_BLACK, COLOR_PRIMARY } from '../../../tools/constant';

// untuk data Expansion
export const filterByDateAndFilter = (data, dateBy, filterBy, startDate, finishDate) => {

  const jettyData = {
    "J": 0, "K": 0, "U": 0, "R": 0,
  };

  const periodDataMonthly = {
    "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0,
    "Jul": 0, "Aug": 0, "Sep": 0, "Okt": 0, "Nov": 0, "Des": 0,
  }

  const colors = ['#003285', '#2A629A', '#FF7F3E', '#FFDA78']; 

  // Fungsi untuk menghasilkan warna hex acak
// const getRandomColor = () => {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

  // Filter data berdasarkan tahun
  const year = finishDate.getFullYear();
  const filteredDataByYear = data.filter(item => {
    const bookingDate = new Date(item.DATE_BOOKING_TIME);
    return bookingDate.getFullYear() === year;
  });

  // Kelompokkan data berdasarkan bulan dalam satu tahun
  filteredDataByYear.forEach(item => {
    const bookingDate = new Date(item.DATE_BOOKING_TIME);
    const month = bookingDate.getMonth();
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'][month];
    periodDataMonthly[monthName] += item.ACTUAL_LOAD; // Tambahkan kapasitas item ke total bulan yang sesuai
    const jetty = item.JETTY;
    jettyData[jetty] += item.ACTUAL_LOAD;
  });

  let barData = [];
  if (filterBy == "Period" && dateBy == "Year") {
    const periodDataMonthlyKeys = Object.keys(periodDataMonthly);
    barData = periodDataMonthlyKeys.map(month => ({
      value: periodDataMonthly[month],
      label: month,
      topLabelComponent: () => (
        <Text style={styles.textBarTopComponent}>{periodDataMonthly[month]}</Text>
      ),
      frontColor:  COLOR_PRIMARY
    }));
  } else if (filterBy == "Jetty" && dateBy == "Year") {
    const jettyKeys = Object.keys(jettyData);
    barData = jettyKeys.map((jettyKey, index) => ({
      value: jettyData[jettyKey],
      label: jettyKey,
      topLabelComponent: () => (
        <Text style={styles.textBarTopComponent}>{jettyData[jettyKey]}</Text>
      ),
      frontColor: colors[index % colors.length], 

    }));
  }
  return barData;
};

const styles = StyleSheet.create({
  textBarTopComponent: {
    fontWeight: "bold",
    color: COLOR_BLACK,
    fontSize: 10,
    marginBottom: 6
  },
})