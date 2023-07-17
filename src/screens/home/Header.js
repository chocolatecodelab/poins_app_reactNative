import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR_BLACK, COLOR_DISABLED, COLOR_PRIMARY, COLOR_WHITE } from '../../tools/constant'
import { iconTools } from '../../tools/helper';
import { Body, BodySmall } from '../../components';

const Header = ({ onProfilePressed, onFiturDevelopmentPressed }) => {
    return (
        <View style={styles.container}>
            <View style={{ height: 40 }}>
                <Image
                    source={require('../../assets/images/titlePoins.png')}
                    style={{
                        height: '100%',
                        width: '30%',
                    }}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.contentItem}>
                <View style={{ width: '65%', paddingLeft: 8 }}>
                    <TouchableOpacity style={styles.buttonSearch} onPress={onFiturDevelopmentPressed}>
                        <iconTools.MaterialIcons
                            name={'search'}
                            size={25}
                            color={COLOR_DISABLED}
                            style={{ marginRight: 5 }}
                        />
                        <Body style={{ color: COLOR_DISABLED }}>Cari di poins</Body>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginRight: 7 }} onPress={onFiturDevelopmentPressed}>
                        <iconTools.MaterialIcons
                            name={'mail'}
                            size={30}
                            color={COLOR_WHITE}
                        />
                        <View style={styles.badge}>
                            <BodySmall bold style={{ color: COLOR_WHITE }}>1</BodySmall>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 7 }} onPress={onFiturDevelopmentPressed}>
                        <iconTools.MaterialIcons
                            name={'notifications'}
                            size={30}
                            color={COLOR_WHITE}
                        />
                        <View style={styles.badge}>
                            <BodySmall bold style={{ color: COLOR_WHITE }}>1</BodySmall>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 7 }} onPress={onProfilePressed}>
                        <iconTools.MaterialCommunityIcons
                            name={'account-circle'}
                            size={30}
                            color={COLOR_WHITE}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        height: '13%',
        backgroundColor: COLOR_PRIMARY,
        paddingHorizontal: 10
    },
    contentItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10
    },
    buttonSearch: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 6,
        height: 35,
        width: '100%',
        paddingLeft: 5,
        color: COLOR_BLACK,
        flexDirection: 'row',
        alignItems: 'center'
    },
    badge: {
        backgroundColor: 'red',
        borderRadius: 16,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -3,
        top: -5
    }
})