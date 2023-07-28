import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR_BLACK, COLOR_DISABLED, COLOR_PRIMARY, COLOR_WHITE } from '../../tools/constant'
import { getScreenDimension, iPad, iconTools } from '../../tools/helper';
import { Body, BodySmall } from '../../components';

const Header = ({
    onProfilePressed, notification, onFiturDevelopmentPressed, onNotificationPressed
}) => {
    const { height, width } = getScreenDimension()
    return (
        <View style={styles.container}>
            {/* <View style={{ height: '20%', width: '100%'}}>
            </View> */}
            <View style={styles.contentItem}>
                {/* <View style={{ width: '65%', paddingLeft: 8 }}>
                    <TouchableOpacity style={styles.buttonSearch} onPress={onFiturDevelopmentPressed}>
                        <iconTools.MaterialIcons
                            name={'search'}
                            size={25}
                            color={COLOR_DISABLED}
                            style={{ marginRight: 5 }}
                        />
                        <Body style={{ color: COLOR_DISABLED }}>Cari di poins</Body>
                    </TouchableOpacity>
                </View> */}
                <Image
                    source={require('../../assets/images/titlePoins.png')}
                    style={{
                        height: '100%',
                        width: iPad ? width / 6 : width / 4.5,
                    }}
                // resizeMode='contain'
                />
                <View style={{ flexDirection: 'row' }}>
                    {/* <TouchableOpacity style={{ marginRight: 7 }} onPress={onFiturDevelopmentPressed}>
                        <iconTools.MaterialIcons
                            name={'mail'}
                            size={30}
                            color={COLOR_WHITE}
                        />
                        <View style={styles.badge}>
                            <BodySmall bold style={{ color: COLOR_WHITE }}>99</BodySmall>
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{ marginRight: 7 }} onPress={onNotificationPressed}>
                        <iconTools.MaterialIcons
                            name={'notifications'}
                            size={iPad ? 45 : 30}
                            color={COLOR_WHITE}
                        />
                        {notification?.length !== 0 &&
                            <View style={[styles.badge, {
                                borderRadius: iPad ? 23 : 16,
                                width: iPad ? 23 : 16,
                                height: iPad ? 23 : 16,
                            }]}>
                                {iPad ?
                                    <Body bold style={{ color: COLOR_WHITE }}>{notification?.length}</Body> :
                                    <BodySmall bold style={{ color: COLOR_WHITE }}>{notification?.length}</BodySmall>
                                }

                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 7 }} onPress={onProfilePressed}>
                        <iconTools.MaterialCommunityIcons
                            name={'account-circle'}
                            size={iPad ? 45 : 30}
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
        height: '8%',
        backgroundColor: COLOR_PRIMARY,
        paddingHorizontal: 15
    },
    contentItem: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingTop: 10
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
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -3,
        top: -5
    }
})