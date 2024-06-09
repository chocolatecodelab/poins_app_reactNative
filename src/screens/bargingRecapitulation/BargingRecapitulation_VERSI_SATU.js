import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { BaseScreen, BodyLarge, Body, BodySmall, BodyExtraSmall, MyHeader, MyModal, H2, CalendarMonth, CalendarYear, MyModalInfo, DatePicker } from "../../components";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_ERROR, COLOR_GRAY_1, COLOR_GRAY_2, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE } from '../../tools/constant';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getScreenDimension, iPad, ios, iconTools } from '../../tools/helper';
import { BarChart, LineChart } from "react-native-gifted-charts";
import { Text } from 'react-native';
import { generateChartData } from './components/summary';
import { filterByDateAndFilter } from './components/expansion';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const BargingRecapitulation = ({ userId, listHistory, onAppear, isLoading, onDetailPressed }) => {
  const [monthDate, setmonthDate] = useState(new Date())
  const [yearDate, setyearDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())
  const [monthDateActive, setMonthDateActive] = useState(false);
  const [yearDateActive, setyearDateActive] = useState(false);
  const [modalmonthDate, setModalmonthDate] = useState(false)
  const [modalyearDate, setModalyearDate] = useState(false)
  const [modalHistory, setModalHistory] = useState(false)
  const [modalStartDate, setModalStartDate] = useState(false)
  const [modalFinishDate, setModalFinishDate] = useState(false)
  const [dateBy, setDateBy] = useState("");
  const [filterBy, setFilterBy] = useState('');
  const [sectionBy, setSectionBy] = useState('');
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [messageInfo, setMessageInfo] = useState('');
  const datafilterBy = [
    { id: 1, type: "Period" },
    { id: 2, type: "Jetty" },
  ]

  const dataSectionBy = [
    { id: 1, type: "Summary" },
    { id: 2, type: "Expansion" },
  ]

  // Gunakan fungsi filterByDateAndFilter untuk mengambil data 
  const filteredAndperiodData = filterByDateAndFilter(listHistory, dateBy, filterBy, monthDate, yearDate);
  const data = generateChartData(listHistory);

  const totalTon = listHistory.reduce((total, item) => {
    return total + item.CAPACITY;
  }, 0);

  useEffect(() => { 
    console.log("cek monthDate yearDate");
    onAppear(userId, monthDate, yearDate) 
    filteredAndperiodData;
  }, [monthDate, yearDate])

  useEffect(() => {
    console.log("cek startDate finishDate");
    onAppear(userId, startDate, finishDate);
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
      <View style={{ paddingHorizontal: 25, }}>
        <View style={{ paddingHorizontal: 10, borderBottomWidth: 1, paddingBottom: 15, borderBottomColor: COLOR_DISABLED }}>
          <Text style={{ fontSize: 16, marginTop: 5, color: COLOR_GRAY_2 }}>Section by <Body style={{ color: 'red' }}>*</Body>:</Text>
          <View style={styles.cardColumn}>
            {dataSectionBy?.map((item) => {
              return (
                <TouchableOpacity
                  key={item?.id}
                  style={styles.filterByCard(sectionBy, item?.type)}
                  onPress={() => {
                    setSectionBy(item?.type)
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name={item?.type == "Summary" ? "book" : "book-open"} size={20} style={{ marginHorizontal: 5, color: sectionBy === item?.type ? COLOR_WHITE : COLOR_PRIMARY }} />
                    <Text style={{ color: sectionBy === item?.type ? COLOR_WHITE : COLOR_BLACK, fontWeight: "bold" }}>{item?.type}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
        <View style={{ marginTop: 15, display: sectionBy == "Summary" ? "flex" : "none", flexDirection: "row", justifyContent: "space-evenly", borderBottomWidth: 1, borderBottomColor: COLOR_DISABLED, paddingBottom: 15 }}>
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
        <View style={{ display: sectionBy == "Expansion" ? "flex" : "none", paddingHorizontal: 10, borderBottomWidth: 1, paddingBottom: 15, borderBottomColor: COLOR_DISABLED }}>
          <Text style={{ fontSize: 16, marginTop: 5, color: COLOR_GRAY_2 }}>Filter by <Body style={{ color: 'red' }}>*</Body>:</Text>
          <View style={styles.cardColumn}>
            {datafilterBy?.map((item) => {
              return (
                <TouchableOpacity
                  key={item?.id}
                  style={styles.filterByCard(filterBy, item?.type)}
                  onPress={() => {
                    setFilterBy(item?.type)
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons name={item?.type == "Period" ? "clock-time-three" : "ferry"} size={20} style={{ marginHorizontal: 5, color: filterBy === item?.type ? COLOR_WHITE : COLOR_PRIMARY }} />
                    <Text style={{ color: filterBy === item?.type ? COLOR_WHITE : COLOR_BLACK, fontWeight: "bold" }}>{item?.type}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
        <View style={{ display: sectionBy == "Expansion" ? "flex" : "none" }}>
          <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 16, color: COLOR_GRAY_2 }}>Date by:</Text>
          <View style={styles.containerFilterDate}>
            <View style={{ width: "45%" }}>
              <View style={styles.buttonFilter(monthDateActive)}>
                <MaterialCommunityIcons name={"calendar-month"} size={20} color={monthDateActive ? COLOR_WHITE : COLOR_PRIMARY} style={{ marginHorizontal: 10 }} />
                <TouchableOpacity style={{
                  borderColor: COLOR_TRANSPARENT_DARK,
                  marginVertical: 10,
                }}
                  onPress={() => {
                    if (filterBy === '') {
                      setShowModalInfo(!showModalInfo)
                      setMessageInfo('Harap pilih filter terlebih dahulu')
                    } else {
                      setModalmonthDate(!modalmonthDate)
                    }
                  }}>
                  <Text style={{ fontWeight: "bold", marginLeft: monthDateActive ? 0 : 20, textAlign: "center", color: monthDateActive ? COLOR_WHITE : COLOR_BLACK }}>{monthDateActive ? moment(monthDate).format('MMMM YYYY') : "Daily"}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: "45%" }}>
              <View style={styles.buttonFilter(yearDateActive)}>
                <MaterialCommunityIcons name={"calendar-outline"} size={20} color={yearDateActive ? COLOR_WHITE : COLOR_PRIMARY} style={{ marginHorizontal: 10, }} />
                <TouchableOpacity style={{
                  borderColor: COLOR_TRANSPARENT_DARK,
                  marginVertical: 10,
                }}
                  onPress={() => {
                    if (filterBy === '') {
                      setShowModalInfo(!showModalInfo)
                      setMessageInfo('Harap pilih filter terlebih dahulu')
                    } else {
                      setModalyearDate(!modalyearDate)
                    }
                  }}>
                  <Text style={{ fontWeight: "bold", textAlign: "center", marginLeft: 25, color: yearDateActive ? COLOR_WHITE : COLOR_BLACK }}>{yearDateActive ? moment(yearDate).format('YYYY') : "Monthly"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', justifyContent: 'center' }}>
          <View>
            <Text style={{ marginTop: 5, marginBottom: 10, textAlign: "center", fontSize: 16, fontWeight: "bold", display: sectionBy == "" ? "none" : "flex" }}>{sectionBy == "Expansion" ? "Choose 'Filter By and Date by' first" : "Determine 'Start date and Finish date' first"}</Text>
          </View>
          <View style={{ marginHorizontal: 10, display: sectionBy == "Expansion" ? "flex" : "none" }}>
            <BarChart
              height={sectionBy == "Summary" ? getScreenDimension().height / 1.8 : getScreenDimension().height / 2.3}
              width={getScreenDimension().width / 1.3}
              data={filterBy == "" ? null : filteredAndperiodData}
              horizontal
              barWidth={getScreenDimension().height / 28}
              noOfSections={5}
              frontColor={COLOR_PRIMARY}
              xAxisThickness={1}
              yAxisThickness={1}
              yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
              xAxisLabelTextStyle={{ color: 'gray', textAlign: 'center', fontSize: 12 }}
              onPress={(e) => setModalHistory(true)}
              showFractionalValue
              isAnimated
            />
            <View>
              <Text style={{ bottom: -65, right: -140, fontWeight: "bold", fontSize: 15 }}>Tonnase</Text>
            </View>
          </View>
          <View style={{ display: sectionBy == "Summary" ? "flex" : "none" }}>
            <View>
              <LineChart
                areaChart
                curved
                noOfSections={10}
                spacing={90}
                data={data}
                maxValue={20000}
                xAxisThickness={1}
                yAxisThickness={1}
                xAxisLabelTextStyle={{ color: COLOR_BLACK }}
                width={getScreenDimension().width} // Full width
                height={getScreenDimension().height / 1.9} // Adjust height as needed
                startFillColor="rgb(46, 217, 255)"
                startOpacity={0.8}
                endFillColor="rgb(203, 241, 250)"
                endOpacity={0.3}
                isAnimated
                animationDuration={1200}
              />
            </View>
            <View style={{ width: "40%" }}>
              <Text style={{ bottom: -20, right: -10, padding:5, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 13, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Total Tonnase</Text>
              <Text style={{ bottom: -20, right: -10, padding:5, textAlign: "center", fontWeight: "bold", fontSize: 12, color: COLOR_BLACK }}>{totalTon}</Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text style={{ bottom: 34, right: -200, padding: 5, textAlign: "center", borderRadius: 3, fontWeight: "bold", fontSize: 13, backgroundColor: COLOR_PRIMARY, color: COLOR_WHITE }}>Total Barging</Text>
              <Text style={{ bottom: 33, right: -200, padding:5, textAlign: "center", fontWeight: "bold", fontSize: 12, color: COLOR_BLACK }}>{listHistory.length}</Text>
            </View>
          </View>
        </View>
      </View>
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
                  <TouchableOpacity style={styles.card} onPress={onDetailPressed}>
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
                        <BodySmall bold style={{ width: 100 }}>Capacity</BodySmall>
                        <BodySmall>: </BodySmall>
                        <BodySmall>{item.CAPACITY}</BodySmall>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                        <BodySmall bold style={{ width: 100 }}>Booking Date</BodySmall>
                        <BodySmall>: </BodySmall>
                        <BodySmall>{moment(item.DATE_BOOKING).format('DD MMMM YYYY')}</BodySmall>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                        <BodySmall bold style={{ width: 100 }}>Finish Date</BodySmall>
                        <BodySmall>: </BodySmall>
                        <BodySmall>{!item.FINISH_BOOKING ? '-' : moment(item.FINISH_BOOKING).format('DD MMMM YYYY')}</BodySmall>
                      </View>
                      <View style={{ flexDirection: 'row', marginVertical: 2, paddingRight: 120 }}>
                        <BodySmall bold style={{ width: 100 }}>Tujuan/Vessel</BodySmall>
                        <BodySmall>: </BodySmall>
                        <BodySmall>{item.VESSEL}</BodySmall>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center', marginRight: 5 }}>
                          <Body>{item.START_TIME < 10 ? `0${item.START_TIME}:00` : `${item.START_TIME}:00`}</Body>
                          <View style={{ backgroundColor: COLOR_TRANSPARENT_DARK, padding: 5, marginTop: 8, borderRadius: 10 }}>
                            <BodyExtraSmall bold >START</BodyExtraSmall>
                          </View>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                          <View style={styles.line} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                          <View
                            style={{
                              height: 1,
                              backgroundColor: COLOR_BLACK,
                            }} />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
                          <BodySmall>{item.PROCESS_TIME} hour</BodySmall>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                          <View
                            style={{
                              height: 1,
                              backgroundColor: COLOR_BLACK,
                            }} />
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                          <View
                            style={styles.line} />
                        </View>
                        <View style={{ alignItems: 'center', marginLeft: 5 }}>
                          <Body>{item.FINISH_TIME < 10 ? `0${item.FINISH_TIME}:00` : `${item.FINISH_TIME}:00`}</Body>
                          <View style={{ backgroundColor: COLOR_TRANSPARENT_DARK, padding: 5, marginTop: 8, borderRadius: 10 }}>
                            <BodyExtraSmall bold >FINISH</BodyExtraSmall>
                          </View>
                        </View>
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
      <MyModal isVisible={modalmonthDate} closeModal={() => setModalmonthDate(!modalmonthDate)}>
        <View style={{ maxHeight: '100%', paddingVertical: 20, paddingHorizontal: 25 }}>
          <CalendarMonth
            value={monthDate}
            onChangeDateStart={setmonthDate}
            onChangeDateFinish={setyearDate}
            activeFilter={setMonthDateActive}
            setDateBy={setDateBy}
            changeAnotherFilter={setyearDateActive}
            closeDate={() => setModalmonthDate(!modalmonthDate)}
          />
        </View>
      </MyModal>
      <MyModal isVisible={modalyearDate} closeModal={() => setModalyearDate(!modalyearDate)}>
        <View style={{ maxHeight: '100%', paddingVertical: 20, paddingHorizontal: 25 }}>
          <CalendarYear
            value={monthDate}
            onChangeDateStart={setmonthDate}
            onChangeDateFinish={setyearDate}
            activeFilter={setyearDateActive}
            setDateBy={setDateBy}
            changeAnotherFilter={setMonthDateActive}
            closeDate={() => setModalyearDate(!modalyearDate)}
          />
        </View>
      </MyModal>
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
    </BaseScreen>
  )
}

export default BargingRecapitulation

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: COLOR_TRANSPARENT_DARK,
    marginTop: 5,
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