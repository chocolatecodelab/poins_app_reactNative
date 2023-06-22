import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, } from 'react-native'
import { COLOR_BLACK, COLOR_DISABLED, COLOR_ERROR, COLOR_HORIZONTAL_LINE, COLOR_PRIMARY, COLOR_WHITE, } from '../../tools/constant';
import { ios, } from '../../tools/helper';
import { Button, BaseScreen, Body, H4, MyModal, ProgressBar, BodyLarge, BodySmall, BodyExtraSmall, MyModalError, MyModalSuccess } from '../../components';

const BarginOnllineStepTwo = ({
    isUploadingSuccess, isUploading, isError, message, onSubmitPressed, props, userId, onCloseModalError,
    onCloseModalSuccess, onAppear, listDate, listTime, onSelectedDatePressed, isLoadingTimeBooking,
}) => {
    const [selectedDay, setSelectedDay] = useState(null)
    const [selectTime, setSelectTime] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [isBooked, setIsBooked] = useState(false)
    const [isOrder, setIsOrder] = useState(false)
    const [indexDate, setIndexDate] = useState(null)

    const handlerNextDay = () => {
        let maxTime = 24
        let totalTime = parseInt(selectTime) + parseInt(props.duration)
        if (totalTime > maxTime) {
            let value = totalTime - maxTime
            return `00:00 - ${value < 10 ? `0${value}` : value}:00`
        }
        return '-'
    }
    const handlerRangeTime = () => {
        let maxTime = 24
        let totalTime = parseInt(selectTime) + parseInt(props.duration)
        if (totalTime > maxTime) {
            return maxTime
        } else {
            return totalTime
        }
    }

    const handlePickerTime = (item) => {
        if (item.BookingUserId === null) {
            setSelectTime(item.time)
            setIsOrder(true)
        } else {
            setIsBooked(true)
            setErrorMessage('Already Booked')
        }
    }
    useEffect(() => {
        onAppear(userId)
    }, [])

    useEffect(() => {
        if (isUploadingSuccess === true) {
            setIsOrder(false)
        }
    }, [isUploadingSuccess])

    return (
        <BaseScreen
            containerStyle={{ paddingTop: ios ? 50 : 20, paddingBottom: 0 }}
            barBackgroundColor={COLOR_WHITE}
        >
            <View style={{ paddingHorizontal: 20 }}>
                <ProgressBar stepTwoActive />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 25, marginBottom: 10 }}>
                    <View style={styles.titleContainer}>
                        <H4 bold style={styles.titleText}>Book A Slot</H4>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.cardColumn}>
                            {listDate?.map((item, index) => {
                                if (index < 14) {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            disabled={false}
                                            onPress={() => {
                                                setSelectedDay(item)
                                                setIndexDate(index)
                                                onSelectedDatePressed(item)
                                                // setErrorMessage('All Booked')
                                            }}
                                            style={styles.dateButton(item.day, selectedDay?.day, item.isBooked)}
                                        >
                                            <BodySmall style={styles.day(item.day, selectedDay, item.isBooked)}>{item.day}</BodySmall>
                                            <BodySmall style={styles.day(item.day, selectedDay, item.isBooked)}>{item.labelMonth}</BodySmall>
                                        </TouchableOpacity>
                                    )
                                }
                                if (index === 14) {
                                    return (
                                        <View key={index} style={styles.hideButton} />
                                    )
                                }
                            })}
                        </View>
                    </View>
                </View>
                <View style={[styles.titleContainer, { marginBottom: 1, marginHorizontal: 25, marginTop: 15 }]}>
                    <H4 bold style={styles.titleText}>Time Scheduling</H4>
                </View>
                {selectedDay && Object.keys(listTime).length ?
                    <ScrollView style={{ marginBottom: '18%' }} contentContainerStyle={{ marginHorizontal: 20 }}>
                        <View style={{ justifyContent: 'center', marginHorizontal: 8 }}>
                            <Body style={[styles.subTitle, { alignSelf: 'center', marginTop: 15 }]}>
                                {listDate[indexDate].day} {listDate[indexDate].labelMonth} {listDate[indexDate].year}
                            </Body>
                            {isLoadingTimeBooking &&
                                <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
                                </View>
                            }
                            {!isLoadingTimeBooking &&
                                <View style={styles.cardColumn}>
                                    {listTime?.Today?.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                disabled={false}
                                                onPress={() => handlePickerTime(item)}
                                                style={styles.hoursButton(item.BookingUserId, userId, item.isBooked)}
                                            >
                                                <BodySmall style={styles.hour(item.isBooked)}>{item.time < 10 ? `0${item.time}:00` : `${item.time}:00`}</BodySmall>
                                                {item.BookingUserId === userId && item.isBooked &&
                                                    <BodyExtraSmall style={styles.hour(item.isBooked)}>My Order</BodyExtraSmall>
                                                }
                                                {item.BookingUserId !== userId && item.isBooked &&
                                                    <BodyExtraSmall style={styles.hour(item.isBooked)}>Booked</BodyExtraSmall>
                                                }
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            }
                            <Body style={[styles.subTitle, { alignSelf: 'center', marginTop: 15 }]}>
                                {listDate[indexDate + 1].day} {listDate[indexDate + 1].labelMonth} {listDate[indexDate].year}
                            </Body>
                            {isLoadingTimeBooking &&
                                <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
                                </View>
                            }
                            {!isLoadingTimeBooking &&
                                <View style={styles.cardColumn}>
                                    {listTime?.NextDay.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                disabled
                                                style={styles.hoursButtonDisabled(item.isBooked)}>
                                                <BodySmall style={styles.hourDisabled(item.isBooked)}>{item.time < 10 ? `0${item.time}:00` : `${item.time}:00`}</BodySmall>
                                                {item.isBooked &&
                                                    <BodyExtraSmall style={styles.hourDisabled(item.isBooked)}>Booked</BodyExtraSmall>
                                                }
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            }
                        </View>
                    </ScrollView> :
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginBottom: 40 }}>
                        <Image source={require('../../assets/images/not-found.png')} style={{ height: 200, width: 300 }} />
                        <BodyLarge style={{ color: '#CCCCCC' }}>Select your date</BodyLarge>
                    </View>
                }
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    caption='Previous'
                    containerStyle={styles.close}
                    textStyle={{ color: COLOR_PRIMARY }}
                    onPress={onCloseModalError}
                />
            </View>
            <MyModal isVisible={isOrder} closeModal={() => setIsOrder(false)} contentStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <View style={{ width: '100%' }}>
                    <H4 bold style={{ color: COLOR_PRIMARY, alignSelf: 'center', marginBottom: 10 }}>Are you sure to order?</H4>
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.orderText}>
                            <Body bold>Jetty</Body>
                            <BodySmall>{props.jetty}</BodySmall>
                        </View>
                        <View style={styles.orderText}>
                            <Body bold>Company</Body>
                            <BodySmall style={{ textAlign: 'right' }}>{props.selectCompany}</BodySmall>
                        </View>
                        <View style={styles.orderText}>
                            <Body bold>Tug Boat</Body>
                            <BodySmall>{props.selectTugBoat}</BodySmall>
                        </View>
                        <View style={styles.orderText}>
                            <Body bold>Barge</Body>
                            <BodySmall>{props.selectBarge}</BodySmall>
                        </View>
                        <View style={styles.orderText}>
                            <Body bold>Capacity</Body>
                            <BodySmall>{props.selectCapacity} ({props.duration})</BodySmall>
                        </View>
                        <View style={styles.orderText}>
                            <Body bold>Date</Body>
                            <BodySmall>{selectedDay?.day} {selectedDay?.labelMonth} {selectedDay?.year}</BodySmall>
                        </View>
                        <View style={styles.orderText}>
                            <Body bold>Start Time</Body>
                            <BodySmall>{selectTime < 10 ? `0${selectTime}:00` : `${selectTime}:00`}</BodySmall>
                        </View>
                        <View style={{ justifyContent: 'center', marginTop: 10 }}>
                            <Body bold>Vessel/Tujuan</Body>
                            <View style={{ minHeight: 50, backgroundColor: COLOR_HORIZONTAL_LINE, padding: 10, width: '100%', borderRadius: 5 }}>
                                <Body>{props.vessel}</Body>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <Body bold>Estimated Time</Body>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 }}>
                                <View style={{ backgroundColor: COLOR_HORIZONTAL_LINE, padding: 10, alignItems: 'center', width: 130, borderRadius: 5 }}>
                                    <Body>{selectedDay?.day} {selectedDay?.labelMonth} {selectedDay?.year}</Body>
                                    <BodySmall>{selectTime < 10 ? `0${selectTime}:00` : `${selectTime}:00`} - {handlerRangeTime()}:00</BodySmall>
                                </View>
                                <View style={{ backgroundColor: COLOR_HORIZONTAL_LINE, padding: 10, alignItems: 'center', width: 130 }}>
                                    <Body>Next Day</Body>
                                    <BodySmall>{handlerNextDay()}</BodySmall>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <Button
                            caption='Cancel'
                            loading={isUploading}
                            containerStyle={{ backgroundColor: COLOR_ERROR }}
                            onPress={() => setIsOrder(false)}
                        />
                        <Button
                            caption='Submit'
                            loading={isUploading}
                            containerStyle={styles.next}
                            onPress={() => { onSubmitPressed(props, selectTime, selectedDay, userId, setIsOrder) }}
                        />
                    </View>
                </View>
            </MyModal>
            <MyModal isVisible={isBooked} closeModal={() => setIsBooked(false)}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/images/alarm.png')} style={{ height: 100, width: 100, marginVertical: 20 }} />
                    <Text style={{ fontSize: 20, fontWeight: '500', color: COLOR_PRIMARY, marginBottom: 10 }}>{errorMessage}</Text>
                </View>
            </MyModal>
            <MyModalError
                isVisible={isError}
                closeModal={onCloseModalError}
                message={message}
                transparent={0.7}
            />
            <MyModalSuccess
                isVisible={isUploadingSuccess}
                closeModal={onCloseModalSuccess}
                message={'Upload Success'}
                transparent={0.7}
            />
        </BaseScreen>
    )
}

