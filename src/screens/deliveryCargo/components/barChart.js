import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { COLOR_BLACK, COLOR_GRAY_2, COLOR_WHITE } from '../../../tools/constant';
import moment from 'moment';
import { formatTotal, stringMonth } from '../../../tools/helper';

export const generateBarData = (listDeliveryCargo, type) => {
    let dates;
    if(type == "period") {
     dates = grouped(listDeliveryCargo);
    }else {
     dates = groupedByJetty(listDeliveryCargo);
    }
    const result = createDataObject(dates);
    return result;
}

function getMonth(dateString) {
    const bookingDate = new Date(dateString);
    const month = bookingDate.getMonth();
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'][month];
    return monthName;
}

// Mengelompokkan dan menjumlahkan data berdasarkan bulan
const grouped = (listDeliveryCargo) => {
    const groupedData = listDeliveryCargo.reduce((acc, item) => {
        const month = getMonth(item.TANGGAL_WB3);
        if (!acc[month]) {
            acc[month] = { gross: 0, net: 0, tare: 0 };
        }
        acc[month].gross += item.GROSS_WB3;
        acc[month].net += item.NETTO_WB3;
        acc[month].tare += item.TARE_WB3;
        return acc;
    }, {});
    return groupedData;
}

const groupedByJetty = (listDeliveryCargo) => {
    const groupedData = listDeliveryCargo.reduce((acc, item) => {
        const jetty = item.JETTY.replace('JETTY ', '');
        if (!acc[jetty]) {
            acc[jetty] = { gross: 0, net: 0, tare: 0 };
        }
        acc[jetty].gross += item.GROSS_WB3;
        acc[jetty].net += item.NETTO_WB3;
        acc[jetty].tare += item.TARE_WB3;
        return acc;
    }, {});
    return groupedData;
}


const createDataObject = (groupedData) => {

    const colors = ["blue", 'green', 'red'];
    const types = ['gross', 'net', 'tare'];
    const barData = [];

    // Membentuk barData sesuai format yang diinginkan
    Object.entries(groupedData)
    .sort((a, b) => stringMonth.indexOf(a[0]) - stringMonth.indexOf(b[0]))
    .forEach(([month, data]) => {
        types.forEach((type, typeIndex) => {
            const isLastItem = typeIndex === types.length - 1;
            const spacing = isLastItem ? 20 : 2; // Tambahkan spasi atau margin yang lebih besar setelah tare
            barData.push({
                value: data[type],
                topLabelComponent: () => (
                    <Text style={{ color: COLOR_GRAY_2, fontWeight: "bold", fontSize: 8, marginBottom: 6 }}>
                        {formatTotal(data[type])}
                    </Text>
                ),
                label: typeIndex === 1 ? month : '', // Label hanya untuk item pertama dari setiap bulan
                spacing: spacing,
                labelWidth: 30,
                labelTextStyle: { color: 'gray' },
                frontColor: colors[typeIndex],
            });
        });
    });
    return barData;
}

