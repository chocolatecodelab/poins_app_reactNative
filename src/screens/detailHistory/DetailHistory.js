import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { COLOR_BLACK, COLOR_PRIMARY, COLOR_WHITE, } from '../../tools/constant';
import { iconTools, ios } from '../../tools/helper';
import { Button, BaseScreen, Body, H3 } from '../../components';
import navigationService from '../../tools/navigationService';

const DetailHistory = () => {
    return (
        <BaseScreen
            containerStyle={{ paddingTop: ios ? 50 : 20, paddingBottom: 0 }}
            barBackgroundColor={COLOR_WHITE}
        // statusBarColor={ios ? '' : COLOR_WHITE}
        >
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <View style={{
                    width: '100%',
                    // height: '90%',
                    shadowColor: COLOR_BLACK,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 2,
                    padding: 10,
                    backgroundColor: COLOR_WHITE,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: COLOR_PRIMARY,
                    padding: 20,
                }}>
                    <H3 bold style={{ textAlign: 'center', color: COLOR_PRIMARY }}>ORDER DETAIL</H3>
                    <Image
                        style={{
                            height: 100,
                            width: 100,
                            alignSelf: 'center',
                            marginVertical: 20
                        }}
                        source={require('../../assets/images/document.png')} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 10 }}>
                            <Body>Jetsky</Body>
                            <Body>Company</Body>
                            <Body>Ship</Body>
                            <Body>Capacity</Body>
                            <Body>Date</Body>
                            <Body>Time</Body>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Body>:</Body>
                            <Body>:</Body>
                            <Body>:</Body>
                            <Body>:</Body>
                            <Body>:</Body>
                            <Body>:</Body>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Body>H</Body>
                            <Body>PT XYZ INDONESIA</Body>
                            <Body>MV. SALINDO PERDANA I</Body>
                            <Body>5.000 (Ton)</Body>
                            <Body>{`${new Date()}`}</Body>
                            <Body>06.00 - 18.00 </Body>
                        </View>

                    </View>
                </View>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 15,
                width: '100%',
                alignSelf: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20
            }}>
                <Button
                    caption='Previous'
                    // loading={isLoading}
                    containerStyle={{
                        flex: 1,
                        alignSelf: 'center',
                        backgroundColor: COLOR_WHITE,
                        borderColor: COLOR_PRIMARY,
                        borderWidth: 1,
                        marginRight: 10
                    }}
                    textStyle={{
                        color: COLOR_PRIMARY
                    }}
                    onPress={() => navigationService.back()}
                />
            </View>
        </BaseScreen>
    )
}

export default DetailHistory

const styles = StyleSheet.create({

})