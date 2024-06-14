import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Image, ImageBackground } from 'react-native';
import sunny from '../../assets/images/weather/sunny.png';
import rainy from '../../assets/images/weather/rainy.png';
import { BaseScreen, MyHeader } from '../../components';
import { COLOR_BLACK, COLOR_GRAY_2, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE } from '../../tools/constant';
import { iPad, ios } from '../../tools/helper';

import moment from 'moment';
import { ActivityIndicator } from 'react-native';

const Weather = ({
  onAppear, weather, isLoading,
}) => {
  const date = new Date();
  const [condition, setCondition] = useState('');

  let convertToCelcius;
  if (weather) {
    convertToCelcius = (temp) => {
      temp = Math.round((5 / 9) * (temp - 32).toFixed(2));
      return temp;
    }
  }

    useEffect(() => {
      if (weather.rainfall_day_mm > 0) {
        setCondition(rainy);
      } else {
        
        setCondition(sunny);
      }
  }, [])

  useEffect(() => {
    if (weather) {
      onAppear()
    }
  }, [])


  return (
    <BaseScreen
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}
      translucent containerStyle={{
        paddingTop: iPad ? 10 : ios ? 30 : 20, paddingBottom: 0, backgroundColor: COLOR_PRIMARY
      }}
    >
      <MyHeader
        pageTitle='Weather' backButton
      />
      {!isLoading ?
        <View>
          <ImageBackground
            source={require('../../assets/images/weather/background3.png')}
          >
            <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "center", alignItems: "center" }}>
              <Image
                source={require('../../assets/images/weather/Location_40px.png')}
                resizeMode="contain"
                style={{ marginHorizontal: 10, marginLeft: -10, width: 30 }}
              />
              <Text style={{ marginTop: 5, textAlign: "center", fontSize: 16, fontWeight: "bold" }}> KPP SPUT's Weather</Text>
            </View>
            <View style={styles.container}>
              <View style={{ width: "100%", justifyContent: "flex-start", borderRadius: 7, alignItems: "center", paddingBottom: 0, paddingVertical: 5, height: 260, borderWidth: 0, borderColor: "transparent" }}>
                <View>
                  <Image
                    source={condition}
                    resizeMode="contain"
                    style={[styles.image]}
                  />
                </View>
                <View>
                  <Text style={{ marginTop: -15, textAlign: "center", fontSize: 48, fontWeight: "bold" }}> {convertToCelcius(weather.temp)}&#8451;</Text>
                  <Text style={{ textAlign: "center", fontSize: 20 }}>{condition === sunny ? "Cerah" : "Hujan"}</Text>
                  <Text style={{ textAlign: "center", marginTop: 10, fontWeight: "300", fontSize: 20 }}> {moment(date).format('DD MMMM YYYY')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "center", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Kecepatan Angin {"\n"} <Text style={{ fontSize: 8 }}>10 menit yang lalu</Text>
                  </Text>
                  <Text style={{ paddingLeft: 15, paddingBottom: 10, textAlign: "center", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{weather.wind_speed_avg_last_10_min} km/h</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/weather/wind_40px.png')}
                    resizeMode="contain"
                    style={{ marginHorizontal: 10, width: 30 }}
                  />
                </View>
              </View>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "center", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Kecepatan Angin {"\n"} <Text style={{ fontSize: 8 }}>Sekarang</Text>
                  </Text>
                  <Text style={{ paddingLeft: 15, paddingBottom: 10, textAlign: "center", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{weather.wind_speed_last} km/h</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/weather/wind_40px.png')}
                    resizeMode="contain"
                    style={{ marginHorizontal: 10, width: 30 }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 30, paddingTop: 10, textAlign: "center", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Curah Hujan{"\n"} <Text style={{ fontSize: 8 }}>Hari ini</Text>
                  </Text>
                  <Text style={{ paddingLeft: 30, paddingBottom: 10, textAlign: "center", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{(weather?.rainfall_day_mm)?.toFixed(2)} mm</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/weather/rainfall_40px.png')}
                    resizeMode="contain"
                    style={{ marginHorizontal: 10, width: 30 }}
                  />
                </View>
              </View>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "center", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Curah Hujan {"\n"} <Text style={{ fontSize: 8 }}>1 jam yang lalu</Text>
                  </Text>
                  <Text style={{ paddingLeft: 20, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{(weather.rainfall_last_60_min_mm)?.toFixed(2)} mm</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/weather/rainfall_40px.png')}
                    resizeMode="contain"
                    style={{ marginHorizontal: 10, width: 30 }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Kelembapan
                  </Text>
                  <Text style={{ paddingLeft: 20, paddingBottom: 10, textAlign: "center", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{weather.hum} %</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/weather/wet_40px.png')}
                    resizeMode="contain"
                    style={{ marginHorizontal: 10, width: 30 }}
                  />
                </View>
              </View>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Titik Embun</Text>
                  <Text style={{ paddingLeft: 30, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{convertToCelcius(weather.dew_point)}&#8451;</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/weather/dew_point_40px.png')}
                    resizeMode="contain"
                    style={{ marginHorizontal: 10, width: 30 }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "center", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Hujan Badai {"\n"} <Text style={{ fontSize: 8 }}>Terakhir</Text>
                  </Text>
                  <Text style={{ paddingLeft: 30, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{(weather.rain_storm_last_mm)?.toFixed(2)} mm</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/weather/cloud_lightning_40px.png')}
                    resizeMode="contain"
                    style={{ marginHorizontal: 10, width: 30 }}
                  />
                </View>
              </View>
              <View style={[styles.card, { width: "45%", justifyContent: "space-evenly", flexDirection: "row", borderRadius: 7, alignItems: "center", paddingBottom: 0, paddingVertical: 5 }]}>
                <View>
                  <Text style={{ paddingLeft: 15, paddingTop: 10, textAlign: "left", fontWeight: "bold", fontSize: 12, color: COLOR_GRAY_2 }}>Wet Bulb</Text>
                  <Text style={{ paddingLeft: 30, paddingBottom: 10, textAlign: "left", fontWeight: "bold", fontSize: 14, color: COLOR_BLACK }}>{convertToCelcius(weather.wet_bulb)}&#8451;</Text>
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/weather/hygrometer_40px.png')}
                    resizeMode="contain"
                    style={{ marginHorizontal: 10, width: 30 }}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        
        : 
        
        <View style={{ height: '40%', justifyContent: 'center' }} >
          <ActivityIndicator size='large' color={COLOR_PRIMARY} />
        </View>
      }

    </BaseScreen>
  )
}

export default Weather

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderBottomColor: COLOR_TRANSPARENT_DARK,
    borderBottomWidth: 1,
    marginBottom: 20
  },
  card: {
    borderWidth: 1,
    borderColor: COLOR_TRANSPARENT_DARK,
    paddingVertical: 30,
    paddingBottom: 40,
    marginBottom: 15,
    backgroundColor: COLOR_WHITE,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
    padding: 15
  },
  image: {
    marginTop: -20,
    height: 150,
    width: 200,
  }
})