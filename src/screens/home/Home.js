import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Header from "./Header";
import Apps from "./Apps";
import Card from "./Carousel";
// import Banner from "./Banner";
import { getScreenDimension } from '../../tools/helper';
import { COLOR_PRIMARY, COLOR_WHITE } from '../../tools/constant';
import { BaseScreen, MyModalError, MyModalInfo } from '../../components';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';

const Home = ({
    apps, userId, listHistory, isError, isInfo, message, onAppear, onCloseModal,
    onProfilePressed, onItemPressed, onFiturDevelopmentPressed, isDownloadingApps
}) => {
    const carouselRef = useRef(null);
    const SLIDER_WIDTH = getScreenDimension().width;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
    const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
    const [activeSlide, setActiveSlide] = useState(0)
    useEffect(() => { onAppear(userId) }, [])

    return (
        <BaseScreen
            barBackgroundColor={COLOR_PRIMARY}
            statusBarColor={COLOR_WHITE}
            translucent
            containerStyle={{ backgroundColor: COLOR_PRIMARY, paddingBottom: 0 }}
        >
            <Header onProfilePressed={onProfilePressed} onFiturDevelopmentPressed={onFiturDevelopmentPressed} />
            {!isDownloadingApps ?
                <Apps
                    data={apps}
                    onItemPressed={onItemPressed}
                /> :
                <View style={{ height: '40%', justifyContent: 'center' }} >
                    <ActivityIndicator size='large' color={COLOR_PRIMARY} />
                </View>
            }
            <Carousel
                layout='default'
                ref={carouselRef}
                data={listHistory}
                renderItem={(item) => Card(item)}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                containerCustomStyle={styles.carouselContainer}
                inactiveSlideShift={0}
                useScrollView={true}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={listHistory.length}
                activeDotIndex={activeSlide}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: COLOR_PRIMARY,
                }}
                inactiveDotStyle={{
                    width: 12,
                    height: 12,
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
                carouselRef={carouselRef}
                dotContainerStyle={{
                    marginTop: -10
                }}
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
        marginTop: 20,
    },
    itemContainer: (ITEM_WIDTH, ITEM_HEIGHT) => ({
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    }),
});
