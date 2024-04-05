import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BaseScreen, Body, BodySmall, HorizontalLine, MyHeader, MyModal, SearchBar, DividerLine } from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_BLACK, COLOR_DISABLED, COLOR_GRAY_1, COLOR_GRAY_2, COLOR_HORIZONTAL_LINE, COLOR_MAIN_SECONDARY, COLOR_MEDIUM_BLACK, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE, FONT_POPPINS_REGULAR } from '../../tools/constant';
import { iPad, ios, iconTools } from '../../tools/helper';
import { ActivityIndicator, Badge } from 'react-native-paper';
import moment from 'moment';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 200 }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const HistoryBarging = ({
  userId, listHistoryBarging, onAppear, isLoading
}) => {
  // State untuk filter dan pencarian
  const [search, setSearch] = useState('');
  const [dropdownActive, setDropdownActive] = useState(false); // State untuk mengatur dropdown aktif atau tidak
  const [selected, setSelectedOption] = useState('');


  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  // Menghitung jumlah kemunculan setiap status
  const statusCount = listHistoryBarging.reduce((acc, item) => {
    const status = item.STATUS;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Mengubah objek hasil perhitungan menjadi array yang dapat digunakan untuk Dropdown
  const dropdownData = Object.keys(statusCount).map(status => ({ name: status, count: statusCount[status] }));

  // Menghitung jumlah keseluruhan kemunculan status
  const totalStatusCount = Object.values(statusCount).reduce((total, count) => total + count, 0);

  // Memformat tanggal menggunakan moment.js
  const formattedData = listHistoryBarging.map(item => {
    let formattedDateBooking = moment(item.DATE_BOOKING).format('MMMM D, YYYY');
    let formattedDateFinish = moment(item.FINISH_BOOKING, moment.ISO_8601, true).isValid()
      ? moment(item.FINISH_BOOKING).format('MMMM D, YYYY')
      : ""; // Jika tanggal tidak valid, kembalikan nilai kosong
    return { ...item, DATE_BOOKING: formattedDateBooking, FINISH_BOOKING: formattedDateFinish };
  });

  // Fungsi untuk memfilter data berdasarkan pencarian (case insensitive)
  const filteredData = formattedData.filter(item =>
    (typeof item.ID === 'string' && item.ID.toLowerCase().includes(search.toLowerCase())) ||
    (typeof item.JETTY === 'string' && item.JETTY.toLowerCase().includes(search.toLowerCase())) ||
    (typeof item.TUG_BOAT === 'string' && item.TUG_BOAT.toLowerCase().includes(search.toLowerCase())) ||
    (typeof item.BARGE === 'string' && item.BARGE.toLowerCase().includes(search.toLowerCase())) ||
    (typeof item.CAPACITY === 'string' && item.CAPACITY.toLowerCase().includes(search.toLowerCase())) ||
    (typeof item.VESSEL === 'string' && item.VESSEL.toLowerCase().includes(search.toLowerCase())) ||
    (typeof item.STATUS === 'string' && item.STATUS.toLowerCase().includes(search.toLowerCase())) ||
    (typeof item.DATE_BOOKING === 'string' && item.DATE_BOOKING.toLowerCase().includes(search.toLowerCase())) ||
    (typeof item.FINISH_BOOKING === 'string' && item.FINISH_BOOKING.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    onAppear(userId)
  }, [])

  return (
    <BaseScreen
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}
      translucent containerStyle={{ paddingTop: iPad ? 10 : ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
    >
      <MyHeader pageTitle='Barging History' backButton />
      <View style={styles.container}>

        {/* Pencarian */}
        <View style={styles.contentItem}>
          <SearchBar
            containerStyle={[styles.menuButton]}
            activeIcon={false}
            iconSearch={"right"}
            placeholder={"Search "}
            value={search}
            onTextChanged={text => setSearch(text)}
          />

          {/* filter */}
          <TouchableOpacity onPress={toggleDropdown}>
            <iconTools.MaterialIcons
              name={"menu"}
              size={iPad ? 45 : 30}
              style={{ borderRadius: 24, padding: 8, backgroundColor: COLOR_TRANSPARENT_DARK, borderColor: COLOR_PRIMARY }}
            />
            {totalStatusCount !== 0 &&
              <View style={[styles.badge, {
                borderRadius: 23,
                width: 24,
                height: 24,
              }]}>
                {iPad ?
                  <Body bold style={{ color: COLOR_WHITE }}><Text style={{ fontSize: 12 }}>{totalStatusCount}</Text></Body> :
                  <BodySmall bold style={{ color: COLOR_WHITE }}><Text style={{ fontSize: 10 }}>{totalStatusCount}</Text></BodySmall>
                }
              </View>
            }
          </TouchableOpacity>
        </View>

        {/* dropdown */}
        <MyModal
          isVisible={dropdownActive}
          headerActive={true}
          headerTitle={"List History Request Progress"}
          closeModal={toggleDropdown}
        >
          <FlatList
            data={dropdownData}
            showsVerticalScrollIndicator={false}
            style={{ width: '100%' }}
            keyExtractor={(_, index) => index}
            renderItem={({ item, index }) => {
              const lastIndex = dropdownData?.length - 1;
              return (
                <View>
                  <TouchableOpacity
                    style={{ marginVertical: 10 }}
                    onPress={() => [toggleDropdown(), setSelectedOption(item.name), setSearch(item.name)]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Body style={{ color: COLOR_BLACK, textAlign: 'center' }}>
                        {item.name}
                      </Body>
                      <Badge>{item.count}</Badge>
                    </View>
                  </TouchableOpacity>
                  {index !== lastIndex && <HorizontalLine width={'100%'} />}
                </View>
              )
            }}
            ListEmptyComponent={renderEmptyComponent}
          />
        </MyModal>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.ID}
          renderItem={({ item, index }) => (
            <View style={styles.containerItem}>
              <View style={styles.cardContainer}>
                <View style={styles.row}>
                  <View>
                    <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>ID Pemesanan</Text>
                    <View style={{ flexDirection: "row" }}>
                      <MaterialCommunityIcons name={"identifier"} size={18} color={COLOR_PRIMARY} />
                      <Text style={{ marginLeft: 5 }}>{item.ID}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Start - Finish Date </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.DATE_BOOKING}</Text>
                      <Text style={{ marginRight: 5 }}>{item.DATE_FINISH}</Text>
                      <MaterialCommunityIcons name={"clock-time-five"} size={18} color={COLOR_PRIMARY} />
                    </View>
                  </View>
                </View>
                <DividerLine width={"95%"} />
                <View style={styles.row}>
                  <View>
                    <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>Jenis</Text>
                    <View style={{ flexDirection: "row" }}>
                      <MaterialIcons name={"directions-boat"} size={18} color={COLOR_PRIMARY} />
                      <Text style={{ marginLeft: 5, fontSize: 11 }}>Jetty {item.JETTY}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Barge Ship</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.BARGE}</Text>
                      <Text style={{ marginRight: 5 }}>{item.DATE_FINISH}</Text>
                      <MaterialCommunityIcons name={"sail-boat"} size={18} color={COLOR_PRIMARY} />
                    </View>
                  </View>
                </View>
                <DividerLine width={"95%"} />
                <View style={styles.row}>
                  <View>
                    <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>Tugboat </Text>
                    <View style={{ flexDirection: "row" }}>
                      <FontAwesomeIcons name={"ship"} size={18} color={COLOR_PRIMARY} style={{ marginTop: 2 }} />
                      <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.TUG_BOAT}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Capacity </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ marginRight: 5, fontSize: 11 }}>{item.CAPACITY}</Text>
                      <MaterialCommunityIcons name={"weight"} size={18} color={COLOR_PRIMARY} />

                    </View>
                  </View>
                </View>
                <DividerLine width={"95%"} />
                <View style={styles.card}>
                  <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>Destination </Text>
                  <Text>
                    {item.VESSEL}
                  </Text>
                </View>
                <View style={styles.row}>
                  <View>
                    <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>Reported by </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <MaterialCommunityIcons name={"account"} size={18} color={COLOR_PRIMARY} style={{ marginTop: 2 }} />
                      <Text style={{ marginLeft: 5, fontSize: 11 }}>Admin</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right', marginTop:5 }}>Status</Text>
                    <View style={[styles.card, { alignItems:"center" , backgroundColor: item.STATUS === 'Diterima' || item.STATUS === "Selesai" ? 'green' : item.STATUS === 'Ditolak' ? 'red' : 'grey' }]}>
                      <Text style={{ color: COLOR_WHITE, textAlign: "center" }}>{item.STATUS}</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Message</Text>
                    <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.STATUS === "Selesai" ? "Pesanan telah selesai" : item.STATUS === "Ditolak" ? "Jadwal pesanan tabrakan" : item.STATUS === "Diterima" ? "Pesanan telah diterima" : item.STATUS === "Progress" ? "Pesanan sedang ditinjau admin" : "Mohon ditunggu"}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        >

        </FlatList>



        {/* Tabel */}
        {/* <View style={styles.container}> */}
        {/* <ScrollView horizontal>
            <View style={styles.listContainer}>
              <View style={styles.header}>
                <Text style={[styles.headerText, { width: 50, textAlign: 'center' }]}>No.</Text>
                <Text style={[styles.headerText, { width: 50, textAlign: 'center' }]}>ID</Text>
                <Text style={[styles.headerText, { width: 120, textAlign: 'center' }]}>Jetty</Text>
                <Text style={[styles.headerText, { width: 120, textAlign: 'center' }]}>Tugboat</Text>
                <Text style={[styles.headerText, { width: 120, textAlign: 'center' }]}>Barge Ship</Text>
                <Text style={[styles.headerText, { width: 120, textAlign: 'center' }]}>Capacity</Text>
                <Text style={[styles.headerText, { width: 120, textAlign: 'center' }]}>Destination</Text>
                <Text style={[styles.headerText, { width: 120, textAlign: 'center' }]}>Date Start</Text>
                <Text style={[styles.headerText, { width: 120, textAlign: 'center' }]}>Date Finish</Text>
                <Text style={[styles.headerText, { width: 120, textAlign: 'center' }]}>Proses</Text>
                <Text style={[styles.headerText, { width: 120, textAlign: 'center' }]}>Message</Text>
              </View> */}

        {/* isi tabel */}
        {/* {!isLoading ?
                <FlatList
                  data={filteredData}
                  keyExtractor={(item) => item.ID}
                  renderItem={({ item, index }) => (
                    <View style={styles.row}>
                      <Text style={[styles.cell, { width: 50, }]}>{index + 1}</Text>
                      <Text style={[styles.cell, { width: 50, }]}>{item.ID}</Text>
                      <Text style={[styles.cell, { width: 120, textAlign: 'center' }]}>{item.JETTY}</Text>
                      <Text style={[styles.cell, { width: 120, textAlign: 'center' }]}>{item.TUG_BOAT}</Text>
                      <Text style={[styles.cell, { width: 120, textAlign: 'center' }]}>{item.BARGE}</Text>
                      <Text style={[styles.cell, { 
                        width: 120, textAlign: 'center' }]}>{item.CAPACITY}</Text>
                      <Text style={[styles.cell, { width: 120, textAlign: 'center' }]}>{item.VESSEL}</Text>
                      <Text style={[styles.cell, { width: 120, textAlign: 'center' }]}>{item.DATE_BOOKING}</Text>
                      <Text style={[styles.cell, { width: 120, textAlign: 'center' }]}>{item.FINISH_BOOKING}</Text>
                      <View style={[styles.cell, { width: 120, textAlign: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                        <MaterialIcons name={item.STATUS === 'Selesai' || item.STATUS === "Diterima" ? "check-circle" : item.STATUS === 'Ditolak' ? "close" : "pending"} size={20} color={item.STATUS === 'Selesai' ? 'green' : item.STATUS === 'Ditolak' ? 'red' : 'orange'} />
                        <Text style={{ marginLeft: 5 }}>{item.STATUS}</Text>
                      </View>
                      <Text style={[styles.cell, { width: 120, textAlign: 'center' }]}>
                        {item.STATUS === "Selesai" ? "Sedang berjalan" : item.STATUS === "Ditolak" ? "Jadwal tabrakan" : "Mohon ditunggu"}
                      </Text>
                    </View>
                  )}
                /> :
                <View style={{ height: '40%', justifyContent: 'center' }} >
                  <ActivityIndicator size='large' color={COLOR_PRIMARY} />
                </View>
              } */}
        {/* </View>
          </ScrollView> */}
        {/* </View> */}
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    paddingVertical: 30,
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
    marginBottom:15,
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
  }
});

export default HistoryBarging;

