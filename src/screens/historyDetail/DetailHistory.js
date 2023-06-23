import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { COLOR_BLACK, COLOR_PRIMARY, COLOR_WHITE, } from '../../tools/constant';
import { android, iconTools, ios } from '../../tools/helper';
import { Button, BaseScreen, Body, H3, BodySmall } from '../../components';
import navigationService from '../../tools/navigationService';
import PageHeader from '../../components/header/Header';

const HistoryDetail = () => {
    return (
        <BaseScreen
            containerStyle={{ paddingTop: ios ? 35 : 5, paddingBottom: 0, backgroundColor: COLOR_PRIMARY }}
            contentStyle={{ backgroundColor: COLOR_WHITE }}
            barBackgroundColor={COLOR_PRIMARY}
            statusBarColor={COLOR_WHITE}
        >
            <PageHeader
                backButton
                pageTitle={'DETAIL'}
            />
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
                    elevation: 6,
                    // padding: 10,
                    backgroundColor: COLOR_WHITE,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: COLOR_PRIMARY,
                }}>
                    <View style={{ borderBottomWidth: 1, borderColor: COLOR_PRIMARY, paddingVertical: 10, alignItems: 'center' }}>
                        <Body bold style={{ color: COLOR_PRIMARY }}>BARGING DETAIL - JETTY K</Body>
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Customer</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Buyer</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Jetty</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Tugboat</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Target Barging</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Progress</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Progress By Beltscale</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Productivity</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Status</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Description</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                    </View>
                </View>
            </View>
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
                    elevation: 6,
                    // padding: 10,
                    backgroundColor: COLOR_WHITE,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: COLOR_PRIMARY,
                }}>
                    <View style={{ borderBottomWidth: 1, borderColor: COLOR_PRIMARY, paddingVertical: 10, alignItems: 'center' }}>
                        <Body bold style={{ color: COLOR_PRIMARY }}>BARGING PROGRESS - JETTY K</Body>
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Customer</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Buyer</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Jetty</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Tugboat</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Target Barging</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Progress</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Progress By Beltscale</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Productivity</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Status</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                            <BodySmall style={{ width: 100 }}>Description</BodySmall>
                            <BodySmall>: </BodySmall>
                            <BodySmall>value</BodySmall>
                        </View>
                    </View>
                </View>
            </View>
        </BaseScreen>
    )
}

export default HistoryDetail

const styles = StyleSheet.create({

})