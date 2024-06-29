import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { BaseScreen, Body, BodySmall, HorizontalLine, MyHeader, MyModal, SearchBar, DividerLine, BodyLarge, Dropdown } from '../../components';
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
  companyUserId, listHistoryBarging, onAppear, isLoading, customers
}) => {
  // State untuk filter dan pencarian
  const [search, setSearch] = useState('');
  const [dropdownActive, setDropdownActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [companyId, setCompanyId] = useState(0);
  const [company, setCompany] = useState('')
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [customerCompany, setCustomersCompany] = useState(customers);

  // Toggle dropdown
  const toggleDropdown = () => setDropdownActive(prevState => !prevState);

  // Menghitung jumlah kemunculan setiap status
  const statusCount = listHistoryBarging.reduce((acc, { STATUS }) => {
    acc[STATUS] = (acc[STATUS] || 0) + 1;
    return acc;
  }, {});

  // Mengubah objek hasil perhitungan menjadi array yang dapat digunakan untuk Dropdown
  const dropdownData = Object.entries(statusCount).map(([status, count]) => ({ name: status, count }));

  // Menghitung jumlah keseluruhan kemunculan status
  const totalStatusCount = Object.values(statusCount).reduce((total, count) => total + count, 0);

  // Memformat tanggal menggunakan moment.js
  const formattedData = listHistoryBarging.map(item => ({
    ...item,
    JETTY: `Jetty ${item.JETTY}`,
    DATE_BOOKING_TIME: moment(item.DATE_BOOKING_TIME).format('MMMM D, YYYY'),
    FINISH_BOOKING_TIME: moment(item.FINISH_BOOKING_TIME, moment.ISO_8601, true).isValid()
      ? moment(item.FINISH_BOOKING_TIME).format('MMMM D, YYYY')
      : ""
  }));

  // Fungsi untuk memfilter data berdasarkan pencarian (case insensitive)
  const filteredData = formattedData.filter(item =>
    ['ID', 'JETTY', 'TUG_BOAT', 'BARGE', 'CAPACITY', 'VESSEL', 'STATUS', 'DATE_BOOKING_TIME', 'FINISH_BOOKING_TIME']
      .some(key => item[key]?.toString().toLowerCase().includes(search.toLowerCase()))
  );

  // Menambah customer "All" jika belum ada
  const pushAddCustomer = () => {
    const alreadyExists = customerCompany.company?.some(company => company.id === 5 || company.name === "All");

    if (!alreadyExists) {
      setCustomersCompany(prevCustomers => ({
        ...prevCustomers,
        company: [...prevCustomers.company, { id: 5, name: "All" }]
      }));
    }
  };

  useEffect(() => {
    pushAddCustomer()
    onAppear(companyId || companyUserId);
  }, [companyUserId, companyId]);

  return (
    <BaseScreen
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}
      translucent containerStyle={{ paddingTop: iPad ? 10 : ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
    >
      <MyHeader pageTitle='Barging History' backButton />
      <View style={styles.container}>
        <View style={{ width: "100%", borderBottomWidth: 1, borderBottomColor: COLOR_DISABLED, paddingVertical: 10, display: companyUserId === 5 ? "flex" : "none" }}>
          <Body style={{ color: COLOR_BLACK, marginBottom: 5 }}> Company <Body style={{ color: 'red' }}>*</Body> : </Body>
          <Dropdown
            custom={true}
            value={company ? company : 'All'}
            dropdownActive={showCompanyMenu}
            dropdownPressed={() => {
              setShowCompanyMenu(!showCompanyMenu)
            }}
            data={customerCompany?.company}
            placeholder={'Select Company'}
            containerStyle={{ marginVertical: 0 }}
            borderColor={COLOR_MEDIUM_BLACK}
            borderRadius={8}
          >
            <MyModal
              isVisible={showCompanyMenu}
              headerActive={true}
              headerTitle={'List Company'}
              closeModal={() => setShowCompanyMenu(!showCompanyMenu)}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ width: '100%' }}
                data={customerCompany?.company}
                keyExtractor={(_, index) => index}
                renderItem={({ item, index }) => {

                  const lastIndex = customerCompany?.company.length - 1;

                  return (
                    <>
                      <TouchableOpacity
                        style={{ marginVertical: 5 }}
                        onPress={() => {
                          setCompany(item.name)
                          setShowCompanyMenu(!showCompanyMenu)
                          setCompanyId(item.id)
                        }}>
                        <Body style={{ color: COLOR_BLACK, textAlign: 'center' }}>
                          {item.name}
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
                    onPress={() => [toggleDropdown(), setSearch(item.name)]}>
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
        {!isLoading ?
          <FlatList
            data={filteredData}
            refreshControl={
              <RefreshControl refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  onAppear(companyUserId)
                  // Panggil fungsi refresh data di sini
                  setRefreshing(false); // Atur status refreshing kembali ke false setelah 1 detik
                }}
              />}
            keyExtractor={(item) => item.ID}
            renderItem={({ item, index }) => (
              <View style={styles.containerItem}>
                <View style={styles.cardContainer}>
                  <View style={styles.row}>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>ID Pemesanan</Text>
                      <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name={"identifier"} size={18} color={COLOR_PRIMARY} />
                        <Text style={{ marginLeft: 5, fontSize: 12 }}>{item.ID}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Start Booking </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>{moment(item.DATE_BOOKING_TIME).format('DD MMMM YYYY')} </Text>
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
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.JETTY}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Start - Finish Loading </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>{moment(item.START_LOADING).format('DD MMMM')} - </Text>
                        <Text style={{ marginRight: 5, fontSize: 11 }}>{moment(item.FINISH_LOADING).format('DD MMMM YYYY')}</Text>
                        <MaterialCommunityIcons name={"clock-time-five"} size={18} color={COLOR_PRIMARY} />
                      </View>
                    </View>
                  </View>
                  <DividerLine width={"95%"} />
                  <View style={styles.row}>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>Barge Ship</Text>
                      <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name={"sail-boat"} size={18} color={COLOR_PRIMARY} />
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.BARGE}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Plan Load</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginRight: 5, fontSize: 12 }}>{item.PLAN_LOAD}</Text>
                        <MaterialCommunityIcons name={"weight-gram"} size={18} color={COLOR_PRIMARY} />
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
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Actual Load </Text>
                      <View style={{ flexDirection: "row", right: -6 }}>
                        <Text style={{ marginRight: 5, fontSize: 11 }}>{item.ACTUAL_LOAD}</Text>
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
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right', marginTop: 5 }}>Status</Text>
                      <View style={[styles.card, { alignItems: "center", backgroundColor: item.STATUS === 'diterima' || item.STATUS === "Selesai" ? 'green' : item.STATUS === 'Ditolak' ? 'red' : 'grey' }]}>
                        <Text style={{ color: COLOR_WHITE, textAlign: "center" }}>{item.STATUS}</Text>
                      </View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Message</Text>
                      <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.STATUS === "Selesai" ? "Pesanan telah selesai" : item.STATUS === "Ditolak" ? "Jadwal pesanan tabrakan" : item.STATUS === "diterima" ? "Pesanan telah diterima" : item.STATUS === "Progress" ? "Pesanan sedang ditinjau admin" : "Mohon ditunggu"}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
          :
          <View style={{ height: '40%', justifyContent: 'center' }} >
            <ActivityIndicator size='large' color={COLOR_PRIMARY} />
          </View>}

      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    paddingVertical: 5,
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
    marginVertical: 15,
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

