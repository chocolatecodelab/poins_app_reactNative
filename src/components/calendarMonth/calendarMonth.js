import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Body, BodyLarge } from '../labels/Labels';
import { COLOR_PRIMARY, COLOR_TRANSPARENT_DISABLED, COLOR_TRANSPARENT_PRIMARY, COLOR_WHITE } from '../../tools/constant';
import { iconTools } from '../../tools/helper';
import Button from '../button/Button';

const CalendarMonth = ({ value, onChangeDateStart, onChangeDateFinish, closeDate, activeFilter, setDateBy }) => {
    const [date, setDate] = useState(value);
    const [selectedDate, setSelectedDate] = useState(null)
    const [buttonSubmit, setButtonSubmit] = useState(true) 
;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];

    const handlerSubmit = () => {
        const month = selectedDate;
        const year = date.getFullYear();
        const newDate = new Date(year, month);
        const lastDayofMonth = new Date(year, month + 1, 0);
        activeFilter(true)
        setDateBy("Month")
        closeDate()
        onChangeDateStart(newDate);
        onChangeDateFinish(lastDayofMonth);
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
                    onPress={() => setDate(new Date(date.getFullYear() - 1, date.getMonth()))}
                >
                    <iconTools.Ionicons
                        name={'chevron-back-outline'}
                        color={COLOR_WHITE}
                        size={18}
                    />
                </TouchableOpacity>
                <BodyLarge bold style={{ color: COLOR_PRIMARY }}>{date.getFullYear()}</BodyLarge>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLOR_PRIMARY,
                        padding: 6,
                        borderRadius: 5
                    }}
                    onPress={() => setDate(new Date(date.getFullYear() + 1, date.getMonth()))}
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
                            {months.map((month, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.month,
                                        month === months[selectedDate] && styles.selected
                                    ]}
                                    onPress={() => [setButtonSubmit(false), setSelectedDate(index)]}
                                >
                                    <Text 
                                    style={[
                                        month === months[selectedDate] && styles.selectedText
                                    ]}>
                                        {month}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </>
                        :
                        <>
                            {months.map((month, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.month,
                                        month === null && styles.empty,
                                    ]}
                                    onPress={() =>  [setButtonSubmit(false), setSelectedDate(index)]}
                                >
                                    <Text style={[
                                        month === null && styles.emptyText,
                                    ]}>
                                        {month}
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
    month: {
        width: '32.2857%',
        // aspectRatio: 1,
        paddingVertical: 12,
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
        color: COLOR_WHITE,
    },
});

export default CalendarMonth;
