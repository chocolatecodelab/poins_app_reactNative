import React, { useState, useEffect } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLOR_BLACK, COLOR_DISABLED, COLOR_GRAY_1, COLOR_GRAY_2, COLOR_HORIZONTAL_LINE, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_TRANSPARENT_DISABLED, COLOR_WHITE } from '../../tools/constant';
import { iPad, iconTools } from '../../tools/helper';
import { Body, BodyLarge, HorizontalLine, MyModal, SearchBar } from '../../components';
import MyModalConfirm from '../modalConfirm/ModalConfirm';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const renderEmptyComponent = (waitingListData) => (
    <View style={{ flex: 1, justifyContent: 'space-around', paddingHorizontal: 20 }}>
        <View style={{ alignItems: 'center' }}>
            <BodyLarge>No items to display</BodyLarge>
        </View>
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 5 }}>Waiting List</Text>
                <MaterialCommunityIcons name={"file-clock-outline"} style={{ paddingTop: 4 }} size={20} color={COLOR_PRIMARY} />
            </View>
            <FlatList
                data={waitingListData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={[styles.card, { alignItems: "center", flexDirection: "row", backgroundColor: COLOR_TRANSPARENT_DISABLED, width: "100%" }]}>
                        <Text style={{ textAlign: "center" }}>{item.name}</Text>
                    </View>
                )}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View>
    </View>
);


const DropdownSearch = ({
    selected, add, data, placeholder, containerStyle, value, dropdownActive, dropdownPressed,
    headerActive, headerTitle, borderColor, borderRadius, messageModalConfirm
}) => {
    const [number, setNumber] = useState(25)
    const [selectedOption, setSelectedOption] = useState(value)
    const [filteredData, setFilteredData] = useState(data)
    const [searchBarText, setSearchBarText] = useState('');
    const [modalConfirm, setModalConfirm] = useState(false);

    const filteredDataWaitingList = data?.filter(item => item.verif === null);

    const onSearch = (e) => {
        let text = e.toLowerCase()
        setSearchBarText(e);
        let filteredData = data?.filter((item) => {
            return item.name.toLowerCase().includes(text);
        });
        filteredDataWaitingList?.filter((item) => {
            return item.name.toLowerCase().includes(text);
        })
        if (!searchBarText || searchBarText === '') {
            setFilteredData(data);
        } else if (Array.isArray(filteredData))
            setFilteredData(filteredData);
    };

    useEffect(() => {
        setFilteredData(data)
    }, [])

    return (
        <View style={[styles.dropdownContainer, containerStyle]}>
            <TouchableOpacity
                style={[styles.menuButton, { borderColor: borderColor, borderRadius: borderRadius }]}
                onPress={() => [setNumber(25), dropdownPressed()]}>
                <Body style={{ color: selectedOption ? COLOR_BLACK : COLOR_DISABLED }}>{selectedOption ? selectedOption : placeholder}</Body>
                <iconTools.MaterialIcons
                    name={!dropdownActive ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                    size={24}
                    color={selectedOption ? COLOR_PRIMARY : COLOR_DISABLED}
                    style={styles.icon}
                />
            </TouchableOpacity>
            {dropdownActive ?
                <MyModal
                    isVisible={dropdownActive}
                    headerActive={headerActive}
                    headerTitle={headerTitle}
                    closeModal={() => [setNumber(25), dropdownPressed()]}
                >
                    <View style={{ maxHeight: '100%' }}>
                        <View style={[{ paddingHorizontal: 10, paddingVertical: 15, justifyContent: "center" }, styles.contentItem]}>
                            <SearchBar
                                placeholder={placeholder}
                                activeIcon={false}
                                iconSearch='right'
                                value={searchBarText}
                                containerStyle={[styles.menuButton, { backgroundColor: COLOR_TRANSPARENT_DISABLED, width: filteredData.length <= 0 ? "82%" : "100%" }]}
                                onTextChanged={(e) => onSearch(e)}
                                onDeletePressed={() => setSearchBarText('')}
                            />
                            {filteredData.length <= 0 &&
                                <TouchableOpacity onPress={() => setModalConfirm(true)}>
                                    <iconTools.MaterialCommunityIcons
                                        name={"pencil-plus-outline"}
                                        size={iPad ? 45 : 30}
                                        style={{ borderRadius: 24, padding: 8, backgroundColor: COLOR_TRANSPARENT_DARK, color: COLOR_PRIMARY, borderColor: COLOR_PRIMARY }}
                                    />
                                </TouchableOpacity>}
                        </View>
                        <MyModalConfirm
                            isVisible={modalConfirm}
                            closeModal={() => setModalConfirm(false)}
                            onSubmit={() => [add(searchBarText), setModalConfirm(false)]}
                            message={messageModalConfirm + searchBarText + " ?"}
                        />
                        <FlatList
                            style={{ maxHeight: '90%', marginBottom: '20%' }}
                            showsVerticalScrollIndicator={false}
                            data={filteredData}
                            keyExtractor={(_, index) => index}
                            renderItem={({ item, index }) => {
                                const lastIndex = data?.length - 1;
                                return (
                                    <Pressable>
                                        <TouchableOpacity
                                            style={{ marginVertical: 10 }}
                                            onPress={() => [setNumber(25), setSelectedOption(item.name), selected(item.name), dropdownPressed()]}>
                                            <Body style={{ color: COLOR_BLACK, textAlign: 'center' }}>
                                                {item.name}
                                            </Body>
                                        </TouchableOpacity>
                                        {index !== lastIndex && <HorizontalLine width={'100%'} />}
                                    </Pressable>
                                )
                            }}
                            initialNumToRender={number}
                            onEndReached={() => {
                                if (data.length > number) {
                                    setNumber(number + 25)
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            ListEmptyComponent={renderEmptyComponent(filteredDataWaitingList)}
                        />
                    </View>
                </MyModal> : null
            }
        </View>
    )
}

export default DropdownSearch

const styles = StyleSheet.create({
    dropdownContainer: {
        marginVertical: 5
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
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        paddingLeft: 16,
        borderColor: COLOR_PRIMARY
    },
    icon: {
        backgroundColor: 'white',
        alignSelf: 'center',
        position: 'absolute',
        right: 12,
        top: 12
    },
    card: {
        width: "100%",
        borderWidth: 1,
        borderColor: COLOR_HORIZONTAL_LINE,
        marginVertical: 4,
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
    menuContainer: (heightContent) => ({
        backgroundColor: COLOR_WHITE,
        borderWidth: 1,
        borderColor: COLOR_PRIMARY,
        position: 'absolute',
        width: '100%',
        maxHeight: heightContent ? heightContent : 200,
        minHeight: heightContent ? heightContent : 200,
        top: 50,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        zIndex: 10,
    })
})