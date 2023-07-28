import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';
import { BaseScreen, Body, Button, H3, MyHeader } from '../../components';
import { COLOR_BLACK, COLOR_PRIMARY, COLOR_WHITE } from '../../tools/constant';
import { Image } from 'react-native';
import { getScreenDimension } from '../../tools/helper';

const CCTVScreen = ({ data, isDownloading, isSuccess, isErrorr, message, onAppear }) => {
    // 
    // const rtspUrl = 'rtsp://admin:sputkppit_Cctv@10.13.26.208:554/Streaming/Channels/101';
    const rtspUrl = 'rtsp://admin:sputkppit_Cctv@10.13.26.191:554/Streaming/Channels/101';
    const { width, height } = getScreenDimension()
    useEffect(() => { onAppear() }, [])

    return (
        <BaseScreen
            barBackgroundColor={COLOR_PRIMARY}
            statusBarColor={COLOR_WHITE}
            translucent
            containerStyle={{ backgroundColor: COLOR_PRIMARY, paddingBottom: 0 }}
        >
            <MyHeader
                pageTitle='Realtime CCTV'
                backButton
            />
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                {data?.map((item) => {
                    return (
                        <TouchableOpacity key={item.ID} style={styles.card}>
                            <ImageBackground
                                source={require('../../assets/images/bg-cctv.jpg')}
                                style={styles.imageBackground}
                                imageStyle={{ borderRadius: 10 }}
                            >
                                <View style={styles.overlay} />
                                <H3 style={{ color: COLOR_WHITE }} bold>{item.NAMA}</H3>
                            </ImageBackground>
                        </TouchableOpacity>
                    )
                })}

            </View>

        </BaseScreen>
    );
};
export default CCTVScreen;
const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: 200,
    },
    card: {
        marginVertical: 8,
        backgroundColor: COLOR_WHITE,
        shadowColor: COLOR_BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2,
    },
    imageBackground: {
        height: getScreenDimension().height / 5,
        resizeMode: 'cover',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Set the desired transparency value (here 0.5 means 50% transparent black)
        borderRadius: 10,
    },
});


