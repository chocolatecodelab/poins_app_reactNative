import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BaseScreen, BodyLarge, Body, MyHeader, DatePicker, MyModal } from "../../components";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_GRAY_1, COLOR_GRAY_2, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE } from '../../tools/constant';
import moment from 'moment';
import { ios, iconTools, iPad } from '../../tools/helper';
import { Text } from 'react-native';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const BargingSchedule = ({ companyUserId, listHistory, onAppear, isLoading, onExpandPressed }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())
  const [modalStartDate, setModalStartDate] = useState(false)
  const [modalFinishDate, setModalFinishDate] = useState(false)

  useEffect(() => { 
  onAppear(companyUserId, startDate, finishDate) 
}, [startDate, finishDate])
  return (
    <BaseScreen
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}
      translucent
      containerStyle={{ paddingTop: iPad ? 10 : ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
    >
      <MyHeader
        pageTitle='Barging Schedule'
        backButton
      />
      <View style={{ paddingHorizontal: 25, }}>
        <View style={{ marginTop: 15, flexDirection: "row", justifyContent: "space-evenly", borderBottomWidth: 1, borderBottomColor: COLOR_DISABLED, paddingBottom: 15 }}>
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
        <FlatList
          contentContainerStyle={{ justifyContent: 'center', paddingBottom: 250, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
          data={listHistory}
          keyExtractor={(item, index) => item.Data.ID}
          refreshing={isLoading}
          // onRefresh={() => onAppear(companyUserId)}
          renderItem={({ item, index }) => {
            return (
              <Fragment>
                <View
                  style={{
                    backgroundColor: COLOR_WHITE,
                    borderWidth: 1,
                    borderColor: COLOR_TRANSPARENT_DARK,
                    marginBottom: 15,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-between',
                      padding: 10,
                      backgroundColor: COLOR_TRANSPARENT_DARK,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8
                    }}>
                    <MaterialCommunityIcons name={"clock-time-eight-outline"} size={18} color={COLOR_PRIMARY} style={{ marginHorizontal: 5 }} />
                    <Text style={{ fontWeight: "500" }}>{moment(item.Date).format('DD MMMM YYYY')}</Text>
                  </View>
                  {item.Data.map((x) => {

                    // Mengubah Finish Date jika invalid date
                    let formattedDateFinish = moment(x.FINISH_BOOKING, moment.ISO_8601, true).isValid()
                      ? moment(item.FINISH_BOOKING).format('MMMM D, YYYY')
                      : ""; // Jika tanggal tidak valid, kembalikan nilai kosong
                    if (formattedDateFinish == "") {
                      x = { ...x, FINISH_BOOKING: x.DATE_BOOKING }
                    }
                    // PEMBUATAN WARNA
                    const letters = '0123456789ABCDEF';
                    let color = '#';
                    for (let i = 0; i < 6; i++) {
                      color += letters[Math.floor(Math.random() * 18)];
                    }
                    return (
                      <>
                        <TouchableOpacity
                          key={x.ID}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            borderBottomWidth: 1,
                            borderColor: COLOR_TRANSPARENT_DARK
                          }}
                          onPress={() => { onExpandPressed(x.ID, listHistory) }}>
                          <View style={{ backgroundColor: x.COLOR, borderRadius: 50, height: 10, width: 10, marginRight: 10 }} />
                          <Body style={{ flex: 1, fontWeight: '400' }}>{x.CUSTOMER} - {x.NAMA}</Body>
                          <iconTools.MaterialIcons
                            name={!x.SHOW_DETAIL ? 'expand-more' : 'expand-less'}
                            size={25}
                            color={COLOR_DISABLED}
                          />
                        </TouchableOpacity>
                        {x.SHOW_DETAIL &&
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderColor: COLOR_TRANSPARENT_DARK,
                              // paddingVertical: 10,
                              // paddingHorizontal: 13,
                              // flexDirection: 'row',
                              justifyContent: 'space-between'
                            }}>
                            <View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, }}>
                                <View style={{ flex: 0.35, borderColor: COLOR_TRANSPARENT_DARK, paddingVertical: 2 }}>
                                  <Body>Jetty</Body>
                                </View>
                                <View style={{ borderWidth: 0.7, borderColor: COLOR_TRANSPARENT_DARK, height: '100%' }} />
                                <View style={{ flex: 0.63, alignItems: 'flex-end', paddingLeft: 10, paddingVertical: 2 }}>
                                  <Body style={{ textAlign: 'right' }}>{x.JETTY}</Body>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, }}>
                                <View style={{ flex: 0.35, borderColor: COLOR_TRANSPARENT_DARK, paddingVertical: 2 }}>
                                  <Body>Tug Boat</Body>
                                </View>
                                <View style={{ borderWidth: 0.7, borderColor: COLOR_TRANSPARENT_DARK, height: '100%' }} />
                                <View style={{ flex: 0.63, alignItems: 'flex-end', paddingLeft: 10, paddingVertical: 2 }}>
                                  <Body style={{ textAlign: 'right' }}>{x.TUG_BOAT}</Body>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, }}>
                                <View style={{ flex: 0.35, borderColor: COLOR_TRANSPARENT_DARK, paddingVertical: 2 }}>
                                  <Body>Barge</Body>
                                </View>
                                <View style={{ borderWidth: 0.7, borderColor: COLOR_TRANSPARENT_DARK, height: '100%' }} />
                                <View style={{ flex: 0.63, alignItems: 'flex-end', paddingLeft: 10, paddingVertical: 2 }}>
                                  <Body style={{ textAlign: 'right' }}>{x.BARGE}</Body>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, }}>
                                <View style={{ flex: 0.35, borderColor: COLOR_TRANSPARENT_DARK, paddingVertical: 2 }}>
                                  <Body>Capacity</Body>
                                </View>
                                <View style={{ borderWidth: 0.7, borderColor: COLOR_TRANSPARENT_DARK, height: '100%' }} />
                                <View style={{ flex: 0.63, alignItems: 'flex-end', paddingLeft: 10, paddingVertical: 2 }}>
                                  <Body style={{ textAlign: 'right' }}>{x.CAPACITY}</Body>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, }}>
                                <View style={{ flex: 0.35, borderColor: COLOR_TRANSPARENT_DARK, paddingVertical: 2 }}>
                                  <Body>Start Date</Body>
                                </View>
                                <View style={{ borderWidth: 0.7, borderColor: COLOR_TRANSPARENT_DARK, height: '100%' }} />
                                <View style={{ flex: 0.63, alignItems: 'flex-end', paddingLeft: 10, paddingVertical: 2 }}>
                                  <Body style={{ textAlign: 'right' }}>{moment(x.DATE_BOOKING).format('DD MMMM YYYY')}</Body>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, }}>
                                <View style={{ flex: 0.35, borderColor: COLOR_TRANSPARENT_DARK, paddingVertical: 2 }}>
                                  <Body>Start Time</Body>
                                </View>
                                <View style={{ borderWidth: 0.7, borderColor: COLOR_TRANSPARENT_DARK, height: '100%' }} />
                                <View style={{ flex: 0.63, alignItems: 'flex-end', paddingLeft: 10, paddingVertical: 2 }}>
                                  <Body style={{ textAlign: 'right' }}>{x.START_TIME < 10 ? `0${x.START_TIME}:00` : `${x.START_TIME}:00`}</Body>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, }}>
                                <View style={{ flex: 0.35, borderColor: COLOR_TRANSPARENT_DARK, paddingVertical: 2 }}>
                                  <Body>Finish Date</Body>
                                </View>
                                <View style={{ borderWidth: 0.7, borderColor: COLOR_TRANSPARENT_DARK, height: '100%' }} />
                                <View style={{ flex: 0.63, alignItems: 'flex-end', paddingLeft: 10, paddingVertical: 2 }}>
                                  <Body style={{ textAlign: 'right' }}>{moment(x.FINISH_BOOKING).format('DD MMMM YYYY')}</Body>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, }}>
                                <View style={{ flex: 0.35, borderColor: COLOR_TRANSPARENT_DARK, paddingVertical: 2 }}>
                                  <Body>Finish Time</Body>
                                </View>
                                <View style={{ borderWidth: 0.7, borderColor: COLOR_TRANSPARENT_DARK, height: '100%' }} />
                                <View style={{ flex: 0.63, alignItems: 'flex-end', paddingLeft: 10, paddingVertical: 2 }}>
                                  <Body style={{ textAlign: 'right' }}>{x.FINISH_TIME < 10 ? `0${x.FINISH_TIME}:00` : `${x.FINISH_TIME}:00`}</Body>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, }}>
                                <View style={{ flex: 0.35, borderColor: COLOR_TRANSPARENT_DARK, paddingVertical: 2 }}>
                                  <Body>Vessel</Body>
                                </View>
                                <View style={{ borderWidth: 0.7, borderColor: COLOR_TRANSPARENT_DARK, height: '100%' }} />
                                <View style={{ flex: 0.63, alignItems: 'flex-end', paddingLeft: 10, paddingVertical: 2 }}>
                                  <Body style={{ textAlign: 'right' }}>{x.VESSEL}</Body>
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, }}>
                                <View style={{ flex: 0.35, borderColor: COLOR_TRANSPARENT_DARK, paddingVertical: 2 }}>
                                  <Body>Status</Body>
                                </View>
                                <View style={{ borderWidth: 0.7, borderColor: COLOR_TRANSPARENT_DARK, height: '100%' }} />
                                <View style={{ flex: 0.63, alignItems: 'flex-end', paddingLeft: 10, paddingVertical: 2 }}>
                                  <Body style={{ textAlign: 'right' }}>{x.STATUS}</Body>
                                </View>
                              </View>
                            </View>
                          </View>
                        }
                      </>
                    )
                  })}

                </View>

              </Fragment>
            )
          }}
          ListEmptyComponent={renderEmptyComponent}
        />
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
    </BaseScreen>
  )
}

export default BargingSchedule

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
  line: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLOR_DISABLED,
  }
})