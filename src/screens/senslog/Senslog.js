import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { BaseScreen, BodyLarge, MyHeader, MyModal, MyModalInfo, DatePicker } from "../../components";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_GRAY_1, COLOR_GRAY_2, COLOR_MAIN_SECONDARY, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE } from '../../tools/constant';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getScreenDimension, iPad, ios, iconTools } from '../../tools/helper';
import { LineChart } from "react-native-gifted-charts";
import { Text } from 'react-native';
import { generateChartData } from './dataChart';
import { ActivityIndicator } from 'react-native-paper';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const Senslog = ({ waterBenderAvgDistance, waterBenderLast, waterBenderAvg, waterBenderMonthly, waterBenderPeriod, onAppear, isLoading, onCloseModalError }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [modalStartDate, setModalStartDate] = useState(false)
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [messageInfo, setMessageInfo] = useState('');

  let generateChartWaterBenderAvgDistance, generateChartWaterBenderPeriod, generateChartWaterBenderMonthly;

  if (waterBenderAvgDistance && waterBenderLast && waterBenderAvg && waterBenderMonthly && waterBenderPeriod) {
    generateChartWaterBenderAvgDistance = generateChartData(waterBenderAvgDistance, 1);
    generateChartWaterBenderPeriod = generateChartData(waterBenderPeriod, 4);
    generateChartWaterBenderMonthly = generateChartData(waterBenderMonthly, 3);
  }

  useEffect(() => {
    if (startDate < new Date()) {
      onAppear(startDate);
    } else {
      setShowModalInfo(!showModalInfo);
    }
  }, [startDate])


  return (
    <BaseScreen
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}
      translucent
      containerStyle={{ paddingTop: iPad ? 10 : ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
    >
      <MyHeader
        pageTitle='Senslog'
        backButton
      />
      <View style={{ paddingHorizontal: 20, }}>
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
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>{moment(startDate).format('DD MMMM YYYY')} <Text style={{ fontSize: 9 }}>(Rentang 3 hari)</Text></Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={{ width: '100%', justifyContent: 'center', marginBottom: 200 }}>
            <View style={{ justifyContent: "space-evenly", flexDirection: "row", borderBottomColor: COLOR_TRANSPARENT_DARK, borderBottomWidth: 1, marginBottom: 20 }}>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", marginTop: 10, paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 13, color: COLOR_BLACK }}>Kedalaman Air {"\n"}
                    <Text style={{ fontSize: 9, fontWeight: "400" }}>1 jam terakhir</Text>
                  </Text>
                  <Text style={{ paddingLeft: 35, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 15, color: COLOR_BLACK }}>{waterBenderLast} m</Text>
                </View>
                <View>
                  <MaterialCommunityIcons name={"water-check-outline"} size={30} color={COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
                </View>
              </View>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", marginTop: 10, paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 13, color: COLOR_BLACK }}>Kedalaman Air {"\n"}
                    <Text style={{ fontSize: 9, fontWeight: "400" }}>{moment(startDate).format('DD MMMM YYYY')} </Text> <Text style={{ fontSize: 6 }}>(rata-rata)</Text>
                  </Text>
                  <Text style={{ paddingLeft: 35, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 15, color: COLOR_BLACK }}>{waterBenderAvg} m</Text>
                </View>
                <View>
                  <MaterialCommunityIcons name={"water-sync"} size={35} color={COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
                </View>
              </View>
            </View>
            {!isLoading && generateChartWaterBenderMonthly != undefined ?
              <View>
                <View style={[styles.card, { marginTop: 20 }]}>
                  <View style={{ width: "100%", marginTop: 10 }}>
                    <Text style={{ bottom: 24, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_MAIN_SECONDARY, color: COLOR_WHITE }}>Water Surface By Period</Text>
                  </View>
                  <LineChart
                    areaChart
                    curved
                    noOfSections={5}
                    spacing={140}
                    data={generateChartWaterBenderPeriod}
                    yAxisLabelWidth={50}
                    maxValue={5}
                    xAxisThickness={1}
                    yAxisThickness={1}
                    yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                    xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12 }}
                    width={getScreenDimension().width / 1.5} // Full width
                    height={getScreenDimension().height / 1.9} // Adjust height as needed
                    startFillColor="rgb(0, 105, 148)" // Darker sea blue
                    startOpacity={0.8}
                    endFillColor="rgb(72, 209, 204)" // Lighter sea blue
                    endOpacity={0.3}
                  // isAnimated
                  // animationDuration={1200}
                  />
                </View>
                <View style={[styles.card, { marginTop: 20 }]}>
                  <View style={{ width: "100%", marginTop: 10 }}>
                    <Text style={{ bottom: 24, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_MAIN_SECONDARY, color: COLOR_WHITE }}>Water Surface By Monthly</Text>
                  </View>
                  <LineChart
                    areaChart
                    curved
                    noOfSections={5}
                    spacing={90}
                    data={generateChartWaterBenderMonthly}
                    yAxisLabelWidth={50}
                    maxValue={5}
                    xAxisThickness={1}
                    yAxisThickness={1}
                    yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                    xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12 }}
                    width={getScreenDimension().width / 1.5} // Full width
                    height={getScreenDimension().height / 1.9} // Adjust height as needed
                    startFillColor="rgb(0, 105, 148)" // Darker sea blue
                    startOpacity={0.8}
                    endFillColor="rgb(72, 209, 204)" // Lighter sea blue
                    endOpacity={0.3}
                  // isAnimated
                  // animationDuration={1200}
                  />
                </View>
                <View style={[styles.card, { marginTop: 20, }]}>
                  <View style={{ width: "100%", marginTop: 10 }}>
                    <Text style={{ bottom: 24, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_MAIN_SECONDARY, color: COLOR_WHITE }}>Water Surface By Daily</Text>
                  </View>
                  <LineChart
                    areaChart
                    curved
                    noOfSections={5}
                    spacing={90}
                    data={generateChartWaterBenderAvgDistance}
                    yAxisLabelWidth={50}
                    maxValue={5}
                    xAxisThickness={1}
                    yAxisThickness={1}
                    yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                    xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12 }}
                    width={getScreenDimension().width / 1.5} // Full width
                    height={getScreenDimension().height / 1.9} // Adjust height as needed
                    startFillColor="rgb(0, 105, 148)" // Darker sea blue
                    startOpacity={0.8}
                    endFillColor="rgb(72, 209, 204)" // Lighter sea blue
                    endOpacity={0.3}
                  // isAnimated
                  // animationDuration={1200}
                  />
                </View>
              </View>
              :
              <View style={{ height: '40%', justifyContent: 'center' }} >
                <ActivityIndicator size='large' color={COLOR_PRIMARY} />
              </View>
            }

          </View>
        </ScrollView>
      </View>
      <MyModal isVisible={modalStartDate} closeModal={() => setModalStartDate(!modalStartDate)}>
        <View style={{ maxHeight: '100%', paddingVertical: 20, paddingHorizontal: 25 }}>
          <DatePicker
            value={startDate}
            onChangeDate={setStartDate}
            closeDate={() => { setModalStartDate(!modalStartDate); }
            }
          />
        </View>
      </MyModal>
      {/* <MyModal isVisible={modalFinishDate} closeModal={() => setModalFinishDate(!modalFinishDate)}>
        <View style={{ maxHeight: '100%', paddingVertical: 20, paddingHorizontal: 25 }}>
          <DatePicker
            value={finishDate}
            onChangeDate={setFinishDate}
            closeDate={() => setModalFinishDate(!modalFinishDate)}
          />
        </View>
      </MyModal> */}
      <MyModalInfo
        isVisible={showModalInfo}
        closeModal={() => {
          setShowModalInfo(!showModalInfo)
          setMessageInfo('Tanggal yang anda masukkan melebihi tanggal hari ini.')
          onCloseModalError()
        }}
        message={messageInfo}
      />
    </BaseScreen>
  )
}

