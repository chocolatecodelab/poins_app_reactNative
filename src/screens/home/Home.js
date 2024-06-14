import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, ActivityIndicator, FlatList, Platform, Text, ImageBackground, RefreshControl, ScrollView } from 'react-native';
import Header from "./Header";
import Apps from "./Apps";
import Card from "./Carousel";
import { getScreenDimension, iPad } from '../../tools/helper';
import { COLOR_BLACK, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE } from '../../tools/constant';
import { BaseScreen, Button, MyModalError, MyModalInfo } from '../../components';
import moment from 'moment';
import { useState } from 'react';

const Home = ({
    email, apps, notification, userId, listHistory, isError, isInfo, message, onAppear, onCloseModal,
    onProfilePressed, onItemPressed, onFiturDevelopmentPressed, isDownloadingApps, onNotificationPressed
}) => {

    const today = new Date()
    const carouselRef = useRef(null);
    const SLIDER_WIDTH = getScreenDimension().width + 100;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
    const [refreshing, setRefreshing] = useState(false);

    const dummyItem = [
        {
            JETTY: "J",
            Percentage: 0,
            PLAN_LOAD: 0,
            ACTUAL_LOAD: 0,
            TUG_BOAT: "Tidak ada",
            BARGE: "Tidak ada",
            Company_Alias: "Tidak ada",
            STATUS: "Stand By",
        },
        {
            JETTY: "K",
            Percentage: 0,
            PLAN_LOAD: 0,
            ACTUAL_LOAD: 0,
            TUG_BOAT: "Tidak ada",
            BARGE: "Tidak ada",
            Company_Alias: "Tidak ada",
            STATUS: "Stand By",
        },
        {
            JETTY: "U",
            Percentage: 0,
            PLAN_LOAD: 0,
            ACTUAL_LOAD: 0,
            TUG_BOAT: "Tidak ada",
            BARGE: "Tidak ada",
            Company_Alias: "Tidak ada",
            STATUS: "Stand By",
        },
        {
            JETTY: "H",
            Percentage: 0,
            PLAN_LOAD: 0,
            ACTUAL_LOAD: 0,
            TUG_BOAT: "Tidak ada",
            BARGE: "Tidak ada",
            Company_Alias: "Tidak ada",
            STATUS: "Stand By",
        },
        {
            JETTY: "R",
            Percentage: 0,
            PLAN_LOAD: 0,
            ACTUAL_LOAD: 0,
            TUG_BOAT: "Tidak ada",
            BARGE: "Tidak ada",
            Company_Alias: "Tidak ada",
            STATUS: "Stand By",
        }
    ]

    const filterJetty = dummyItem.map(dummy => {
        const match = listHistory.find(item => item.JETTY === dummy.JETTY);
        return match ? match : dummy;
    });

    const jettyPart1 = filterJetty.slice(0, 3);
    const jettyPart2 = filterJetty.slice(3, 5);

    useEffect(() => {
        // Panggil onAppear saat halaman pertama kali dimuat
        onAppear(userId);
    }, []);

    useEffect(() => {
        // Panggil onAppear saat nilai refreshing berubah menjadi true
        if (refreshing) {
            onAppear(userId);
        }
    }, [refreshing == true]);

    // const handleRefresh = () => {
    //     setRefreshing(true);

    //     setTimeout(() => setRefreshing(false), 1000); // Atur status refreshing kembali ke false setelah 1 detik
    // };

    return (
        <BaseScreen
            barBackgroundColor={COLOR_PRIMARY}
            statusBarColor={COLOR_WHITE}
            translucent
            containerStyle={{ backgroundColor: COLOR_PRIMARY, paddingBottom: 0 }}
        >
            <Header
                notification={notification}
                onProfilePressed={onProfilePressed}
                onFiturDevelopmentPressed={onFiturDevelopmentPressed}
                onNotificationPressed={onNotificationPressed}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);

                            setTimeout(() => setRefreshing(false), 1000); // Atur status refreshing kembali ke false setelah 1 detik
                        }}
                    />
                }
            >
                {!isDownloadingApps ?
                    <Apps
                        refresh={setRefreshing}
                        data={apps}
                        onItemPressed={onItemPressed}
                    />
                    :
                    <View style={{ height: '40%', justifyContent: 'center' }} >
                        <ActivityIndicator size='large' color={COLOR_PRIMARY} />
                    </View>
                }

                {/* <Carousel
                layout='default'
                ref={carouselRef}
                data={listHistory}
                renderItem={(item) => Card(item)}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                containerCustomStyle={styles.carouselContainer}
                inactiveSlideShift={0}
                useScrollView={true}
            /> */}
                <View style={styles.container} >
                    <View style={styles.bannerContainer}>
                        <ImageBackground
                            source={require('../../assets/images/banner.jpeg')}
                            style={styles.bgBanner}
                        // resizeMode='cover'
                        >
                            <View style={styles.transparentBanner} />
                            <View style={{
                                padding: 10,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                            }}>
                                {iPad ?
                                    <>
                                        <Text bold style={{ color: COLOR_BLACK, fontWeight: "bold" }}>UPDATE BARGING PROGRESS</Text>
                                        <Text style={{ color: COLOR_BLACK }}>Date: {moment(today).format('DD MMMM YYYY - hh:mm:ss')}</Text>
                                    </>
                                    :
                                    <>
                                        <Text bold style={{ color: COLOR_BLACK, fontWeight: "bold" }}>UPDATE BARGING PROGRESS</Text>
                                        <Text style={{ color: COLOR_BLACK }}>Date: {moment(today).format('DD MMMM YYYY - hh:mm:ss')}</Text>
                                    </>
                                }
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ paddingHorizontal: 10, justifyContent: 'center', width: "100%", flexDirection: "row", marginBottom:-10, height: 300, marginTop: 10 }}>
                        <FlatList
                            data={jettyPart1}
                            renderItem={(item) => Card(item)}
                            style={styles.carouselContainer}
                            horizontal={true}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 10, justifyContent: 'center', width: "100%", flexDirection: "row", paddingBottom: 10, height: 300, marginBottom: 50 }}>
                        <FlatList
                            data={jettyPart2}
                            renderItem={(item) => Card(item)}
                            style={styles.carouselContainer}
                            horizontal={true}
                        />
                    </View>
                </View>
            </ScrollView>

            <MyModalError
                isVisible={isError}
                closeModal={onCloseModal}
                message={message}
            />
            <MyModalInfo
                isVisible={isInfo}
                closeModal={onCloseModal}
                message={message}
            />
        </BaseScreen>
    )
}

export default Home
const styles = StyleSheet.create({
    carouselContainer: {
        flexDirection: "column",
        height: "100%",
        width: 0,
        // marginTop: 10,
    },
    container: {
        marginLeft: 20,
        marginBottom: 10,
        backgroundColor: COLOR_WHITE,
        borderWidth: 1,
        borderColor: COLOR_TRANSPARENT_DARK,
        borderRadius: 8,
        marginRight: 15,
        height: 700,
        width: 350,
    },
    bannerContainer: {
        // flex: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden'
    },
    bgBanner: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    transparentBanner: {
        backgroundColor: COLOR_TRANSPARENT_DARK,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        borderTopLeftRadius: 8,
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
        width: "33%",
        height: 480,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLOR_TRANSPARENT_DARK,
        padding: 5,
        marginHorizontal: 3
    },
});
