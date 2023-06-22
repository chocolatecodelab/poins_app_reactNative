import React, { useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View, FlatList, Image, Animated, Linking } from 'react-native'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../tools/constant';
import { BaseScreen, BodySmall, H3, MyModalError } from '../../components';
import LocalizedString from "../../tools/localization";
import { ios } from '../../tools/helper';

const Home = ({ apps, userId, onAppear, onCloseModalError, isError, message }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;
    const toggleModal = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        toggleModal();
        onAppear(userId)
    }, [])

    return (
        <BaseScreen barBackgroundColor={COLOR_WHITE}>
            <View style={styles.appsContainer(ios)}>
                <H3 style={{ color: COLOR_PRIMARY, marginBottom: 20, alignSelf: 'center' }} bold>{LocalizedString.homeScreen.title}</H3>
                <FlatList
                    data={apps}
                    renderItem={({ item }) =>
                        <Animated.View
                            style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                            <TouchableOpacity
                                style={styles.appCard}
                                onPress={() => Linking.openURL(item?.URL_ANDROID)}
                            >
                                <Image
                                    source={item?.ICON ? { uri: item?.ICON } : require('../../assets/images/defaultApp.png')}
                                    style={styles.appIcon}
                                />
                                <BodySmall style={{ color: COLOR_WHITE, marginTop: 5 }} bold>{item?.NAMA}</BodySmall>
                            </TouchableOpacity>
                        </Animated.View>
                    }
                    keyExtractor={item => item?.ID}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <MyModalError
                isVisible={isError}
                closeModal={onCloseModalError}
                message={message}
            />
        </BaseScreen>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 15,
        borderColor: COLOR_WHITE
    },
    menuButton: {
        position: 'absolute',
        right: 20,
        top: 0,
        color: COLOR_WHITE
    },
    modalContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        backgroundColor: COLOR_PRIMARY,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginVertical: 10,
    },
    appsContainer: (ios) => ({
        paddingHorizontal: 20,
        marginTop: ios ? 20 : 0,
    }),
    appCard: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    appIcon: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
})

export default Home

