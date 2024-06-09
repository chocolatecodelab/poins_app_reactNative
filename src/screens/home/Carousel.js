import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native'
import { COLOR_BLACK, COLOR_BLUE, COLOR_ERROR, COLOR_GRAY_2, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE, FONT_POPPINS_REGULAR } from '../../tools/constant'
import { Body, BodyExtraSmall } from '../../components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getScreenDimension, iPad, } from '../../tools/helper'
import CircularProgress from 'react-native-circular-progress-indicator';
import { ProgressBar } from 'react-native-paper';

const Carousel = ({ item }) => {
    console.log(item);
    const { width } = getScreenDimension();
    return (
        <View style={styles.capacityProgress}>
            <View style={{ alignItems: 'center', marginBottom: 30, marginTop: 5, width: "100%" }}>
                <Text style={{ marginBottom: 5, paddingBottom: 5, marginTop: 5, fontWeight: 'bold', fontSize: 8, borderBottomWidth: 1, borderBottomColor: COLOR_GRAY_2, width: "100%", textAlign: "center", }}> JETTY {item.JETTY}</Text>
                <CircularProgress
                    value={item.Percentage}
                    progressValueColor={COLOR_PRIMARY}
                    activeStrokeColor={COLOR_PRIMARY}
                    inActiveStrokeColor={COLOR_PRIMARY}
                    inActiveStrokeOpacity={0.2}
                    valueSuffix={'%'}
                    radius={iPad ? width / 30 : width / 18}
                />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 20, width: "100%" }}>
                {iPad ?
                    <View style={{ alignItems: 'center', marginLeft: 5, marginBottom: 15 }}>
                        <Text style={{ fontSize: 8 }}>Plan Load</Text>
                        <Text style={{ fontSize: 8 }}>{item.PLAN_LOAD} MT</Text>
                    </View> :
                    <View style={{ alignItems: 'center', marginLeft: 5, marginBottom: 15 }}>
                        <Text style={{ fontSize: 8 }}>Plan Load</Text>
                        <Text style={{ fontSize: 8 }}>{item.PLAN_LOAD} MT</Text>
                    </View>
                }
                <ProgressBar progress={item.Percentage/100} color={COLOR_PRIMARY} style={{ width: iPad ? 120 : 60, height: 20, marginBottom: 20, marginTop: 10, transform: [{ rotate: '-90deg' }] }} indeterminate={false} />
                {iPad ?
                    <View style={{ alignItems: 'center', marginRight: 5, marginBottom:2 }}>
                        <Text style={{ fontSize: 8 }}>Current</Text>
                        <Text style={{ fontSize: 8 }}>{item.ACTUAL_LOAD} MT</Text>
                    </View> :
                    <View style={{ alignItems: 'center', marginRight: 5, marginBottom:2 }}>
                        <Text style={{ fontSize: 8 }}>Current</Text>
                        <Text style={{ fontSize: 8 }}>{item.ACTUAL_LOAD} MT</Text>
                    </View>
                }
                <View style={{ flexDirection: "row", alignItems: "center", width: "95%", borderTopWidth: 1, borderTopColor: COLOR_GRAY_2, }}>
                    <MaterialCommunityIcons name={"ferry"} size={9} color={COLOR_PRIMARY} style={{ marginTop: 3 }} />
                    <Text style={{ marginLeft:2, marginBottom: 2, marginTop: 3, fontFamily: FONT_POPPINS_REGULAR, fontSize: 7, fontWeight: 'bold', paddingTop: 5, width: "100%", textAlign: "left", }}>{item.TUG_BOAT}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", width: "95%" }}>
                    <MaterialCommunityIcons name={"sail-boat"} size={9} color={COLOR_PRIMARY} />
                    <Text style={{ marginLeft:2, marginBottom: 2, fontFamily: FONT_POPPINS_REGULAR, fontSize: 7, fontWeight: 'bold', textAlign: "left" }}>{item.BARGE}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", width: "95%" }}>
                    <MaterialCommunityIcons name={"domain"} size={9} color={COLOR_PRIMARY} />
                    <Text style={{marginLeft:2, marginBottom: 2, fontFamily: FONT_POPPINS_REGULAR, fontSize: 7, fontWeight: 'bold', textAlign: "left" }}>{item.Company_Alias}</Text>
                </View>
                {iPad ?
                    <Text style={{ textAlign: 'center', color: COLOR_WHITE, backgroundColor: COLOR_PRIMARY, fontWeight:"bold", paddingHorizontal:7, paddingVertical:2, borderRadius:3, marginTop:3 }}>{item.STATUS}</Text> :
                    <Text style={{ textAlign: 'center', borderRadius:5, color: COLOR_WHITE, fontWeight:"bold", backgroundColor: item.STATUS == "Breakdown" ? COLOR_ERROR: item.STATUS == "Loading" ? COLOR_BLUE : COLOR_GRAY_2, fontSize: 10, marginTop:3, paddingHorizontal:7, paddingVertical:2 }}>{item.STATUS}</Text>
                }
            </View>
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({
    capacityProgress: {
        width: 100,
        height:280,
        marginLeft: 5,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLOR_TRANSPARENT_DARK,
        padding: 5,
        marginHorizontal: 3
    },
});