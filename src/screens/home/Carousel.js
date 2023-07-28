import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native'
import { COLOR_BLACK, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE } from '../../tools/constant'
import { Body, BodySmall, BodyExtraSmall, BodyLarge } from '../../components'
import moment from 'moment'
import { getScreenDimension, iPad, iconTools } from '../../tools/helper'
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
                    {iPad ?
                        <>
                            <BodyLarge bold style={{ color: COLOR_BLACK }}>UPDATE BARGING PROGRESS</BodyLarge>
                            <BodyLarge bold style={{ color: COLOR_BLACK }}>{item.nodeDesc}</BodyLarge>
                            <Body style={{ color: COLOR_BLACK }}>Date: {moment(today).format('DD MMMM YYYY - hh:mm:ss')}</Body>
                        </>
                        :
                        <>
                            <BodyLarge bold style={{ color: COLOR_BLACK }}>UPDATE BARGING PROGRESS</BodyLarge>
                            <BodyLarge bold style={{ color: COLOR_BLACK }}>{item.nodeDesc}</BodyLarge>
                            <Body style={{ color: COLOR_BLACK }}>Date: {moment(today).format('DD MMMM YYYY - hh:mm:ss')}</Body>
                        </>
                    }

                </ImageBackground>
            </View>
            <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                <View style={{ marginVertical: 10 }}>
                    {iPad ?
                        <View style={styles.company}>
                            <iconTools.MaterialIcons
                                name={'apartment'}
                                size={24}
                                color={COLOR_PRIMARY}
                                style={{ marginRight: 3 }}
                            />
                            <BodyLarge>{item.Company}</BodyLarge>
                        </View> :
                        <View style={styles.company}>
                            <iconTools.MaterialIcons
                                name={'apartment'}
                                size={16}
                                color={COLOR_PRIMARY}
                                style={{ marginRight: 3 }}
                            />
                            <Body>{item.Company}</Body>
                        </View>
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {iPad ?
                            <View style={styles.boat}>
                                <iconTools.MaterialIcons
                                    name={'directions-boat'}
                                    size={20}
                                    color={COLOR_PRIMARY}
                                    style={{ marginRight: 3 }}
                                />
                                <Body>{item.Barge}</Body>
                            </View> :
                            <View style={styles.boat}>
                                <iconTools.MaterialIcons
                                    name={'directions-boat'}
                                    size={14}
                                    color={COLOR_PRIMARY}
                                    style={{ marginRight: 3 }}
                                />
                                <BodyExtraSmall>{item.Barge}</BodyExtraSmall>
                            </View>
                        }
                        {iPad ?
                            <View style={styles.boat}>
                                <iconTools.MaterialIcons
                                    name={'directions-boat'}
                                    size={20}
                                    color={COLOR_PRIMARY}
                                    style={{ marginRight: 3 }}
                                />
                                <Body>{item.Boat}</Body>
                            </View> :
                            <View style={styles.boat}>
                                <iconTools.MaterialIcons
                                    name={'directions-boat'}
                                    size={14}
                                    color={COLOR_PRIMARY}
                                    style={{ marginRight: 3 }}
                                />
                                <BodyExtraSmall>{item.Boat}</BodyExtraSmall>
                            </View>
                        }
                    </View>
                </View>
                <View style={styles.capacityProgress}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {iPad ?
                            <View style={{ alignItems: 'center', marginRight: 5 }}>
                                <Body>Current</Body>
                                <Body>{item.Weight} MT</Body>
                            </View> :
                            <View style={{ alignItems: 'center', marginRight: 5 }}>
                                <BodyExtraSmall>Current</BodyExtraSmall>
                                <BodyExtraSmall>{item.Weight} MT</BodyExtraSmall>
                            </View>
                        }
                        <ProgressBar progress={0.5} color={COLOR_PRIMARY} style={{ width: iPad ? 120 : 60 }} indeterminate={true} />
                        {iPad ?
                            <View style={{ alignItems: 'center', marginLeft: 5 }}>
                                <Body>Plan Load</Body>
                                <Body>{item.Planload} MT</Body>
                            </View> :
                            <View style={{ alignItems: 'center', marginLeft: 5 }}>
                                <BodyExtraSmall>Plan Load</BodyExtraSmall>
                                <BodyExtraSmall>{item.Planload} MT</BodyExtraSmall>
                            </View>
                        }
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <CircularProgress
                            value={item.WeightPercentage}
                            progressValueColor={COLOR_PRIMARY}
                            activeStrokeColor={COLOR_PRIMARY}
                            inActiveStrokeColor={COLOR_PRIMARY}
                            inActiveStrokeOpacity={0.2}
                            valueSuffix={'%'}
                            radius={iPad ? width / 30 : width / 18}
                        />
                        {iPad ?
                            <Body style={{ textAlign: 'center', color: COLOR_PRIMARY }}>{item.Kode}</Body> :
                            <BodyExtraSmall style={{ textAlign: 'center', color: COLOR_PRIMARY, fontSize: 10 }}>{item.Kode}</BodyExtraSmall>
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 10,
        marginBottom: 10,
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