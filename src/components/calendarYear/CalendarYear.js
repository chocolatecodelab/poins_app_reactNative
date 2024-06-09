import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Body, BodyLarge } from '../labels/Labels';
import { COLOR_PRIMARY, COLOR_TRANSPARENT_DISABLED, COLOR_TRANSPARENT_PRIMARY, COLOR_WHITE } from '../../tools/constant';
import { iconTools } from '../../tools/helper';
import Button from '../button/Button';

const CalendarYear = ({ value, onChangeDateStart, onChangeDateFinish, closeDate, activeFilter, setDateBy }) => {
    const [date, setDate] = useState(value);
    const [selectedDate, setSelectedDate] = useState(null)
    const [buttonSubmit, setButtonSubmit] = useState(true)
        ;  
    const years = [];
    const currentYear = date.getFullYear();
    const lastYear = currentYear + 11;
    
    for (let i = currentYear; i <= lastYear; i++) {
        years.push(i);
    }
       
    const handlerSubmit = () => {
        const firstMonth = new Date(selectedDate.getFullYear(), 0);
        const lastMonth = new Date(selectedDate.getFullYear(), 11, 31)
        console.log(lastMonth);
        console.log(firstMonth);
        activeFilter(true)
        setDateBy("Year")
        closeDate()
        onChangeDateStart(firstMonth)
        onChangeDateFinish(lastMonth)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLOR_PRIMARY,
                        padding: 6,
                        borderRadius: 5
                    }}
                    onPress={() => setDate(new Date(date.getFullYear() - 11, date.getMonth()))} // Mengurangi tahun sebanyak 12
                >
                    <iconTools.Ionicons
                        name={'chevron-back-outline'}
                        color={COLOR_WHITE}
                        size={18}
                    />
                </TouchableOpacity>
                <BodyLarge bold style={{ color: COLOR_PRIMARY }}>{`${date.getFullYear()}-${date.getFullYear() + 11}`}</BodyLarge>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLOR_PRIMARY,
                        padding: 6,
                        borderRadius: 5
                    }}
                    onPress={() => setDate(new Date(date.getFullYear() + 11, date.getMonth()))} // Menambah tahun sebanyak 12
                >
                    <iconTools.Ionicons
                        name={'chevron-forward-outline'}
                        color={COLOR_WHITE}
                        size={18}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                {
                    selectedDate !== null ?
                        <>
                            {years.map((year, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.year,
                                        year === selectedDate.getFullYear() && styles.selected,
                                    ]}
                                    onPress={() => [setButtonSubmit(false), setSelectedDate(new Date(year, 0))]}
                                >
                                    <Text style={[
                                        year === selectedDate.getFullYear() && styles.selectedText,
                                    ]}>
                                        {year}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </>
                        :
                        <>
                            {years.map((year, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.year,
                                        year === null && styles.empty,
                                    ]}
                                    onPress={() => [setButtonSubmit(false), setSelectedDate(new Date(year, 0))]}
                                >
                                    <Text style={[
                                        year === null && styles.emptyText,
                                    ]}>
                                        {year}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </>
                }

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button
                    caption={'Cancel'}
                    textStyle={{ color: COLOR_PRIMARY }}
                    containerStyle={{ marginTop: 20, backgroundColor: COLOR_WHITE, alignItems: 'flex-end' }}
                    onPress={closeDate}
                />
                <Button
                    caption={'Ok'}
                    textStyle={{ color: buttonSubmit == false ? COLOR_PRIMARY : COLOR_TRANSPARENT_PRIMARY }}
                    containerStyle={{ paddingHorizontal: 0, marginTop: 20, backgroundColor: COLOR_WHITE, alignItems: 'flex-end' }}
                    onPress={handlerSubmit}
                    disabled={buttonSubmit}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10
    },
    body: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    year: {
        width: '24.2857%',
        // aspectRatio: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    empty: {
        opacity: 0,
    },
    selected: {
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 30
    },
    emptyText: {
        opacity: 0,
    },
    selectedText: {
        color: '#fff',
    },
});

export default CalendarYear;
