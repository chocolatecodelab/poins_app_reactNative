import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { BaseScreen, DatePicker, DividerLine, Legend, MyHeader, MyModal } from '../../components';
import { COLOR_BLACK, COLOR_GRAY_1, COLOR_GRAY_2, COLOR_HORIZONTAL_LINE, COLOR_MAIN_SECONDARY, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE } from '../../tools/constant';
import { formatTotal, getScreenDimension, iPad, ios } from '../../tools/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { LineChart } from 'react-native-gifted-charts';
import { generateChartData } from './dataChart';

const BalanceCargo = ({
    listBalanceCargo, onAppear, isLoading, companyUserId, listBalanceCargoHistory, company
}) => {
    const today = new Date()
    const [refreshing, setRefreshing] = useState(false);
    const [startDate, setStartDate] = useState(new Date())
    const [modalStartDate, setModalStartDate] = useState(false)

    let generateChartBalanceCargo, generateChartBRE, generateChartEBL, generateChartTAJ, generateChartHMS, maxValueCargo;
    if (companyUserId !== 5) {
        company.forEach(item => {
            if (item.id == companyUserId) {
                generateChartBalanceCargo = generateChartData(listBalanceCargoHistory, item.name);
            }
        })
    } else {
        if (listBalanceCargoHistory !== undefined) {
            company.forEach(item => {
                if (item.id == 1) {
                    console.log(item.name);
                    generateChartBRE = generateChartData(listBalanceCargoHistory, item.name);
                }else if(item.id == 2) {
                    console.log(item.name);
                    generateChartEBL = generateChartData(listBalanceCargoHistory, item.name);
                }else if(item.id == 3) {
                    console.log(item.name);
                    generateChartTAJ = generateChartData(listBalanceCargoHistory, item.name);
                }else if(item.id == 4) {
                    console.log(item.name);
                    generateChartHMS = generateChartData(listBalanceCargoHistory, item.name);
                }
            })
        }
    }

    const getMaxValue = (data) => {
        return Math.max(...data.map(item => item.value));
    };
    // Hitung nilai maksimum dari data dan kalikan dengan 2 untuk mendapatkan maxValue
    if (companyUserId !== 5) {
         maxValueCargo = getMaxValue(generateChartBalanceCargo) * 1.5;
    } else {
         maxValueCargo = getMaxValue(generateChartBRE) * 1.5;

    }
    
        

    useEffect(() => {
        onAppear(startDate);
    }, [startDate])

    useEffect(() => {
        if (refreshing) {
            onAppear(startDate);
        }
    }, [refreshing == true]);

    return (
        <BaseScreen
            barBackgroundColor={COLOR_PRIMARY}
            statusBarColor={COLOR_WHITE}
            translucent containerStyle={{ paddingTop: iPad ? 10 : ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
        >
            <MyHeader
                pageTitle='Balance Cargo' backButton
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            setTimeout(() => setRefreshing(false), 1000); // Atur status refreshing kembali ke false setelah 1 detik
                        }}
                    />
                }
            >
                {!isLoading ?
                    <View style={styles.container}>
                        <View style={{ width: "90%", marginTop: 50, marginBottom: -20, alignSelf: "center" }}>
                            <Text style={{ bottom: 34, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Update Realtime Cargo</Text>
                        </View>
                        <Text style={{ color: COLOR_BLACK, textAlign: "center" }}>{moment(today).format('DD MMMM YYYY - hh:mm:ss')}</Text>
                        <View style={[styles.containerItem, { display: companyUserId === 1 ? "flex" : companyUserId === 5 ? "flex" : "none" }]}>
                            <View style={styles.cardContainer}>
                                <View style={styles.row}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'left' }}>Customer</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIcons name={"identifier"} size={18} color={COLOR_PRIMARY} />
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>PT. BRE</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'right' }}>Tanggal</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>{moment(listBalanceCargo[0].TANGGAL).format('DD MMMM YYYY')} </Text>
                                            <MaterialCommunityIcons name={"calendar-clock"} size={18} color={COLOR_PRIMARY} />
                                        </View>
                                    </View>
                                </View>
                                <DividerLine width={"95%"} />
                                <View style={styles.row}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'left' }}>Jam</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIcons name={"clock-time-five"} size={18} color={COLOR_PRIMARY} />
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>{listBalanceCargo[0].JAM}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'right' }}>Cargo</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ marginRight: 5, fontSize: 14 }}>{formatTotal(listBalanceCargo[0].CARGO)}</Text>
                                            <MaterialCommunityIcons name={"truck-cargo-container"} size={18} color={COLOR_PRIMARY} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.containerItem, { display: companyUserId === 2 ? "flex" : companyUserId === 5 ? "flex" : "none" }]}>
                            <View style={styles.cardContainer}>
                                <View style={styles.row}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'left' }}>Customer</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIcons name={"identifier"} size={18} color={COLOR_PRIMARY} />
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>PT. EBL</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'right' }}>Tanggal</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>{moment(listBalanceCargo[1].TANGGAL).format('DD MMMM YYYY')} </Text>
                                            <MaterialCommunityIcons name={"calendar-clock"} size={18} color={COLOR_PRIMARY} />
                                        </View>
                                    </View>
                                </View>
                                <DividerLine width={"95%"} />
                                <View style={styles.row}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'left' }}>Jam</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIcons name={"clock-time-five"} size={18} color={COLOR_PRIMARY} />
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>{listBalanceCargo[1].JAM}</Text>
                                        </View>

                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'right' }}>Cargo</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ marginRight: 5, fontSize: 14 }}>{listBalanceCargo[1].CARGO}</Text>
                                            <MaterialCommunityIcons name={"truck-cargo-container"} size={18} color={COLOR_PRIMARY} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.containerItem, { display: companyUserId === 3 ? "flex" : companyUserId === 5 ? "flex" : "none" }]}>
                            <View style={styles.cardContainer}>
                                <View style={styles.row}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'left' }}>Customer</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIcons name={"identifier"} size={18} color={COLOR_PRIMARY} />
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>PT. TAJ</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'right' }}>Tanggal</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>{moment(listBalanceCargo[2].TANGGAL).format('DD MMMM YYYY')} </Text>
                                            <MaterialCommunityIcons name={"calendar-clock"} size={18} color={COLOR_PRIMARY} />
                                        </View>
                                    </View>
                                </View>
                                <DividerLine width={"95%"} />
                                <View style={styles.row}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'left' }}>Jam</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIcons name={"clock-time-five"} size={18} color={COLOR_PRIMARY} />
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>{listBalanceCargo[2].JAM}</Text>
                                        </View>

                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'right' }}>Cargo</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ marginRight: 5, fontSize: 14 }}>{listBalanceCargo[2].CARGO}</Text>
                                            <MaterialCommunityIcons name={"truck-cargo-container"} size={18} color={COLOR_PRIMARY} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.containerItem, { display: companyUserId === 4 ? "flex" : companyUserId === 5 ? "flex" : "none" }]}>
                            <View style={styles.cardContainer}>
                                <View style={styles.row}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'left' }}>Customer</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIcons name={"identifier"} size={18} color={COLOR_PRIMARY} />
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>CV. HMS</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'right' }}>Tanggal</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>{moment(listBalanceCargo[3].TANGGAL).format('DD MMMM YYYY')} </Text>
                                            <MaterialCommunityIcons name={"calendar-clock"} size={18} color={COLOR_PRIMARY} />
                                        </View>
                                    </View>
                                </View>
                                <DividerLine width={"95%"} />
                                <View style={styles.row}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'left' }}>Jam</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIcons name={"clock-time-five"} size={18} color={COLOR_PRIMARY} />
                                            <Text style={{ marginLeft: 5, fontSize: 14 }}>{listBalanceCargo[3].JAM}</Text>
                                        </View>

                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, color: COLOR_GRAY_2, textAlign: 'right' }}>Cargo</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ marginRight: 5, fontSize: 14 }}>{listBalanceCargo[3].CARGO}</Text>
                                            <MaterialCommunityIcons name={"truck-cargo-container"} size={18} color={COLOR_PRIMARY} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: "90%", marginTop: 70, marginBottom: -20, alignSelf: "center" }}>
                            <Text style={{ bottom: 34, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Update Total Cargo</Text>
                        </View>
                        <Text style={{ marginTop: 5, textAlign: "center", fontSize: 16, fontWeight: "bold", }}> Select 'Start date' first</Text>
                        <View style={{ marginTop: 15, flexDirection: "row", justifyContent: "space-evenly", borderBottomColor: COLOR_TRANSPARENT_DARK, borderBottomWidth: 1, paddingBottom: 10, }}>
                            <View style={{ width: "90%", }}>
                                <Text style={{ color: COLOR_GRAY_2, fontSize: 16, marginBottom: -20, marginLeft: 20, zIndex: 1, backgroundColor: COLOR_WHITE, width: "35%", textAlign: "center" }}>Start date</Text>
                                <TouchableOpacity style={{
                                    backgroundColor: COLOR_WHITE,
                                    borderColor: COLOR_TRANSPARENT_DARK,
                                    marginVertical: 10,
                                }}
                                    onPress={() => setModalStartDate(!modalStartDate)}>
                                    <View style={{ flexDirection: "row", borderWidth: 1, alignItems: 'center', borderRadius: 8, borderColor: COLOR_GRAY_1, padding: 15, }}>
                                        <MaterialCommunityIcons name={"calendar-outline"} size={20} color={COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
                                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{moment(startDate).format('DD MMMM YYYY')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.card, { flexDirection: "column", marginTop: 20, paddingTop: 30, paddingBottom: 50 }]}>
                            <View style={{ width: "100%", marginTop: 10 }}>
                                <Text style={{ bottom: 24, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_MAIN_SECONDARY, color: COLOR_WHITE }}>Total Cargo By Period</Text>
                            </View>
                            <LineChart
                                // areaChart
                                curved
                                noOfSections={5}
                                spacing={140}
                                data={companyUserId !== 5 ? generateChartBalanceCargo : generateChartBRE}
                                data2={companyUserId !== 5 ? null : generateChartEBL}
                                data3={companyUserId !== 5 ? null : generateChartTAJ}
                                data4={companyUserId !== 5 ? null : generateChartHMS}
                                yAxisLabelWidth={50}
                                maxValue={maxValueCargo}
                                xAxisThickness={1}
                                yAxisThickness={1}
                                yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                                xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12 }}
                                width={260} // Full width
                                height={getScreenDimension().height / 1.9} // Adjust height as needed
                                dataPointsColor1='red'
                                dataPointsColor2='blue'
                                dataPointsColor3='green'
                                dataPointsColor4='yellow'
                                // startFillColor="rgb(0, 105, 148)" // Darker sea blue
                                // startOpacity={0.8}
                                // endFillColor="rgb(72, 209, 204)" // Lighter sea blue
                                // endOpacity={0.3}
                                // isAnimated
                                // animationDuration={1200}
                            />
                            <View style={[styles.containerLegend, { marginTop: 50, display: companyUserId !== 5 ? "none" : "flex", flexDirection: "row" }]}>
                                <Legend color="red" text="BRE" />
                                <Legend color="blue" text="EBL" />
                                <Legend color="green" text="TAJ" />
                                <Legend color="yellow" text="HMS" />
                            </View>
                        </View>
                        <MyModal isVisible={modalStartDate} closeModal={() => setModalStartDate(!modalStartDate)}>
                            <View style={{ maxHeight: '100%', paddingVertical: 20, paddingHorizontal: 25 }}>
                                <DatePicker
                                    value={startDate}
                                    onChangeDate={setStartDate}
                                    closeDate={() => setModalStartDate(!modalStartDate)}
                                />
                            </View>
                        </MyModal>
                    </View>
                    :
                    <View style={{ height: '100%', zIndex: 999, paddingTop: 300, justifyContent: 'center', }} >
                        <ActivityIndicator size='large' color={COLOR_PRIMARY} />
                    </View>
                }
            </ScrollView>
        </BaseScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    containerItem: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    cardContainer: {
        borderWidth: 1,
        borderColor: COLOR_HORIZONTAL_LINE,
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLOR_WHITE,
        flexDirection: 'column',
        alignItems: 'center',
        shadowColor: COLOR_BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
    row: {
        width: "100%",
        flexDirection: 'row',
        marginHorizontal: 1,
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: COLOR_WHITE,
        paddingHorizontal: 6,
        marginVertical: 4
    },
    card: {
        width: "100%",
        justifyContent: "space-evenly",
        flexDirection: "row",
        borderRadius: 7,
        alignItems: "center",
        marginTop: 10,
        paddingBottom: 0,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: COLOR_HORIZONTAL_LINE,
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: COLOR_WHITE,
        shadowColor: COLOR_BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
    },
})

export default BalanceCargo;