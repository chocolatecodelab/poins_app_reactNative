import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Body, BodyExtraSmall } from '../../components';
import { getScreenDimension, iPad, ios } from '../../tools/helper';
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
                        {iPad ?
                            <Text style={styles.textIcon}>{item.NAMA}</Text> :
                            <BodyExtraSmall style={styles.textIcon}>{item.NAMA}</BodyExtraSmall>
                        }
                    </TouchableOpacity>
                )
            })}
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
        paddingTop: 30,
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
