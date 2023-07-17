import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { BaseScreen, Button, BodyLarge, Body, BodySmall, BodyExtraSmall, MyHeader, DatePicker, MyModal } from "../../components";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_TRANSPARENT_DISABLED, COLOR_WHITE } from '../../tools/constant';
import moment from 'moment';
import { ios, iconTools } from '../../tools/helper';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const BargingSchedule = ({ userId, listHistory, onAppear, isLoading, onExpandPressed }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())
  const [modalStartDate, setModalStartDate] = useState(false)
  const [modalFinishDate, setModalFinishDate] = useState(false)
  const [detail, setDetail] = useState(false)
  useEffect(() => { onAppear(userId, startDate, finishDate) }, [startDate, finishDate])
  console.log('HISTORY', listHistory);
  return (
    <BaseScreen
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}
      translucent
      containerStyle={{ paddingTop: ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
    >
      <MyHeader
        pageTitle='Barging Schedule'
        backButton
      />
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ width: '100%', marginTop: 15 }}>
          <Body>Start date</Body>
          <TouchableOpacity style={{
            backgroundColor: COLOR_WHITE,
            borderBottomWidth: 1,
            borderColor: COLOR_TRANSPARENT_DARK,
            marginBottom: 15,
            paddingVertical: 5,
            paddingLeft: 5
          }}
            onPress={() => setModalStartDate(!modalStartDate)}>
            <Body bold>{moment(startDate).format('DD MMMM YYYY')}</Body>
          </TouchableOpacity>
          <Body>Finish date</Body>
          <TouchableOpacity style={{
            backgroundColor: COLOR_WHITE,
            borderBottomWidth: 1,
            borderColor: COLOR_TRANSPARENT_DARK,
            marginBottom: 15,
            paddingVertical: 5,
            paddingLeft: 5
          }}
            onPress={() => setModalFinishDate(!modalFinishDate)}>
            <Body bold>{moment(finishDate).format('DD MMMM YYYY')}</Body>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={{ justifyContent: 'center', paddingBottom: 250, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
          data={listHistory}
          keyExtractor={(item) => item}
          refreshing={isLoading}
          // onRefresh={() => onAppear(userId)}
          renderItem={({ item, index }) => {
            return (
              <Fragment>
                {/* <TouchableOpacity style={styles.card} onPress={onDetailPressed}>
                  <Body bold style={{ color: COLOR_PRIMARY }}>{item.COMPANY}</Body>
                  <BodySmall style={{ color: COLOR_DISABLED }} >
                    {moment(item.date).format('DD MMMM YYYY')}
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
                </TouchableOpacity> */}
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
                      justifyContent: 'space-between',
                      padding: 10,
                      backgroundColor: COLOR_TRANSPARENT_DARK,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8
                    }}>
                    <Body bold>{moment(item.Date).format('DD MMMM YYYY')}</Body>
                    <Body bold></Body>
                  </View>
                  {item.Data.map((x) => {
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
                          <Body style={{ flex: 1, fontWeight: '500' }}>{x.CUSTOMER} - {x.NAMA}</Body>
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
                                  <Body style={{ textAlign: 'right' }}>{moment(x.START_BOOKING).format('DD MMMM YYYY')}</Body>
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
                              {/* <View style={{ paddingLeft: 10, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK }}>
                                <Body>Tug Boat</Body>
                              </View>
                              <View style={{ paddingLeft: 10, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK }}>
                                <Body>Barge</Body>
                              </View>
                              <View style={{ paddingLeft: 10, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK }}>
                                <Body>Capacity</Body>
                              </View>
                              <View style={{ paddingLeft: 10, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK }}>
                                <Body>Start Date</Body>
                              </View>
                              <View style={{ paddingLeft: 10, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK }}>
                                <Body>Finish Date</Body>
                              </View>
                              <View style={{ paddingLeft: 10, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK }}>
                                <Body>Vessel</Body>
                              </View>
                              <View style={{ paddingLeft: 10, paddingVertical: 2, borderColor: COLOR_TRANSPARENT_DARK }}>
                                <Body>Status</Body>
                              </View> */}
                            </View>
                            {/* <View style={{ flex: 0.65 }}>
                              <View style={{ paddingRight: 15, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, width: '100%', alignItems: 'flex-end' }}>
                                <Body>{x.JETTY}</Body>
                              </View>
                              <View style={{ paddingRight: 15, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, width: '100%', alignItems: 'flex-end' }}>
                                <Body>{x.TUG_BOAT} sadasdasdas</Body>
                              </View>
                              <View style={{ paddingRight: 15, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, width: '100%', alignItems: 'flex-end' }}>
                                <Body>{x.BARGE}</Body>
                              </View>
                              <View style={{ paddingRight: 15, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, width: '100%', alignItems: 'flex-end' }}>
                                <Body>{x.CAPACITY}</Body>
                              </View>
                              <View style={{ paddingRight: 15, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, width: '100%', alignItems: 'flex-end' }}>
                                <Body>{moment(x.DATE_BOOKING).format('DD MMMM YYYY')}</Body>
                              </View>
                              <View style={{ paddingRight: 15, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, width: '100%', alignItems: 'flex-end' }}>
                                <Body>{moment(x.FINISH_BOOKING).format('DD MMMM YYYY')}</Body>
                              </View>
                              <View style={{ paddingRight: 15, paddingVertical: 2, borderBottomWidth: 1, borderColor: COLOR_TRANSPARENT_DARK, width: '100%', alignItems: 'flex-end' }}>
                                <Body>{x.VESSEL}</Body>
                              </View>
                              <View style={{ paddingRight: 15, paddingVertical: 2, borderColor: COLOR_TRANSPARENT_DARK, width: '100%', alignItems: 'flex-end' }}>
                                <Body>{x.STATUS}</Body>
                              </View>
                            </View> */}
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Body>Jetty:</Body>
                              <Body>{x.JETTY}</Body>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Body>Start Date:</Body>
                              <Body>{moment(x.DATE_BOOKING).format('DD MMMM YYYY')}</Body>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Body>Finish Date:</Body>
                              <Body>{moment(x.FINISH_BOOKING).format('DD MMMM YYYY')}</Body>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Body>Tug Boat:</Body>
                              <Body>{x.TUG_BOAT}</Body>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Body>Barge:</Body>
                              <Body>{x.BARGE}</Body>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Body>Capacity:</Body>
                              <Body>{x.CAPACITY}</Body>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Body>Vessel:</Body>
                              <Body>{x.VESSEL}</Body>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Body>Status:</Body>
                              <Body>{x.STATUS}</Body>
                            </View> */}
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