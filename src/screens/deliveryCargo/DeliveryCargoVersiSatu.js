import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { BaseScreen, Body, BodySmall, HorizontalLine, MyHeader, MyModal, SearchBar, DividerLine, DatePicker, Dropdown, MyModalInfo } from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_BLACK, COLOR_DISABLED, COLOR_GRAY_1, COLOR_GRAY_2, COLOR_HORIZONTAL_LINE, COLOR_MAIN_SECONDARY, COLOR_MEDIUM_BLACK, COLOR_PRIMARY, COLOR_RED, COLOR_TRANSPARENT_DARK, COLOR_WHITE, FONT_POPPINS_REGULAR } from '../../tools/constant';
import { iPad, ios, iconTools } from '../../tools/helper';
import { ActivityIndicator, Badge } from 'react-native-paper';
import moment from 'moment';
import MyModalConfirm from '../../components/modalConfirm/ModalConfirm';

const renderEmptyComponent = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 200 }}>
    <BodyLarge>No items to display</BodyLarge>
  </View>
);

const DeliveryCargo = ({
  listDeliveryCargo, onAppear, isLoading, exportData
}) => {
  // State untuk filter dan pencarian
  const [shift, setShift] = useState('');
  const [jetty, setJetty] = useState('');
  const [showShiftMenu, setShowShiftMenu] = useState(false);
  const [showJettyMenu, setShowJettyMenu] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false); // State untuk mengatur dropdown aktif atau tidak
  const [selected, setSelectedOption] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [startDate, setStartDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())
  const [modalStartDate, setModalStartDate] = useState(false)
  const [modalFinishDate, setModalFinishDate] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [removeDuplicateShift, setRemoveDuplicateShift] = useState([]);
  const [removeDuplicateJetty, setRemoveDuplicateJetty] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [exportType, setExportType] = useState('');
  const [doExport, setDoExport] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [messageInfo, setMessageInfo] = useState('');

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  // Menghitung jumlah kemunculan setiap status
  const statusCount = listDeliveryCargo.reduce((acc, item) => {
    const jetty = item.JETTY;
    acc[jetty] = (acc[jetty] || 0) + 1;
    return acc;
  }, {});

  // Mengubah objek hasil perhitungan menjadi array yang dapat digunakan untuk Dropdown
  const dropdownData = Object.keys(statusCount).map(jetty => ({ name: jetty, count: statusCount[jetty] }));

  // Menghitung jumlah keseluruhan kemunculan status
  const totalStatusCount = Object.values(statusCount).reduce((total, count) => total + count, 0);

  // Memformat tanggal menggunakan moment.js
  const formattedData = listDeliveryCargo.map(item => {
    let formattedDateWB3 = moment(item.TANGGAL_WB3).format('MMMM D, YYYY');
    return { ...item, TANGGAL_WB3: formattedDateWB3 };
  });

  // Fungsi untuk memfilter data berdasarkan pencarian (case insensitive)
  const filterData = () => {
    const filtered = formattedData.filter(item =>
      (typeof item.TANGGAL_WB3 === 'string' && item.TANGGAL_WB3.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.SHIFT_WB3 === 'string' && item.SHIFT_WB3.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.JAM_WB3 === 'string' && item.JAM_WB3.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.NO_REG_WB3 === 'string' && item.NO_REG_WB3.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.NO_DT_WB3 === 'string' && item.NO_DT_WB3.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.SUBCONT_WB3 === 'string' && item.SUBCONT_WB3.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.GROSS_WB3 === 'string' && item.GROSS_WB3.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.TARE_WB3 === 'string' && item.TARE_WB3.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.NETTO_WB3 === 'string' && item.NETTO_WB3.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.PLAN_DUMP === 'string' && item.PLAN_DUMP.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.ACTUAL_DUMP === 'string' && item.ACTUAL_DUMP.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.JETTY === 'string' && item.JETTY.toLowerCase().includes(search.toLowerCase())) ||
      (typeof item.STATUS_WB3 === 'string' && item.STATUS_WB3.toLowerCase().includes(search.toLowerCase()))
    );

    const removeDuplicatesByKey = (data, key) => {
      return data.filter((item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key])
      );
    };

    setRemoveDuplicateShift(removeDuplicatesByKey(filtered, 'SHIFT_WB3'));
    setRemoveDuplicateJetty(removeDuplicatesByKey(filtered, 'JETTY'));

    // Urutkan berdasarkan tanggal terbaru
    const sortedData = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Tambahkan data baru berdasarkan halaman saat ini
    const paginatedData = sortedData.slice(0, currentPage * 10);
    setFilteredData(paginatedData);
  }

  const handleLoadMore = () => {
    setLoadingMore(true);
    setCurrentPage(prevPage => prevPage + 1);
    setLoadingMore(false);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="large" color={COLOR_PRIMARY} />;
  };

  useEffect(() => {
    // Panggil onAppear saat nilai refreshing berubah menjadi true
    if (refreshing) {
      onAppear(startDate, finishDate);
      filterData();
    }
  }, [refreshing == true]);


  useEffect(() => {
    filterData();
  }, [search, currentPage])

  useEffect(() => {
    onAppear(startDate, finishDate)
    filterData();
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
        <View style={{ alignItems: "center", marginVertical: 10, marginBottom:30 }}>
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
          <View style={{ width: "100%", flexDirection: "row", alignSelf: "center", justifyContent: "space-around", borderBottomWidth: 1, borderBottomColor: COLOR_DISABLED, paddingBottom: 15, marginBottom:20 }}>
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
                top: -25,
                width: 36,
                height: 36,
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
          headerTitle={"List Jetty Delivery Cargo"}
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
        {!isLoading ?
          <FlatList
            data={filteredData}
            refreshControl={
              <RefreshControl refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);

                  setTimeout(() => setRefreshing(false), 1000);
                }}
              />}
            keyExtractor={(item) => item.NO_REG_WB3}
            renderItem={({ item, index }) => (
              <View style={styles.containerItem}>
                <View style={styles.cardContainer}>
                  <View style={styles.row}>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>No. Reg</Text>
                      <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name={"identifier"} size={18} color={COLOR_PRIMARY} />
                        <Text style={{ marginLeft: 5, fontSize: 12 }}>{item.NO_REG_WB3}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Tanggal</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>{moment(item.TANGGAL_WB3).format('DD MMMM YYYY')} </Text>
                        <MaterialCommunityIcons name={"calendar-clock"} size={18} color={COLOR_PRIMARY} />
                      </View>
                    </View>
                  </View>
                  <DividerLine width={"95%"} />
                  <View style={styles.row}>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>Jam</Text>
                      <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name={"clock-time-five"} size={18} color={COLOR_PRIMARY} />
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.JAM_WB3}</Text>
                      </View>

                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>No. DT - Sub Cont</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.NO_DT_WB3} - </Text>
                        <Text style={{ marginRight: 5, fontSize: 11 }}>{item.SUBCONT_WB3}</Text>
                        <MaterialCommunityIcons name={"clock-time-five"} size={18} color={COLOR_PRIMARY} />
                      </View>
                    </View>
                  </View>
                  <DividerLine width={"95%"} />
                  <View style={styles.row}>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>Gross</Text>
                      <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name={"weight"} size={18} color={COLOR_PRIMARY} />
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.GROSS_WB3}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Plan Tare</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginRight: 5, fontSize: 12 }}>{item.TARE_WB3}</Text>
                        <MaterialCommunityIcons name={"weight-gram"} size={18} color={COLOR_PRIMARY} />
                      </View>
                    </View>
                  </View>
                  <DividerLine width={"95%"} />
                  <View style={styles.row}>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>Netto </Text>
                      <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name={"weight-pound"} size={18} color={COLOR_PRIMARY} style={{ marginTop: 2 }} />
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.NETTO_WB3}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Plan Dump </Text>
                      <View style={{ flexDirection: "row", right: -6 }}>
                        <Text style={{ marginRight: 5, fontSize: 11 }}>{item.PLAN_DUMP}</Text>
                        <MaterialCommunityIcons name={"dump-truck"} size={18} color={COLOR_PRIMARY} />
                      </View>
                    </View>
                  </View>
                  <DividerLine width={"95%"} />
                  <View style={styles.row}>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>Jetty </Text>
                      <View style={{ flexDirection: "row" }}>
                        <FontAwesomeIcons name={"ship"} size={18} color={COLOR_PRIMARY} style={{ marginTop: 2 }} />
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>{item.JETTY}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right' }}>Actual Dump </Text>
                      <View style={{ flexDirection: "row", right: -6 }}>
                        <Text style={{ marginRight: 5, fontSize: 11 }}>{item.ACTUAL_DUMP}</Text>
                        <MaterialCommunityIcons name={"truck-cargo-container"} size={18} color={COLOR_PRIMARY} />
                      </View>
                    </View>
                  </View>
                  <DividerLine width={"95%"} />
                  <View style={styles.row}>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'left' }}>Reported by </Text>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name={"account"} size={18} color={COLOR_PRIMARY} style={{ marginTop: 2 }} />
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>Shift {item.SHIFT_WB3}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 10, color: COLOR_GRAY_2, textAlign: 'right', marginTop: 5 }}>Status</Text>
                      <View style={[styles.card, { alignItems: "center", backgroundColor: 'grey' }]}>
                        <Text style={{ color: COLOR_WHITE, textAlign: "center" }}>{item.STATUS_WB3}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
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
        onSubmit={() => [exportData( startDate, finishDate, shift, jetty, exportType), setModalConfirm(false)]}
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
  }
});

export default DeliveryCargo;

