import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BaseScreen, Body, BodyExtraSmall, Button, MyHeader, SearchBar, BodySmall, MyModal, MyModalSuccess } from '../../components'
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
    notification, onAppear, userId, onChangeNotification, isChangeNotificationStatusSuccess, onCloseModalError,
}) => {
    // State untuk filter dan pencarian
    const [search, setSearch] = useState('');

    const filteredData = notification?.filter(item =>
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
                </View>
                <FlatList
                    data={filteredData}
                    contentContainerStyle={{ padding: 5 }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card}
                                onPress={() => navigationService.replace(NAV_NAME_HISTORY_BARGING)}
                            >
                                <View style={{ flex: 1 }}>
                                    <Body bold style={{ marginBottom: 10 }}>{item.title}</Body>
                                    <BodyExtraSmall>{item.body}</BodyExtraSmall>
                                    <Button
                                        onPress={() => onChangeNotification(item.id)}
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
            <MyModalSuccess
                isVisible={isChangeNotificationStatusSuccess}
                closeModal={() => onCloseModalError(userId)}
                message={'Change Success'}
                transparent={0.7}
            />
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