export default Senslog

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: COLOR_TRANSPARENT_DARK,
    marginTop: -20,
    paddingVertical: 30,
    paddingBottom: 40,
    marginBottom: 15,
    backgroundColor: COLOR_WHITE,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
    padding: 15
  },
  containerFilterDate: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: COLOR_DISABLED,
    paddingBottom: 15
  },
  buttonFilter: (monthDateActive) => ({
    flexDirection: "row",
    height: 45,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: COLOR_GRAY_1,
    backgroundColor: monthDateActive ? COLOR_PRIMARY : COLOR_WHITE
  }),
  textFilterDate: {
    color: COLOR_GRAY_2,
    fontSize: 16,
    marginBottom: -10,
    marginLeft: 10,
    zIndex: 1,
    backgroundColor: COLOR_WHITE,
    width: "50%"
  },
  line: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLOR_DISABLED,
  },
  textBarTopComponent: {
    fontWeight: "bold",
    color: COLOR_BLACK,
    fontSize: 8,
    marginBottom: 6
  },
  cardColumn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // padding: 10,
    marginTop: 5
  },
  filterByCard: (filterBy, value) => ({
    width: '48%',
    height: 40,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: filterBy === value ? COLOR_PRIMARY : COLOR_TRANSPARENT_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: filterBy === value ? COLOR_PRIMARY : COLOR_WHITE,
  }),
})