import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Header from "./Header";
import Apps from "./Apps";
import Card from "./Carousel";
import { getScreenDimension } from '../../tools/helper';
import { COLOR_PRIMARY, COLOR_WHITE } from '../../tools/constant';
import { BaseScreen, MyModalError, MyModalInfo } from '../../components';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';

const Home = ({
    apps, notification, userId, listHistory, isError, isInfo, message, onAppear, onCloseModal,
    onProfilePressed, onItemPressed, onFiturDevelopmentPressed, isDownloadingApps, onNotificationPressed
}) => {
    const carouselRef = useRef(null);
    const SLIDER_WIDTH = getScreenDimension().width;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
    useEffect(() => { onAppear(userId) }, [])
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
            {!isDownloadingApps ?
                <Apps
                    data={apps}
                    onItemPressed={onItemPressed}
                /> :
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
            <FlatList
                data={listHistory}
                renderItem={(item) => Card(item)}
                contentContainerStyle={{ paddingBottom: 50 }}
                style={styles.carouselContainer}
            />
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
        // marginTop: 10,
        flex: 1,
        paddingHorizontal: 25,
    }
});
