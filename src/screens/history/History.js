import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { BaseScreen, H1, SearchBar, BodyLarge, Body, BodySmall, BodyExtraSmall } from "../../components";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_TRANSPARENT_DISABLED, COLOR_WHITE } from '../../tools/constant';
import moment from 'moment';
import { ios } from '../../tools/helper';
import PageHeader from '../../components/header/Header';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const History = ({ userId, listHistory, onAppear, isLoading, onDetailPressed }) => {
  // const [searchBarText, setSearchBarText] = useState('');
  // const [changeFilter, setChangeFilter] = useState('Today')
  // console.log('history', listHistory);
  useEffect(() => {
    onAppear(userId)
  }, [])
  return (
    <BaseScreen barBackgroundColor={COLOR_WHITE} contentStyle={{ paddingHorizontal: 20, paddingTop: ios ? 20 : 0 }}>
      <H1 bold style={{ color: COLOR_PRIMARY, alignSelf: 'center', marginBottom: 20 }}>History Booking</H1>
      {/* <View style={styles.filterSearchContainer}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: changeFilter === "Today" ? COLOR_WHITE : COLOR_TRANSPARENT_DISABLED }]}
            onPress={() => setChangeFilter('Today')}>
            <Body style={{ color: changeFilter === "Today" ? COLOR_PRIMARY : COLOR_DISABLED, fontWeight: '500' }}>Today</Body>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: changeFilter === "Week" ? COLOR_WHITE : COLOR_TRANSPARENT_DISABLED }]}
            onPress={() => setChangeFilter('Week')}>
            <Body style={{ color: changeFilter === "Week" ? COLOR_PRIMARY : COLOR_DISABLED, fontWeight: '500' }}>Week</Body>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: changeFilter === "Month" ? COLOR_WHITE : COLOR_TRANSPARENT_DISABLED }]}
            onPress={() => setChangeFilter('Month')}>
            <Body style={{ color: changeFilter === "Month" ? COLOR_PRIMARY : COLOR_DISABLED, fontWeight: '500' }}>Month</Body>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: changeFilter === "Year" ? COLOR_WHITE : COLOR_TRANSPARENT_DISABLED }]}
            onPress={() => setChangeFilter('Year')}>
            <Body style={{ color: changeFilter === "Year" ? COLOR_PRIMARY : COLOR_DISABLED, fontWeight: '500' }}>Year</Body>
          </TouchableOpacity>
        </View>
        <SearchBar
          placeholder={"Search company"}
          activeIcon={true}
          onTextChanged={(e) => setSearchBarText(e)}
          onDeletePressed={() => setSearchBarText('')}
        />
      </View> */}
      <View>
        <FlatList
          contentContainerStyle={{ justifyContent: 'center', paddingBottom: 200 }}
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
                            backgroundColor: '#000',
                          }} />
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
                        <BodySmall>{item.PROCESS_TIME} hour</BodySmall>
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: '#000',
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
    </BaseScreen>
  )
}

export default History

const styles = StyleSheet.create({
  filterSearchContainer: {
    marginVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLOR_TRANSPARENT_DISABLED,
    borderRadius: 50,
    width: '100%',
    height: 40,
    marginTop: 5,
    marginBottom: 10
  },
  filterButton: {
    alignItems: 'center',
    paddingVertical: 7,
    width: '20%',
    borderRadius: 50
  },
  card: {
    borderWidth: 1,
    borderColor: COLOR_PRIMARY,
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: COLOR_WHITE,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
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