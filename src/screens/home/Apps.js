import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Body, BodyExtraSmall } from '../../components';
import { getScreenDimension, iPad, ios } from '../../tools/helper';
import { COLOR_GRAY_1, COLOR_WHITE } from '../../tools/constant';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';

const MenuHorizontal = ({ 
    data, onItemPressed, refresh, companyUserId 
}) => {
    const { height, width } = getScreenDimension()
    return (
        // <ScrollView
        // refreshControl={
        //     <RefreshControl
        //         refreshing={false}
        //         onRefresh={() => {
        //             refresh(true);
        //             // Panggil fungsi refresh data di sini
        //             setTimeout(() => refresh(false), 1000); // Atur status refreshing kembali ke false setelah 1 detik
        //         }}
        //     />
        // }
        // >
            <View style={styles.cardColumn}>
                {data?.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={item.ID}
                            style={[styles.appCard(width, height), {display: companyUserId === 5 && item.ID === 1 ? "none" : "flex"}]}
                            // onPress={() => { onItemPressed(ios ? item.URL_IOS : item.URL_ANDROID) }}
                            onPress={() => { onItemPressed( item.URL_ANDROID) }}
                        >
                            <View style={styles.appIconSize}>
                                {item.ICON ?
                                    <Image
                                        source={{ uri: item.ICON }}
                                        style={styles.appImageSize}
                                    /> :
                                    <Image
                                        source={require('../../assets/images/defaultApp.png')}
                                        style={styles.appImageSize}
                                    />
                                }
                            </View>
                            {iPad ?
                                <Text style={styles.textIcon}>{item.NAMA}</Text> :
                                <BodyExtraSmall style={styles.textIcon}>{item.NAMA}</BodyExtraSmall>
                            }
                        </TouchableOpacity>
                    )
                })}
            </View>
        // </ScrollView>

    );
};

const styles = StyleSheet.create({
    cardColumn: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingTop: 30,
        marginBottom: 10
    },
    appCard: (width, height) => ({
        width: width / 3.2,
        height: height * 0.11,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: COLOR_WHITE,
        marginBottom: 5
    }),
    appIconSize: {
        width: '90%',
        height: '70%',
        resizeMode: 'contain',
        backgroundColor: COLOR_WHITE,
        borderWidth: 1,
        borderColor: COLOR_GRAY_1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appImageSize: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
    textIcon: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        fontSize: 10
    }
    // container: {
    //     flex: 0.4,
    //     paddingTop: 20
    // },
    // appCard: (width, height) => ({
    //     width: width / 3.5,
    //     height: height * 0.12,
    //     paddingHorizontal: 10,
    //     alignItems: 'center',
    //     backgroundColor: COLOR_WHITE,
    //     marginBottom: 5
    // }),
    // appIconSize: {
    //     width: '90%',
    //     height: '70%',
    //     resizeMode: 'contain',
    //     backgroundColor: COLOR_WHITE,
    //     borderWidth: 1,
    //     borderColor: COLOR_GRAY_1,
    //     borderRadius: 15,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // appImageSize: {
    //     width: '90%',
    //     height: '90%',
    //     resizeMode: 'contain',
    // },
});

export default MenuHorizontal;
