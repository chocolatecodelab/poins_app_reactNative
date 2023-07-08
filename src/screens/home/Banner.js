import { StyleSheet, View, ImageBackground, ScrollView, Image, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { COLOR_BLACK, COLOR_DISABLED, COLOR_ERROR, COLOR_MAIN_SECONDARY, COLOR_PRIMARY, COLOR_SECONDARY_MAIN_IOS, COLOR_TRANSPARENT_DARK, COLOR_TRANSPARENT_DISABLED, COLOR_TRANSPARENT_PRIMARY, COLOR_WHITE } from '../../tools/constant'
import { Body, BodySmall, BodyExtraSmall } from '../../components'
import moment from 'moment'
import { getScreenDimension, ios } from '../../tools/helper'
import CircularProgress from 'react-native-circular-progress-indicator';

import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
    Extrapolate
} from 'react-native-reanimated';
import { ProgressBar } from 'react-native-paper';

const Banner = ({ autoPlay = true, }) => {
    const date = new Date()
    const { height } = getScreenDimension()
    const data = [
        {
            jetty: 'J',
            company: 'PT Kideco Jaya Agung',
            barge: 'Barge 1',
            tugBoat: 'Tug Boat 1',
            currentCapacity: '3000',
            totalCapacity: '5000',
            progress: 70,
            status: 'LOADING'
        },
        {
            jetty: 'U',
            company: 'PT Ganda Alam Makmur (GAM)',
            barge: 'Barge 2',
            tugBoat: 'Tug Boat 2',
            currentCapacity: '2000',
            totalCapacity: '10000',
            progress: 20,
            status: 'LOADING'
        },
        {
            jetty: 'K',
            company: 'Multi Harapan Utama',
            barge: 'Barge 3',
            tugBoat: 'Tug Boat 3',
            currentCapacity: '6000',
            totalCapacity: '12000',
            progress: 40,
            status: 'BREAKDOWN'
        },
        {
            jetty: 'J',
            company: 'Gunung Bara Utama',
            barge: 'Barge 4',
            tugBoat: 'Tug Boat 4',
            currentCapacity: '250',
            totalCapacity: '5000',
            progress: 10,
            status: 'WAITING CARGO'
        },
    ];
    const scrollViewRef = useAnimatedRef(null);
    const interval = useRef();
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
    const [newData] = useState([
        { key: 'spacer-left' },
        ...data,
        { key: 'spacer-right' },
    ]);
    const { width } = useWindowDimensions();
    const SIZE = width * 0.8;
    const SPACER = (width - SIZE) / 2;
    const x = useSharedValue(0);
    const offSet = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    });

    useEffect(() => {
        if (isAutoPlay === true) {
            let _offSet = offSet.value;
            interval.current = setInterval(() => {
                if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
                    _offSet = 0;
                } else {
                    _offSet = Math.floor(_offSet + SIZE);
                }
                scrollViewRef.current.scrollTo({ x: _offSet, y: 0 });
            }, 10000);
        } else {
            clearInterval(interval.current);
        }
    }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);

    return (
        <View style={styles.container(height)}>
            <Animated.ScrollView
                ref={scrollViewRef}
                onScroll={onScroll}
                onScrollBeginDrag={() => {
                    setIsAutoPlay(false);
                }}
                onMomentumScrollEnd={e => {
                    offSet.value = e.nativeEvent.contentOffset.x;
                    setIsAutoPlay(autoPlay);
                }}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={SIZE}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}>
                {newData.map((item, index) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    let colorStatus
                    let colorProgress
                    const style = useAnimatedStyle(() => {
                        const scale = interpolate(
                            x.value,
                            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                            [0.88, 1, 0.88],
                        );
                        return {
                            transform: [{ scale }],
                        };
                    });

                    if (item.status === 'LOADING') {
                        colorStatus = COLOR_PRIMARY
                        colorProgress = COLOR_PRIMARY
                    } else if (item.status === 'WAITING CARGO') {
                        colorStatus = COLOR_MAIN_SECONDARY
                        colorProgress = COLOR_MAIN_SECONDARY
                    } else if (item.status === 'BREAKDOWN') {
                        colorStatus = COLOR_ERROR
                        colorProgress = COLOR_ERROR
                    }

                    if (!item.company) {
                        return <View style={{ width: SPACER }} key={index} />;
                    }
                    return (
                        <View style={{ width: SIZE }} key={index}>
                            <Animated.View style={[styles.animatedContainer, style]}>
                                <View style={styles.bannerContainer}>
                                    <ImageBackground
                                        source={require('../../assets/images/banner.jpeg')}
                                        style={styles.bgBanner}
                                    >
                                        <View style={{ backgroundColor: COLOR_TRANSPARENT_DARK, width: '100%', height: '100%', position: 'absolute', zIndex: 1 }} />
                                        <Body bold style={{ color: COLOR_BLACK }}>UPDATE BARGING PROGRESS</Body>
                                        <Body bold style={{ color: COLOR_BLACK }}>Jetty {item.jetty}</Body>
                                        <BodySmall style={{ color: COLOR_BLACK }}>Date: {moment(date).format('DD MMMM YYYY - hh:mm:ss')}</BodySmall>
                                    </ImageBackground>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, }}>
                                    <View>  
                                        <Body style={{ textAlign: 'center', marginBottom: 10 }}>{item.company} - {item.barge} - {item.tugBoat}</Body>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        borderColor: COLOR_TRANSPARENT_DARK,
                                        padding: 5
                                    }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ alignItems: 'center', marginRight: 5 }}>
                                                <BodyExtraSmall>Current</BodyExtraSmall>
                                                <BodyExtraSmall>{item.currentCapacity} MT</BodyExtraSmall>
                                            </View>
                                            <ProgressBar progress={0.5} color={colorProgress} style={{ width: 60 }} indeterminate={true} />
                                            <View style={{ alignItems: 'center', marginLeft: 5 }}>
                                                <BodyExtraSmall>Plan Load</BodyExtraSmall>
                                                <BodyExtraSmall>{item.totalCapacity} MT</BodyExtraSmall>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <CircularProgress
                                                value={item.progress}
                                                progressValueColor={colorProgress}
                                                activeStrokeColor={colorProgress}
                                                inActiveStrokeColor={colorProgress}
                                                inActiveStrokeOpacity={0.2}
                                                valueSuffix={'%'}
                                                radius={width / 18}
                                            />
                                            <BodyExtraSmall style={{ textAlign: 'center', color: colorStatus }}>{item.status}</BodyExtraSmall>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>
                        </View>
                    );
                })}
            </Animated.ScrollView>
            <View style={styles.paginationContainer}>
                {data.map((_, i) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const animatedDotStyle = useAnimatedStyle(() => {
                        const widthAnimation = interpolate(
                            x.value,
                            [(i - 1) * SIZE, i * SIZE, (i + 1) * SIZE],
                            [10, 20, 10],
                            Extrapolate.CLAMP,
                        );
                        const opacityAnimation = interpolate(
                            x.value,
                            [(i - 1) * SIZE, i * SIZE, (i + 1) * SIZE],
                            [0.5, 1, 0.5],
                            Extrapolate.CLAMP,
                        );
                        return {
                            width: widthAnimation,
                            opacity: opacityAnimation,
                        };
                    });
                    return (
                        <Animated.View style={[styles.dots, animatedDotStyle]} key={i} />
                    );
                })}
            </View>

            {/* <View>
                <View style={styles.bannerContainer}>
                    <ImageBackground
                        source={require('../../assets/images/banner.jpeg')}
                        style={styles.bgBanner}
                    >
                        <Body bold style={{ color: COLOR_BLACK }}>UPDATE BARGING PROGRESS</Body>
                        <BodySmall style={{ color: COLOR_BLACK }}>Date: {moment(date).format('DD MMMM YYYY - hh:mm:ss')}</BodySmall>
                    </ImageBackground>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.jetty}>
                    <View style={styles.title}>
                        <Body>BL J</Body>
                    </View>
                    <View style={styles.wrapperProgressBar}>
                        <ProgressBar progress={0.7} color={COLOR_SECONDARY_MAIN_IOS} style={{ height: 10, width: 55, borderRadius: 20, borderWidth: ios ? .5 : 0.7 }} />
                        <BodyExtraSmall style={{ marginLeft: 10 }}>{`${Math.floor(0.67 * 100)}%`}</BodyExtraSmall>
                    </View>
                    <BodyExtraSmall>CV HMS</BodyExtraSmall>
                    <BodyExtraSmall>TB BORNEO 01</BodyExtraSmall>
                    <BodyExtraSmall>BG BORNEO 301</BodyExtraSmall>
                    <BodyExtraSmall>P. Load: 7.000 MT</BodyExtraSmall>
                    <BodyExtraSmall>Current: 4.000 MT</BodyExtraSmall>
                    <View style={[styles.status, { backgroundColor: COLOR_PRIMARY }]}>
                        <BodyExtraSmall style={{ textAlign: 'center' }}>LOADING</BodyExtraSmall>
                    </View>
                </View>
                <View style={styles.jetty}>
                    <View style={styles.title}>
                        <Body>BL U</Body>
                    </View>
                    <View style={styles.wrapperProgressBar}>
                        <ProgressBar progress={0.7} color={COLOR_SECONDARY_MAIN_IOS} style={{ height: 10, width: 55, borderRadius: 20, borderWidth: ios ? .5 : 0.7 }} />
                        <BodyExtraSmall style={{ marginLeft: 10 }}>{`${Math.floor(0.67 * 100)}%`}</BodyExtraSmall>
                    </View>
                    <BodyExtraSmall>CV HMS</BodyExtraSmall>
                    <BodyExtraSmall>TB BORNEO 01</BodyExtraSmall>
                    <BodyExtraSmall>BG BORNEO 301</BodyExtraSmall>
                    <BodyExtraSmall>P. Load: 7.000 MT</BodyExtraSmall>
                    <BodyExtraSmall>Current: 4.000 MT</BodyExtraSmall>
                    <View style={[styles.status, { backgroundColor: COLOR_SECONDARY_MAIN_IOS }]}>
                        <BodyExtraSmall style={{ textAlign: 'center' }}>WAITING CARGO</BodyExtraSmall>
                    </View>
                </View>
                <View style={styles.jetty}>
                    <View style={styles.title}>
                        <Body>BL K</Body>
                    </View>
                    <View style={styles.wrapperProgressBar}>
                        <ProgressBar progress={0.7} color={COLOR_SECONDARY_MAIN_IOS} style={{ height: 10, width: 55, borderRadius: 20, borderWidth: ios ? .5 : 0.7 }} />
                        <BodyExtraSmall style={{ marginLeft: 10 }}>{`${Math.floor(0.67 * 100)}%`}</BodyExtraSmall>
                    </View>
                    <BodyExtraSmall>CV HMS</BodyExtraSmall>
                    <BodyExtraSmall>TB BORNEO 01</BodyExtraSmall>
                    <BodyExtraSmall>BG BORNEO 301</BodyExtraSmall>
                    <BodyExtraSmall>P. Load: 7.000 MT</BodyExtraSmall>
                    <BodyExtraSmall>Current: 4.000 MT</BodyExtraSmall>
                    <View style={[styles.status, { backgroundColor: 'red' }]}>
                        <BodyExtraSmall style={{ textAlign: 'center' }}>BREAKDOWN</BodyExtraSmall>
                    </View>
                </View>
            </View> */}
        </View>
    )
}

export default Banner

const styles = StyleSheet.create({
    container: (height) => ({
        flex: 0.4,
        // marginVertical: 50,
        // marginHorizontal: 25,
        // borderRadius: 5,
        // backgroundColor: COLOR_WHITE,
        // shadowColor: COLOR_BLACK,
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 1.41,
        // elevation: 3,

    }),
    bannerContainer: {
        height: '30%'
    },
    bgBanner: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
    },

    title: {
        backgroundColor: COLOR_DISABLED,
        borderRadius: 20,
        width: '100%',
        alignItems: "center",
        marginBottom: 20
    },
    wrapperProgressBar: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    content: {
        backgroundColor: COLOR_TRANSPARENT_DISABLED,
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'baseline',
        height: '75%'
    },
    jetty: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%'
    },
    status: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },

    animatedContainer: {
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: COLOR_WHITE,
        borderWidth: 1,
        borderColor: COLOR_TRANSPARENT_DARK,
        height: '100%'
    },
    paginationContainer: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dots: {
        height: 10,
        backgroundColor: COLOR_PRIMARY,
        marginHorizontal: 5,
        borderRadius: 5,
    },
})