import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BaseScreen, Body, BodyExtraSmall, MyHeader } from '../../components'
import { COLOR_BLACK, COLOR_HORIZONTAL_LINE, COLOR_PRIMARY, COLOR_WHITE } from '../../tools/constant'
import { iPad, ios } from '../../tools/helper'

const Notification = ({ data }) => {
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
            <FlatList
                data={data}
                contentContainerStyle={{ padding: 15 }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.card}>
                            <View style={{ flex: 1 }}>
                                <Body bold style={{ marginBottom: 10 }}>{item.title}</Body>
                                <BodyExtraSmall>{item.body}</BodyExtraSmall>
                            </View>
                            <View style={styles.redCircle} />
                        </TouchableOpacity>
                    )
                }}
            />
        </BaseScreen>
    )
}

export default Notification

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: COLOR_HORIZONTAL_LINE,
        padding: 15,
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
    redCircle: {
        backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 10,
    }
})