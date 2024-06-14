import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { BaseScreen, BodyLarge, Body, BodySmall, MyHeader, MyModal, H2, MyModalInfo, DatePicker } from "../../components";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_ERROR, COLOR_GRAY_1, COLOR_GRAY_2, COLOR_PRIMARY, COLOR_RED, COLOR_TRANSPARENT_DARK, COLOR_WHITE } from '../../tools/constant';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getScreenDimension, iPad, ios, iconTools } from '../../tools/helper';
import { BarChart, LineChart } from "react-native-gifted-charts";
import { Text } from 'react-native';
import { generateChartData } from './components/summary';
import { filterByDateAndFilter } from './components/expansion';
import MyModalConfirm from '../../components/modalConfirm/ModalConfirm';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const BargingRecapitulation = ({ userId, listHistory, onAppear, isLoading, onDetailPressed, companyUserId, exportData }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [modalHistory, setModalHistory] = useState(false)
  const [finishDate, setFinishDate] = useState(new Date())
  const [modalStartDate, setModalStartDate] = useState(false)
  const [modalFinishDate, setModalFinishDate] = useState(false)
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [messageInfo, setMessageInfo] = useState('');
  const [modalConfirm, setModalConfirm] = useState(false);
  const [exportType, setExportType] = useState('');

  // Gunakan fungsi filterByDateAndFilter untuk mengambil data 
  const filterMonthlyandPeriod = filterByDateAndFilter(listHistory, "Year", "Period", startDate, finishDate);
  const filterMonthlyandJetty = filterByDateAndFilter(listHistory, "Year", "Jetty", startDate, finishDate);
  const generateChartSummary = generateChartData(listHistory);

  const getMaxValue = (data) => {
    return Math.max(...data.map(item => item.value));
  };
  // Hitung nilai maksimum dari data dan kalikan dengan 2 untuk mendapatkan maxValue
  const maxValue = getMaxValue(generateChartSummary) * 2;

  

  const totalTon = listHistory.reduce((total, item) => {
    return total + item.ACTUAL_LOAD;
  }, 0);


  useEffect(() => {
    // console.log("cek monthDate yearDate");
    onAppear(companyUserId, startDate, finishDate)
    filterMonthlyandPeriod;
    filterMonthlyandJetty;
    generateChartData;
  }, [startDate, finishDate])


  return (
    <BaseScreen
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}
      translucent
      containerStyle={{ paddingTop: iPad ? 10 : ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
    >
      <MyHeader
        pageTitle='Barging Recapitulation'
        backButton
      />
      <View style={{ paddingHorizontal: 20, }}>
        <Text style={{ marginTop: 5, textAlign: "center", fontSize: 16, fontWeight: "bold" }}> Select 'start date or Finish date' first</Text>
        <View style={{ marginTop: 15, flexDirection: "row", justifyContent: "space-evenly", }}>
          <View style={{ width: "45%" }}>
            <Text style={{ color: COLOR_GRAY_2, fontSize: 16, marginBottom: -10, marginLeft: 10, zIndex: 1, backgroundColor: COLOR_WHITE, width: "50%" }}>Start date</Text>
            <View style={{ flexDirection: "row", borderWidth: 1, alignItems: 'center', borderRadius: 8, borderColor: COLOR_GRAY_1, paddingTop: 5 }}>
              <MaterialCommunityIcons name={"calendar-outline"} size={20} color={COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
              <TouchableOpacity style={{
                backgroundColor: COLOR_WHITE,
                borderColor: COLOR_TRANSPARENT_DARK,
                marginVertical: 10,
              }}
                onPress={() => setModalStartDate(!modalStartDate)}>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>{moment(startDate).format('DD MMMM YYYY')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={{ color: COLOR_GRAY_2, fontSize: 16, marginBottom: -10, marginLeft: 10, zIndex: 1, backgroundColor: COLOR_WHITE, width: "55%" }}>Finish date</Text>
            <View style={{ flexDirection: "row", borderWidth: 1, alignItems: "center", borderRadius: 8, borderColor: COLOR_GRAY_1, paddingTop: 5 }}>
              <MaterialCommunityIcons name={"calendar-outline"} size={20} color={COLOR_PRIMARY} style={{ marginHorizontal: 10, }} />
              <TouchableOpacity style={{
                backgroundColor: COLOR_WHITE,
                borderColor: COLOR_TRANSPARENT_DARK,
                marginVertical: 10,
              }}
                onPress={() => setModalFinishDate(!modalFinishDate)}>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>{moment(finishDate).format('DD MMMM YYYY')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", flexDirection: "row", alignSelf: "center", justifyContent: "space-around", marginTop: 10, borderBottomWidth: 1, borderBottomColor: COLOR_DISABLED, paddingBottom: 15 }}>
          <TouchableOpacity
            onPress={() => [ setModalConfirm(true), setExportType("excel")]}
            style={{ backgroundColor: COLOR_PRIMARY, borderRadius: 4, width: "45%" }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }}>
              <Text style={{ width: "70%", textAlign: "center", padding: 10, borderRadius: 3, fontWeight: "bold", fontSize: 12, color: COLOR_WHITE }}>Export to Excel
              </Text>
              <MaterialCommunityIcons style={{ width: "20%", right:5 }} name={"microsoft-excel"} size={20} color={COLOR_WHITE} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => [ setModalConfirm(true), setExportType("PDF")]}
            style={{ backgroundColor: COLOR_RED, borderRadius: 4, width: "45%" }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }}>
              <Text style={{ width: "70%", textAlign: "center", padding: 10, borderRadius: 3, fontWeight: "bold", fontSize: 12, color: COLOR_WHITE }}>Export to PDF
              </Text>
              <MaterialCommunityIcons style={{ width: "20%", right:5 }} name={"file-pdf-box"} size={20} color={COLOR_WHITE} />
            </View>
          </TouchableOpacity>
          
        </View>
        <ScrollView>
          <View style={{ width: '100%', justifyContent: 'center' }}>
          <View style={{ justifyContent: "space-evenly", flexDirection: "row", borderBottomColor: COLOR_TRANSPARENT_DARK, borderBottomWidth: 1, marginBottom: 20 }}>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", marginTop: 10, paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Total Tonnase
                  </Text>
                  <Text style={{ paddingLeft: 30, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{totalTon}</Text>
                </View>
                <View>
                  <MaterialCommunityIcons name={"weight"} size={25} color={COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
                </View>
              </View>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", marginTop: 10, paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Total Barging</Text>
                  <Text style={{ paddingLeft: 30, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{listHistory.length}</Text>
                </View>
                <View>
                  <MaterialCommunityIcons name={"ferry"} size={25} color={COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
                </View>
              </View>
            </View>
            <View style={styles.card} >
              <View style={{ width: "100%", marginTop: 20, marginBottom: -20 }}>
                <Text style={{ bottom: 34, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Total Tonnase By Period</Text>
              </View>
              <LineChart
                areaChart
                curved
                noOfSections={10}
                spacing={90}
                data={generateChartSummary}
                yAxisLabelWidth={50}
                maxValue={maxValue}
                xAxisThickness={1}
                yAxisThickness={1}
                yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12 }}
                width={getScreenDimension().width / 1.1} // Full width
                height={getScreenDimension().height / 1.9} // Adjust height as needed
                startFillColor="rgb(0, 156, 78)"
                startOpacity={0.8}
                endFillColor="rgb(0, 200, 100)"
                endOpacity={0.3}
                isAnimated
                animationDuration={1200}
              />
            </View>
            <View style={[styles.card, { marginTop: 20 }]}>
              <View style={{ width: "100%", marginTop: 10 }}>
                <Text style={{ bottom: 24, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Total Tonnase By Jetty</Text>
              </View>
              <BarChart
                height={getScreenDimension().height / 2.3}
                width={getScreenDimension().width / 1.3}
                data={filterMonthlyandJetty}
                // horizontal
                barWidth={getScreenDimension().height / 12}
                noOfSections={5}
                yAxisLabelWidth={55}
                xAxisThickness={1}
                yAxisThickness={1}
                yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12 }}
                onPress={(e) => setModalHistory(true)}
                showFractionalValue
                isAnimated
              />
              <View>
                <Text style={{ bottom: -30, right: -140, fontWeight: "bold", fontSize: 15 }}>Jetty</Text>
              </View>
            </View>

            <View style={[styles.card, { marginBottom: 200, marginTop: 20 }]}>
              <View style={{ width: "100%", marginTop: 10 }}>
                <Text style={{ bottom: 20, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Total Tonnase By Month</Text>
              </View>
              <BarChart
                height={getScreenDimension().height / 2.3}
                width={getScreenDimension().width / 1.3}
                data={filterMonthlyandPeriod}
                // horizontal
                barWidth={getScreenDimension().height / 12}
                noOfSections={5}
                frontColor={COLOR_PRIMARY}
                xAxisThickness={1}
                yAxisThickness={1}
                yAxisLabelWidth={55}
                yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12, }}
                onPress={(e) => setModalHistory(true)}
                showFractionalValue
                isAnimated
              />
              <View>
                <Text style={{ bottom: -30, right: -140, fontWeight: "bold", fontSize: 15 }}>Tonnase</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <MyModal isVisible={modalHistory} closeModal={() => setModalHistory(!modalHistory)}>
          <View style={{ maxHeight: '100%', paddingBottom: 20, paddingTop: 30, paddingHorizontal: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <H2 bold>Daftar</H2>
              <TouchableOpacity onPress={() => setModalHistory(!modalHistory)}>
                <iconTools.MaterialIcons
                  name={'close'}
                  size={30}
                  color={COLOR_ERROR}
                // style={{ position: 'absolute', right: -5, top: -10 }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              contentContainerStyle={{ justifyContent: 'center', paddingBottom: 150, paddingTop: 20 }}
              showsVerticalScrollIndicator={false}
              style={{ width: '100%' }}
              data={listHistory}
              keyExtractor={(item) => item.ID}
              refreshing={isLoading}
              onRefresh={() => onAppear(userId)}
              renderItem={({ item }) => {
                return (
                  <Fragment>
                    <TouchableOpacity style={[styles.card, {marginBottom: 10, marginTop: 5}]} onPress={onDetailPressed}>
                      <Body bold style={{ color: COLOR_PRIMARY }}>{item.CUSTOMER}</Body>
                      <BodySmall style={{ color: COLOR_DISABLED }} >
                        {moment(item.DATE_BOOKING).format('DD MMMM YYYY')}
                      </BodySmall>
                      <View style={{ marginTop: 10, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                          <BodySmall bold style={{ width: 100 }}>Jetty</BodySmall>
                          <BodySmall>: </BodySmall>
                          <BodySmall>{item.JETTY}</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                          <BodySmall bold style={{ width: 100 }}>Tug Boat</BodySmall>
                          <BodySmall>: </BodySmall>
                          <BodySmall>{item.TUG_BOAT}</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                          <BodySmall bold style={{ width: 100 }}>Barge</BodySmall>
                          <BodySmall>: </BodySmall>
                          <BodySmall>{item.BARGE}</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                          <BodySmall bold style={{ width: 100 }}>Plan Load</BodySmall>
                          <BodySmall>: </BodySmall>
                          <BodySmall>{item.PLAN_LOAD}</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                          <BodySmall bold style={{ width: 100 }}>Actual Load</BodySmall>
                          <BodySmall>: </BodySmall>
                          <BodySmall>{item.ACTUAL_LOAD}</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                          <BodySmall bold style={{ width: 100 }}>Booking Date</BodySmall>
                          <BodySmall>: </BodySmall>
                          <BodySmall>{moment(item.DATE_BOOKING_TIME).format('DD MMMM YYYY')}</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                          <BodySmall bold style={{ width: 100 }}>Start Loading</BodySmall>
                          <BodySmall>: </BodySmall>
                          <BodySmall>{moment(item.START_LOADING).format('DD MMMM YYYY')}</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                          <BodySmall bold style={{ width: 100 }}>Finish Loading</BodySmall>
                          <BodySmall>: </BodySmall>
                          <BodySmall>{!item.FINISH_LOADING ? '-' : moment(item.FINISH_LOADING).format('DD MMMM YYYY')}</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 2, paddingRight: 120 }}>
                          <BodySmall bold style={{ width: 100 }}>Tujuan/Vessel</BodySmall>
                          <BodySmall>: </BodySmall>
                          <BodySmall>{item.VESSEL}</BodySmall>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Fragment>
                )
              }}
              ListEmptyComponent={renderEmptyComponent}
            />
          </View>
        </MyModal>
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
      <MyModal isVisible={modalFinishDate} closeModal={() => setModalFinishDate(!modalFinishDate)}>
        <View style={{ maxHeight: '100%', paddingVertical: 20, paddingHorizontal: 25 }}>
          <DatePicker
            value={finishDate}
            onChangeDate={setFinishDate}
            closeDate={() => setModalFinishDate(!modalFinishDate)}
          />
        </View>
      </MyModal>
      <MyModalConfirm
        isVisible={modalConfirm}
        closeModal={() => setModalConfirm(false)}
        onSubmit={() => [exportData(companyUserId, startDate, finishDate, exportType), setModalConfirm(false)]}
        message={"Apakah anda yakin ingin Export data " + exportType + " Barging Recapitulation dari " + moment(startDate).format('DD MMMM YYYY') + " - " + moment(finishDate).format('DD MMMM YYYY') + " ?"}
      />
      <MyModalInfo
        isVisible={showModalInfo}
        closeModal={() => {
          setShowModalInfo(!showModalInfo)
          setMessageInfo('')
        }}
        message={messageInfo}
      />
    </BaseScreen>
  )
}

export default BargingRecapitulation

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