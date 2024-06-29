import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BaseScreen, Body, HorizontalLine, MyHeader, MyModal, DatePicker, Dropdown, MyModalInfo, Legend } from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_BLACK, COLOR_DISABLED, COLOR_GRAY_1, COLOR_GRAY_2, COLOR_HORIZONTAL_LINE, COLOR_MAIN_SECONDARY, COLOR_MEDIUM_BLACK, COLOR_PRIMARY, COLOR_RED, COLOR_TRANSPARENT_DARK, COLOR_WHITE, FONT_POPPINS_REGULAR } from '../../tools/constant';
import { iPad, ios, iconTools, getScreenDimension, formatTotal } from '../../tools/helper';
import { ActivityIndicator, Badge } from 'react-native-paper';
import moment from 'moment';
import MyModalConfirm from '../../components/modalConfirm/ModalConfirm';
import { generateBarData } from './components/barChart';
import { generateChartData } from './components/lineChart';
import { BarChart, LineChart } from 'react-native-gifted-charts';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 200 }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const DeliveryCargo = ({
  listDeliveryCargo, onAppear, isLoading, exportData
}) => {
  const [shift, setShift] = useState('');
  const [jetty, setJetty] = useState('');
  const [showShiftMenu, setShowShiftMenu] = useState(false);
  const [showJettyMenu, setShowJettyMenu] = useState(false);
  const [startDate, setStartDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())
  const [modalStartDate, setModalStartDate] = useState(false)
  const [modalFinishDate, setModalFinishDate] = useState(false)
  const [modalConfirm, setModalConfirm] = useState(false);
  const [exportType, setExportType] = useState('');
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [messageInfo, setMessageInfo] = useState('');
  const [doExport, setDoExport] = useState(false);
  const [removeDuplicateShift, setRemoveDuplicateShift] = useState([]);
  const [removeDuplicateJetty, setRemoveDuplicateJetty] = useState([]);

  // Gunakan fungsi filterByDateAndFilter untuk mengambil data 
  const generateChartPerDaysGross = generateChartData(listDeliveryCargo, "GROSS", "hour", startDate);
  const generateChartPerDaysTare = generateChartData(listDeliveryCargo, "TARE", "hour", startDate);
  const generateChartPerDaysNetto = generateChartData(listDeliveryCargo, "NETTO", "hour", startDate);
  const generateChartPerPeriodGross = generateChartData(listDeliveryCargo, "GROSS", "period");
  const generateChartPerPeriodTare = generateChartData(listDeliveryCargo, "TARE", "period");
  const generateChartPerPeriodNetto = generateChartData(listDeliveryCargo, "NETTO", "period");
  const generateBarChartMonthly = generateBarData(listDeliveryCargo, "period");
  const generateBarChartJetty = generateBarData(listDeliveryCargo, "jetty");

  const getMaxValue = (data) => {
    return Math.max(...data.map(item => item.value));
  };
  // Hitung nilai maksimum dari data dan kalikan dengan 2 untuk mendapatkan maxValue
  const maxValuePerDay = getMaxValue(generateChartPerDaysGross) * 1.5;
  const maxValuePerPeriod = getMaxValue(generateChartPerPeriodGross) * 1.5;
  const maxValuePerMonthly = getMaxValue(generateBarChartMonthly) * 1.5;
  const maxValuePerJetty = getMaxValue(generateBarChartJetty) * 1.5;

  const filterDataExport = () => {

    const removeDuplicatesByKey = (data, key) => {
      return data.filter((item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key])
      );
    };

    setRemoveDuplicateShift(removeDuplicatesByKey(listDeliveryCargo, 'SHIFT_WB3'));
    setRemoveDuplicateJetty(removeDuplicatesByKey(listDeliveryCargo, 'JETTY'));
  }

  const totalGross = listDeliveryCargo.reduce((total, item) => {
    return total + item.GROSS_WB3;
  }, 0);

  const totalTare = listDeliveryCargo.reduce((total, item) => {
    return total + item.TARE_WB3;
  }, 0);

  const TotalNetto = listDeliveryCargo.reduce((total, item) => {
    return total + item.NETTO_WB3;
  }, 0);


  useEffect(() => {
    onAppear(startDate, finishDate)
    filterDataExport();

  }, [startDate, finishDate])

  return (
    <BaseScreen
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}
      translucent containerStyle={{ paddingTop: iPad ? 10 : ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
    >
      <MyHeader pageTitle='Delivery Cargo' backButton />
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", borderBottomWidth: 1, borderBottomColor: COLOR_DISABLED, paddingBottom: 15 }}>
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
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <TouchableOpacity
            onPress={() => [setDoExport(!doExport)]}
            style={{ backgroundColor: doExport === true ? COLOR_RED : COLOR_PRIMARY, borderRadius: 8, width: "100%" }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }}>
              <Text style={{ width: "70%", textAlign: "center", padding: 12, borderRadius: 3, fontWeight: "bold", fontSize: 14, color: COLOR_WHITE }}>{doExport === true ? "Batalkan Export" : "Export Data"}
              </Text>
              <MaterialCommunityIcons style={{ right: 70 }} name={doExport === true ? "close-circle" : "download-box"} size={20} color={COLOR_WHITE} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ display: doExport == true ? "flex" : "none", paddingTop: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <View style={{ marginBottom: 20, width: "45%" }}>
              <Body style={{ color: COLOR_BLACK, marginBottom: 5 }}>Shift <Body style={{ color: 'red' }}>*</Body> : </Body>
              <Dropdown
                custom={true}
                value={shift ? shift : ''}
                dropdownActive={showShiftMenu}
                dropdownPressed={() => {
                  setShowShiftMenu(!showShiftMenu)
                }}
                data={removeDuplicateShift}
                placeholder={'Select Shift'}
                containerStyle={{ marginVertical: 0 }}
                borderColor={COLOR_MEDIUM_BLACK}
                borderRadius={8}
              >
                <MyModal
                  isVisible={showShiftMenu}
                  headerActive={true}
                  headerTitle={'List Shift'}
                  closeModal={() => setShowShiftMenu(!showShiftMenu)}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                    data={removeDuplicateShift}
                    keyExtractor={(_, index) => index}
                    renderItem={({ item, index }) => {

                      const lastIndex = removeDuplicateShift.length - 1;

                      return (
                        <>
                          <TouchableOpacity
                            style={{ marginVertical: 5 }}
                            onPress={() => {
                              setShift(item.SHIFT_WB3)
                              setShowShiftMenu(!showShiftMenu)
                            }}>
                            <Body style={{ color: COLOR_BLACK, textAlign: 'center' }}>
                              {item.SHIFT_WB3}
                            </Body>
                          </TouchableOpacity>
                          {index !== lastIndex && <HorizontalLine width={'100%'} />}
                        </>
                      )
                    }}
                  />
                </MyModal>
              </Dropdown>
            </View>
            <View style={{ marginBottom: 20, width: "45%" }}>
              <Body style={{ color: COLOR_BLACK, marginBottom: 5 }}>Jetty <Body style={{ color: 'red' }}>*</Body> : </Body>
              <Dropdown
                custom={true}
                value={jetty ? jetty : ''}
                dropdownActive={showJettyMenu}
                dropdownPressed={() => {
                  setShowJettyMenu(!showJettyMenu)
                }}
                data={removeDuplicateJetty}
                placeholder={'Select Jetty'}
                containerStyle={{ marginVertical: 0 }}
                borderColor={COLOR_MEDIUM_BLACK}
                borderRadius={8}
              >
                <MyModal
                  isVisible={showJettyMenu}
                  headerActive={true}
                  headerTitle={'List Jetty'}
                  closeModal={() => setShowJettyMenu(!showJettyMenu)}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                    data={removeDuplicateJetty}
                    keyExtractor={(_, index) => index}
                    renderItem={({ item, index }) => {

                      const lastIndex = removeDuplicateJetty.length - 1;

                      return (
                        <>
                          <TouchableOpacity
                            style={{ marginVertical: 5 }}
                            onPress={() => {
                              setJetty(item.JETTY)
                              setShowJettyMenu(!showJettyMenu)
                            }}>
                            <Body style={{ color: COLOR_BLACK, textAlign: 'center' }}>
                              {item.JETTY}
                            </Body>
                          </TouchableOpacity>
                          {index !== lastIndex && <HorizontalLine width={'100%'} />}
                        </>
                      )
                    }}
                  />
                </MyModal>
              </Dropdown>
            </View>
          </View>
          <View style={{ width: "100%", flexDirection: "row", alignSelf: "center", justifyContent: "space-around", borderBottomWidth: 1, borderBottomColor: COLOR_DISABLED, paddingBottom: 15, marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => {
                if (shift === '') {
                  setShowModalInfo(!showModalInfo)
                  setMessageInfo('Harap pilih shift terlebih dahulu')
                } else if (jetty === '') {
                  setShowModalInfo(!showModalInfo);
                  setMessageInfo('Harap pilih jetty terlebih dahulu')
                } else {
                  [
                    setModalConfirm(true),
                    setExportType("excel")
                  ]
                }
              }}
              style={{ backgroundColor: COLOR_PRIMARY, borderRadius: 4, width: "45%" }}
            >
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Text style={{ width: "70%", textAlign: "center", padding: 10, borderRadius: 3, fontWeight: "bold", fontSize: 12, color: COLOR_WHITE }}>Export to Excel
                </Text>
                <MaterialCommunityIcons style={{ width: "20%", right: 5 }} name={"microsoft-excel"} size={20} color={COLOR_WHITE} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (shift === '') {
                  setShowModalInfo(!showModalInfo)
                  setMessageInfo('Harap pilih shift terlebih dahulu')
                } else if (jetty === '') {
                  setShowModalInfo(!showModalInfo);
                  setMessageInfo('Harap pilih jetty terlebih dahulu')
                } else {
                  [
                    setModalConfirm(true),
                    setExportType("pdf")
                  ]
                }
              }}
              style={{ backgroundColor: COLOR_RED, borderRadius: 4, width: "45%" }}
            >
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Text style={{ width: "70%", textAlign: "center", padding: 10, borderRadius: 3, fontWeight: "bold", fontSize: 12, color: COLOR_WHITE }}>Export to PDF
                </Text>
                <MaterialCommunityIcons style={{ width: "20%", right: 5 }} name={"file-pdf-box"} size={20} color={COLOR_WHITE} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* dropdown */}
        {!isLoading ?
          <ScrollView>
            <View style={{ width: '100%', justifyContent: 'center' }}>
              <View style={{ justifyContent: "space-evenly", flexDirection: "row", borderBottomColor: COLOR_TRANSPARENT_DARK, borderBottomWidth: 1, marginBottom: 20, paddingBottom: 10 }}>
                <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", marginTop: 10, paddingBottom: 0, paddingVertical: 5 }]}>
                  <View>
                    <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Total Gross
                    </Text>
                    <Text style={{ paddingLeft: 15, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{formatTotal(totalGross)}</Text>
                  </View>
                  <View>
                    <MaterialCommunityIcons name={"weight"} size={25} color={COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
                  </View>
                </View>
                <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", marginTop: 10, paddingBottom: 0, paddingVertical: 5 }]}>
                  <View>
                    <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Total Tare</Text>
                    <Text style={{ paddingLeft: 15, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{formatTotal(totalTare)}</Text>
                  </View>
                  <View>
                    <MaterialCommunityIcons name={"weight-gram"} size={25} color={COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
                  </View>
                </View>
              </View>
              <View style={{ justifyContent: "space-evenly", flexDirection: "row", borderBottomColor: COLOR_TRANSPARENT_DARK, borderBottomWidth: 1, marginBottom: 20, paddingBottom: 10 }}>
                <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", marginTop: 10, paddingBottom: 0, paddingVertical: 5 }]}>
                  <View>
                    <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Total Netto
                    </Text>
                    <Text style={{ paddingLeft: 15, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{formatTotal(TotalNetto)}</Text>
                  </View>
                  <View>
                    <MaterialCommunityIcons name={"weight-pound"} size={25} color={COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
                  </View>
                </View>
                <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", marginTop: 10, paddingBottom: 0, paddingVertical: 5 }]}>
                  <View>
                    <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Total Cargo</Text>
                    <Text style={{ paddingLeft: 15, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{listDeliveryCargo.length === 0 ? '0.000' : listDeliveryCargo.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                  </View>
                  <View>
                    <MaterialCommunityIcons name={"truck-cargo-container"} size={25} color={COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
                  </View>
                </View>
              </View>
              <View style={[styles.card, { paddingTop: 30, paddingBottom: 10 }]} >
                <View style={{ width: "100%", marginTop: 20, marginBottom: -20 }}>
                  <Text style={{ bottom: 34, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Total Cargo By Hour</Text>
                </View>
                <LineChart
                  // areaChart
                  curved
                  noOfSections={10}
                  spacing={90}
                  data={generateChartPerDaysGross}
                  data2={generateChartPerDaysTare}
                  data3={generateChartPerDaysNetto}
                  yAxisLabelWidth={60}
                  maxValue={maxValuePerDay}
                  xAxisThickness={1}
                  yAxisThickness={1}
                  yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                  xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12 }}
                  width={260} // Full width
                  height={getScreenDimension().height / 1.9} // Adjust height as needed
                  dataPointsColor1="blue"
                  dataPointsColor2="red"
                  dataPointsColor3="green"
                  // startFillColor="rgb(0, 156, 78)"
                  // startOpacity={0.8}
                  // endFillColor="rgb(0, 200, 100)"
                  // endOpacity={0.3}
                  isAnimated
                  animationDuration={1200}
                />
                <View style={[styles.containerLegend, { marginTop: 30 }]}>
                  <Legend color="blue" text="Gross" />
                  <Legend color="green" text="Netto" />
                  <Legend color="red" text="Tare" />
                </View>
              </View>
              <View style={[styles.card, { paddingTop: 30, paddingBottom: 10 }]} >
                <View style={{ width: "100%", marginTop: 20, marginBottom: -20 }}>
                  <Text style={{ bottom: 34, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Total Cargo By Period</Text>
                </View>
                <LineChart
                  // areaChart
                  curved
                  noOfSections={10}
                  spacing={110}
                  data={generateChartPerPeriodGross}
                  data2={generateChartPerPeriodTare}
                  data3={generateChartPerPeriodNetto}
                  yAxisLabelWidth={60}
                  maxValue={maxValuePerPeriod}
                  xAxisThickness={1}
                  yAxisThickness={1}
                  yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                  xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12 }}
                  width={275} // Full width
                  height={getScreenDimension().height / 1.9} // Adjust height as needed
                  dataPointsColor1="blue"
                  dataPointsColor2="red"
                  dataPointsColor3="green"
                  // startFillColor="rgb(0, 156, 78)"
                  // startOpacity={0.8}
                  // endFillColor="rgb(0, 200, 100)"
                  // endOpacity={0.3}
                  isAnimated
                  animationDuration={1200}
                />
                <View style={[styles.containerLegend, { marginTop: 30 }]}>
                  <Legend color="blue" text="Gross" />
                  <Legend color="green" text="Netto" />
                  <Legend color="red" text="Tare" />
                </View>
              </View>

              <View style={[styles.card, { marginTop: 20, paddingBottom: 10 }]}>
                <View style={{ width: "100%", marginTop: 20, }}>
                  <Text style={{ bottom: 20, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Total Cargo By Month</Text>
                </View>
                <BarChart
                  height={getScreenDimension().height / 2.3}
                  width={getScreenDimension().width / 1.3}
                  data={generateBarChartMonthly}
                  // horizontal
                  maxValue={maxValuePerMonthly}
                  barWidth={40}
                  noOfSections={5}
                  frontColor={COLOR_PRIMARY}
                  xAxisThickness={1}
                  yAxisThickness={1}
                  yAxisLabelWidth={55}
                  yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                  xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12, }}
                  showFractionalValue
                // isAnimated
                />
                <View style={[styles.containerLegend, { marginTop: 30 }]}>
                  <Legend color="blue" text="Gross" />
                  <Legend color="green" text="Netto" />
                  <Legend color="red" text="Tare" />
                </View>
              </View>
              <View style={[styles.card, { marginBottom: 50, marginTop: 20, paddingBottom: 10 }]}>
                <View style={{ width: "100%", marginTop: 20, }}>
                  <Text style={{ bottom: 20, padding: 7, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 15, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Total Cargo By Jetty</Text>
                </View>
                <BarChart
                  height={getScreenDimension().height / 2.3}
                  width={getScreenDimension().width / 1.3}
                  data={generateBarChartJetty}
                  // horizontal
                  maxValue={maxValuePerJetty}
                  barWidth={40}
                  noOfSections={5}
                  frontColor={COLOR_PRIMARY}
                  xAxisThickness={1}
                  yAxisThickness={1}
                  yAxisLabelWidth={55}
                  yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
                  xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12, }}
                  showFractionalValue
                // isAnimated
                />
                <View style={[styles.containerLegend, { marginTop: 30 }]}>
                <Legend color="blue" text="Gross" />
                <Legend color="green" text="Netto" />
                <Legend color="red" text="Tare" />
              </View>
              </View>
            </View>
          </ScrollView>
          :
          <View style={{ height: '40%', justifyContent: 'center' }} >
            <ActivityIndicator size='large' color={COLOR_PRIMARY} />
          </View>}

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
      <MyModalInfo
        isVisible={showModalInfo}
        closeModal={() => {
          setShowModalInfo(!showModalInfo)
          setMessageInfo('')
        }}
        message={messageInfo}
      />
      <MyModalConfirm
        isVisible={modalConfirm}
        closeModal={() => setModalConfirm(false)}
        onSubmit={() => [exportData(startDate, finishDate, shift, jetty, exportType), setModalConfirm(false)]}
        message={`Apakah anda yakin ingin Export data ${exportType} Delivery Cargo dari ${moment(startDate).format('DD MMMM YYYY')} - ${moment(finishDate).format('DD MMMM YYYY')}, Shift ${shift}, ${jetty} ?`}
      />
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
    paddingVertical: 10,
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
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLOR_HORIZONTAL_LINE,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLOR_WHITE,
    flexDirection: 'column',
    alignItems: 'flex-start',
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  contentItem: {
    marginBottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: 10
  },
  menuButton: {
    height: 50,
    width: "85%",
    borderWidth: 1,
    borderRadius: 24,
    justifyContent: 'center',
    paddingLeft: 16,
    borderColor: COLOR_PRIMARY
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
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
  cell: {
    flex: 1,
    fontFamily: FONT_POPPINS_REGULAR,
    fontSize: 14,
    paddingHorizontal: 5,
  },
  badge: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    top: -12
  },
  containerLegend: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  }
});

export default DeliveryCargo;

