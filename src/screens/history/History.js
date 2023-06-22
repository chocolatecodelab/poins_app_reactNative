import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { BaseScreen, H1, SearchBar, BodyLarge, Body, BodyExtraSmall } from "../../components";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_TRANSPARENT_DISABLED, COLOR_WHITE } from '../../tools/constant';
import moment from 'moment';
import { ios } from '../../tools/helper';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '70%' }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const History = ({ userId, listHistory, onAppear, isLoading }) => {
  // const [searchBarText, setSearchBarText] = useState('');
  // const [changeFilter, setChangeFilter] = useState('Today')
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
                <View style={styles.card}>
                  <BodyLarge bold style={{ color: COLOR_PRIMARY }}>{item.COMPANY}</BodyLarge>
                  <Body style={{ color: COLOR_DISABLED }} >
                    {moment(item.date).format('DD MMMM YYYY')}
                  </Body>
                  <View style={{ marginTop: 10, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                      <Body bold style={{ width: 100 }}>Jetty</Body>
                      <Body >: </Body>
                      <Body>{item.JETTY}</Body>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                      <Body bold style={{ width: 100 }}>Tug Boat</Body>
                      <Body >: </Body>
                      <Body>{item.TUG_BOAT}</Body>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                      <Body bold style={{ width: 100 }}>Barge</Body>
                      <Body >: </Body>
                      <Body>{item.BARGE}</Body>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                      <Body bold style={{ width: 100 }}>Booking Date</Body>
                      <Body >: </Body>
                      <Body>{moment(item.DATE_BOOKING).format('DD MMMM YYYY')}</Body>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                      <Body bold style={{ width: 100 }}>Finish Date</Body>
                      <Body >: </Body>
                      <Body>{!item.FINISH_BOOKING ? '-' : moment(item.FINISH_BOOKING).format('DD MMMM YYYY')}</Body>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 2, paddingRight: 120 }}>
                      <Body bold style={{ width: 100 }}>Tujuan/Vessel</Body>
                      <Body >: </Body>
                      <Body>{item.VESSEL}</Body>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                      <View style={{ alignItems: 'center', marginRight: 5 }}>
                        <BodyLarge>{item.START_TIME < 10 ? `0${item.START_TIME}:00` : `${item.START_TIME}:00`}</BodyLarge>
                        <View style={{ backgroundColor: COLOR_TRANSPARENT_DARK, padding: 5, marginTop: 8, borderRadius: 10 }}>
                          <BodyExtraSmall bold >START</BodyExtraSmall>
                        </View>
                      </View>
                      <View style={{ justifyContent: 'center' }}>
                        <View
                          style={{
                            height: 8,
                            width: 8,
                            borderRadius: 8,
                            backgroundColor: COLOR_DISABLED,
                          }} />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: '#000',
                          }} />
                      </View>
                      <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
                        <Body>{item.PROCESS_TIME} hour</Body>
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
                          style={{
                            height: 8,
                            width: 8,
                            borderRadius: 8,
                            backgroundColor: COLOR_DISABLED,
                          }} />
                      </View>
                      <View style={{ alignItems: 'center', marginLeft: 5 }}>
                        <BodyLarge>{item.FINISH_TIME < 10 ? `0${item.FINISH_TIME}:00` : `${item.FINISH_TIME}:00`}</BodyLarge>
                        <View style={{ backgroundColor: COLOR_TRANSPARENT_DARK, padding: 5, marginTop: 8, borderRadius: 10 }}>
                          <BodyExtraSmall bold >Finish</BodyExtraSmall>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
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
  }
})