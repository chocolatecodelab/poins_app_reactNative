import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BodyExtraSmall } from '../../components';
import { getScreenDimension, ios } from '../../tools/helper';
import { COLOR_GRAY_1, COLOR_WHITE } from '../../tools/constant';

const MenuHorizontal = ({ data, onItemPressed }) => {
    const { height, width } = getScreenDimension()
    return (
        <View style={styles.cardColumn}>
            {data?.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={item.ID}
                        style={styles.appCard(width, height)}
                        onPress={() => { onItemPressed(ios ? item.URL_IOS : item.URL_ANDROID) }}
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
                        <BodyExtraSmall style={{ textAlign: 'center' }}>{item.NAMA}</BodyExtraSmall>
                    </TouchableOpacity>
                )
            })}
            {/* <FlatList
                data={data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) =>
                (
                    <View>
                        <TouchableOpacity
                            style={styles.appCard(width, height)}
                            onPress={() => { onItemPressed(ios ? item[0].URL_IOS : item[0].URL_ANDROID) }}
                        >
                            <View style={styles.appIconSize}>
                                {item[0].ICON ?
                                    <Image
                                        source={{ uri: item[0].ICON }}
                                        style={styles.appImageSize}
                                    /> :
                                    <Image
                                        source={require('../../assets/images/defaultApp.png')}
                                        style={styles.appImageSize}
                                    />
                                }
                            </View>
                            <BodyExtraSmall style={{ textAlign: 'center' }}>{item[0].NAMA}</BodyExtraSmall>
                        </TouchableOpacity>
                        {item.length > 1 ?
                            <TouchableOpacity
                                style={styles.appCard(width, height)}
                                onPress={() => { onItemPressed(ios ? item[1].URL_IOS : item[1].URL_ANDROID) }}
                            >
                                <View style={styles.appIconSize}>
                                    {item[1].ICON ?
                                        <Image
                                            source={{ uri: item[1].ICON }}
                                            style={styles.appImageSize}
                                        /> :
                                        <Image
                                            source={require('../../assets/images/defaultApp.png')}
                                            style={styles.appImageSize}
                                        />
                                    }
                                </View>
                                <BodySmall style={{ textAlign: 'center', paddingTop: 5, }}>{item[1].NAMA}</BodySmall>
                            </TouchableOpacity> : null}
                    </View>
                )}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    cardColumn: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingTop: 15,
        marginBottom: 10
    },
    appCard: (width, height) => ({
        width: width / 3.2,
        height: height * 0.12,
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
