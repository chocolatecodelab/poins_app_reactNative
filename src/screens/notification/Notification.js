import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BaseScreen, Body, BodyExtraSmall, Button, MyHeader, SearchBar, BodySmall, MyModal } from '../../components'
import { COLOR_BLACK, COLOR_HORIZONTAL_LINE, COLOR_PRIMARY, COLOR_WHITE, COLOR_TRANSPARENT_DARK, NAV_NAME_HISTORY_BARGING } from '../../tools/constant'
import { iPad, ios, iconTools } from '../../tools/helper'
import { Badge } from 'react-native-paper';
import navigationService from '../../tools/navigationService'


const renderEmptyComponent = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 200 }}>
        <BodyLarge>No items to display</BodyLarge>
    </View>
);

const Notification = ({
    data, onAppear, userId
}) => {
    // State untuk filter dan pencarian
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false); // State untuk mengatur dropdown aktif atau tidak


    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
    };

    // Menghitung jumlah kemunculan setiap status
    const isHasBeenReadCount = data.reduce((acc, item) => {
        const isHasBeenRead = item.isHasBeenRead;
        acc[isHasBeenRead] = (acc[isHasBeenRead] || 0) + 1;
        return acc;
    }, {});

    // Mengubah objek hasil perhitungan menjadi array yang dapat digunakan untuk Dropdown
    const dropdownData = Object.keys(isHasBeenReadCount).map(isHasBeenRead => ({ name: isHasBeenRead === true ? "Telah dibaca" : "Belum dibaca", count: isHasBeenReadCount[isHasBeenRead] }));

    // Menghitung jumlah keseluruhan kemunculan isHasBeenRead
    const totalisHasBeenReadCount = Object.values(isHasBeenReadCount).reduce((total, count) => total + count, 0);

    // Fungsi untuk memfilter data berdasarkan pencarian (case insensitive)
    const filteredData = data.filter(item =>
        (typeof item.body === 'string' && item.body.toLowerCase().includes(search.toLowerCase())) ||
        (typeof item.title === 'string' && item.title.toLowerCase().includes(search.toLowerCase())) ||
        (typeof item.date === 'string' && item.date.toLowerCase().includes(search.toLowerCase()))
    );

    useEffect(() => {
        onAppear(userId)
    }, [])

    return (
        <BaseScreen
            barBackgroundColor={COLOR_PRIMARY}
            statusBarColor={COLOR_WHITE}
            translucent
            containerStyle={{ paddingTop: iPad ? 10 : ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
        >
            <MyHeader
                pageTitle='NOTIFICATION'
                backButton
            />
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
                {/* <TouchableOpacity onPress={toggleDropdown}>
                    <iconTools.MaterialIcons
                        name={"menu"}
                        size={iPad ? 45 : 30}
                        style={{ borderRadius: 24, padding: 8, marginTop:20, backgroundColor: COLOR_TRANSPARENT_DARK, borderColor: COLOR_PRIMARY }}
                    />
                    {totalisHasBeenReadCount !== 0 &&
                        <View style={[styles.badge, {
                            borderRadius: 23,
                            width: 24,
                            height: 24,
                        }]}>
                            {iPad ?
                                <Body bold style={{ color: COLOR_WHITE }}><Text style={{ fontSize: 12 }}>{totalisHasBeenReadCount}</Text></Body> :
                                <BodySmall bold style={{ color: COLOR_WHITE }}><Text style={{ fontSize: 10 }}>{totalisHasBeenReadCount}</Text></BodySmall>
                            }
                        </View>
                    }
                </TouchableOpacity> */}
            </View>
            {/* dropdown */}
            {/* <MyModal
                isVisible={dropdownActive}
                headerActive={true}
                headerTitle={"List Notification Progress"}
                closeModal={toggleDropdown}
            > */}
                {/* <FlatList
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
                                    onPress={() => [toggleDropdown(), setFilter(item.name == "Telah dibaca" ? true : false)]}>
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
            </MyModal> */}
            <FlatList
                data={filteredData}
                contentContainerStyle={{ padding: 5 }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.card} 
                        onPress={ () => navigationService.replace(NAV_NAME_HISTORY_BARGING)}
                        >
                            <View style={{ flex: 1 }}>
                                <Body bold style={{ marginBottom: 10 }}>{item.title}</Body>
                                <BodyExtraSmall>{item.body}</BodyExtraSmall>
                                <Button
                                    disabled={item.isHasBeenRead ? true : false}
                                    containerStyle={{ marginTop: 10, borderRadius: 10 }}
                                    caption='Mark as Read'

                                />
                            </View>
                            <View style={item.isHasBeenRead ? null : styles.redCircle} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
        </BaseScreen>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20
      },
    card: {
        borderWidth: 1,
        borderColor: COLOR_HORIZONTAL_LINE,
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: COLOR_WHITE,
        flexDirection: 'row',
        justifyContent: 'center',
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
    contentItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingTop: 10
    },
    menuButton: {
        height: 50,
        width: "100%",
        borderWidth: 1,
        borderRadius: 24,
        justifyContent: 'center',
        paddingLeft: 16,
        borderColor: COLOR_PRIMARY
      },
    redCircle: {
        backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 10,
    }
})