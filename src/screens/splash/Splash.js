import React, { useCallback } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { BaseScreen } from "../../components";
import { COLOR_WHITE } from '../../tools/constant';

const SplashScreen = ({ loginInfo, onAppear }) => {
  useCallback(
    setTimeout(() => {
      onAppear(loginInfo)
    }, 500)
    , []
  )
  return (
    <BaseScreen barBackgroundColor={COLOR_WHITE} contentStyle={{ paddingHorizontal: 20 }}>
      <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR_WHITE }}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </BaseScreen>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 300,
  }
})