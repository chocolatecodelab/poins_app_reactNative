import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, useWindowDimensions } from 'react-native'
import { COLOR_BLACK, COLOR_ERROR, COLOR_MAIN_SECONDARY, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE } from '../../tools/constant'
import { Body, BodySmall, BodyExtraSmall } from '../../components'
import moment from 'moment'
import { getScreenDimension, iconTools } from '../../tools/helper'
import CircularProgress from 'react-native-circular-progress-indicator';
import { ProgressBar } from 'react-native-paper';

const Carousel = ({ item }) => {
    const today = new Date()
    const { width } = getScreenDimension();
    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>
                <ImageBackground
                    source={require('../../assets/images/banner.jpeg')}
                    style={styles.bgBanner}
                >
                    <View style={styles.transparentBanner} />
                    <Body bold style={{ color: COLOR_BLACK }}>UPDATE BARGING PROGRESS</Body>
                    <Body bold style={{ color: COLOR_BLACK }}>{item.Jetty}</Body>
                    <BodySmall style={{ color: COLOR_BLACK }}>Date: {moment(today).format('DD MMMM YYYY - hh:mm:ss')}</BodySmall>
                </ImageBackground>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ paddingVertical: 10 }}>
                    <View style={styles.company}>
                        <iconTools.MaterialIcons
                            name={'apartment'}
                            size={16}
                            color={COLOR_PRIMARY}
                            style={{ marginRight: 3 }}
                        />
                        <Body>{item.Customer}</Body>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={styles.boat}>
                            <iconTools.MaterialIcons
                                name={'directions-boat'}
                                size={14}
                                color={COLOR_PRIMARY}
                                style={{ marginRight: 3 }}
                            />
                            <BodyExtraSmall>{item.Barge}</BodyExtraSmall>
                        </View>
                        <View style={styles.boat}>
                            <iconTools.MaterialIcons
                                name={'directions-boat'}
                                size={14}
                                color={COLOR_PRIMARY}
                                style={{ marginRight: 3 }}
                            />
                            <BodyExtraSmall>{item.Tug_Boat}</BodyExtraSmall>
                        </View>
                    </View>
                </View>
                <View style={styles.capacityProgress}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ alignItems: 'center', marginRight: 5 }}>
                            <BodyExtraSmall>Current</BodyExtraSmall>
                            <BodyExtraSmall>{item.StartWeight} MT</BodyExtraSmall>
                        </View>
                        <ProgressBar progress={0.5} color={COLOR_PRIMARY} style={{ width: 60 }} indeterminate={true} />
                        <View style={{ alignItems: 'center', marginLeft: 5 }}>
                            <BodyExtraSmall>Plan Load</BodyExtraSmall>
                            <BodyExtraSmall>{item.Target_Barging} MT</BodyExtraSmall>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <CircularProgress
                            value={item.persentasevolumeProgres}
                            progressValueColor={COLOR_PRIMARY}
                            activeStrokeColor={COLOR_PRIMARY}
                            inActiveStrokeColor={COLOR_PRIMARY}
                            inActiveStrokeOpacity={0.2}
                            valueSuffix={'%'}
                            radius={width / 18}
                        />
                        <BodyExtraSmall style={{ textAlign: 'center', color: COLOR_PRIMARY, fontSize: 10 }}>{item.Kode}</BodyExtraSmall>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        backgroundColor: COLOR_WHITE,
        borderWidth: 1,
        borderColor: COLOR_TRANSPARENT_DARK,
        borderRadius: 8,
    },
    bannerContainer: {
        height: '30%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden'
    },
    bgBanner: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 8,
    },
    transparentBanner: {
        backgroundColor: COLOR_TRANSPARENT_DARK,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        borderTopRightRadius: 8,
    },
    company: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
    boat: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedContainer: {
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: COLOR_WHITE,
        borderWidth: 1,
        borderColor: COLOR_TRANSPARENT_DARK,
        height: '100%',
    },
    capacityProgress: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLOR_TRANSPARENT_DARK,
        padding: 5,
    },
});