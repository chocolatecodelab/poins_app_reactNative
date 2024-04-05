import React, { useState, useEffect } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLOR_BLACK, COLOR_DISABLED, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_TRANSPARENT_DISABLED, COLOR_WHITE } from '../../tools/constant';
import { iPad, iconTools } from '../../tools/helper';
import { Body, BodyLarge, HorizontalLine, MyModal, SearchBar } from '../../components';
import MyModalConfirm from '../modalConfirm/ModalConfirm';

const renderEmptyComponent = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 200 }}>
        <BodyLarge>No items to display</BodyLarge>
        
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

    const onSearch = (e) => {
        let text = e.toLowerCase()
        setSearchBarText(e);
        let filteredData = data?.filter((item) => {
            return item.name.toLowerCase().includes(text);
        });
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
                            ListEmptyComponent={renderEmptyComponent}
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