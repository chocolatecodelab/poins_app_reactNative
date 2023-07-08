import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { BaseScreen, Button, BodyLarge, Body, BodySmall, BodyExtraSmall, MyHeader, DatePicker, MyModal } from "../../components";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_TRANSPARENT_DISABLED, COLOR_WHITE } from '../../tools/constant';
import moment from 'moment';
import { ios } from '../../tools/helper';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const BargingRecapitulation = ({ userId, listHistory, onAppear, isLoading, onDetailPressed }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())
  const [modalStartDate, setModalStartDate] = useState(false)
  const [modalFinishDate, setModalFinishDate] = useState(false)
  useEffect(() => { onAppear(userId, startDate, finishDate) }, [startDate, finishDate])

  return (
    <BaseScreen
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}
      translucent
      containerStyle={{ paddingTop: ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
    >
      <MyHeader
        pageTitle='Barging Recapitulation'
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
                </TouchableOpacity>
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
  line: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLOR_DISABLED,
  }
})