export default BarginOnllineStepTwo

const styles = StyleSheet.create({
    cardColumn: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
    },
    card: {
        width: '18%',
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
        padding: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    titleText: {
        color: COLOR_PRIMARY
    },
    subTitle: {
        opacity: .6,
        color: COLOR_PRIMARY,
    },
    dateButton: (day, selectedDay, myBooked) => ({
        backgroundColor: day === selectedDay ? COLOR_PRIMARY : myBooked === true ? '#357C3C' : COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        width: '18%',
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        shadowColor: COLOR_BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
        padding: 10,
    }),
    hideButton: {
        backgroundColor: COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        width: '18%',
        height: 50,
        marginBottom: 10,
        padding: 10,
    },
    hoursButton: (bookingUserId, currentUser, isBooked) => ({
        backgroundColor: bookingUserId === currentUser ? '#357C3C' : bookingUserId !== currentUser && isBooked ? COLOR_ERROR : COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        width: '23%',
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        shadowColor: COLOR_BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
        padding: 10,
    }),
    hoursButtonDisabled: (status) => ({
        backgroundColor: COLOR_HORIZONTAL_LINE,
        alignItems: 'center',
        justifyContent: 'center',
        width: '23%',
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        shadowColor: COLOR_BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
        padding: 10,
    }),
    day: (day, selectedDay, myBooked) => ({
        fontWeight: '500',
        color: day === selectedDay?.day ? COLOR_WHITE : myBooked ? COLOR_WHITE : COLOR_BLACK
    }),
    hour: (isBooked) => ({
        fontWeight: '500',
        color: isBooked ? COLOR_WHITE : COLOR_BLACK
    }),
    hourDisabled: (isBooked,) => ({
        fontWeight: '500',
        color: isBooked ? COLOR_ERROR : COLOR_BLACK
    }),
    filterButton: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderRadius: 5,
        flexDirection: 'row',
    },
    orderButton: {
        backgroundColor: COLOR_PRIMARY,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        elevation: 5
    },
    timeContainer: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR_PRIMARY,
    },
    timeButton: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 15
    },
    timeText: {
        color: COLOR_PRIMARY,
        letterSpacing: 1
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 15,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 25
    },
    close: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: COLOR_WHITE,
        borderColor: COLOR_PRIMARY,
        borderWidth: 1,
        marginRight: 10
    },
    next: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: COLOR_PRIMARY,
        marginLeft: 10,
    },
    orderText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: COLOR_DISABLED
    }
})