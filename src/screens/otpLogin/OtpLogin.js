import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { BaseScreen, BodyLarge, MyModalError } from "../../components";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_ERROR, COLOR_PRIMARY, COLOR_TRANSPARENT_PRIMARY, COLOR_WHITE } from '../../tools/constant';
import { getScreenDimension, iconTools } from '../../tools/helper';
import NavigationService from '../../tools/navigationService';

const OtpLogin = ({
  email, isError, isSuccess, isLoading, message,
  validateOtpLogin, onNavigationHome, onCloseModalError
}) => {
  const [otpArray, setOtpArray] = useState([]);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(60);
  const { height } = getScreenDimension()
  const [checkPin, setCheckPin] = useState(false)

  const numpad = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 7 },
    { id: 8, value: 8 },
    { id: 9, value: 9 },
    { id: 10, value: null },
    { id: 11, value: 0 },
    { id: 12, value: undefined },
  ]

  const onPressedNumpad = useCallback(
    (value) => {
      setCheckPin(false)
      let newArr = otpArray
      if (value === undefined) {
        if (otpArray.length === 1) {
          newArr.splice(0);
        } else if (otpArray.length === 2) {
          newArr.splice(1);
        } else if (otpArray.length === 3) {
          newArr.splice(2);
        } else if (otpArray.length === 4) {
          newArr.splice(3);
        } else if (otpArray.length === 5) {
          newArr.splice(4);
        } else if (otpArray.length === 6) {
          newArr.splice(5);
        }
      }
      if (value !== undefined) {
        if (otpArray.length === 0) {
          otpArray[otpArray.length] = value;
        } else if (otpArray.length === 1) {
          otpArray[otpArray.length] = value;
        } else if (otpArray.length === 2) {
          otpArray[otpArray.length] = value;
        } else if (otpArray.length === 3) {
          otpArray[otpArray.length] = value;
        } else if (otpArray.length === 4) {
          otpArray[otpArray.length] = value;
        } else if (otpArray.length === 5) {
          otpArray[otpArray.length] = value;
        }
      }
      setOtpArray([...newArr])
    },
    [otpArray],
  )

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000)

    return () => clearInterval(myInterval);
  }, [seconds]);

  useEffect(() => {
    if (otpArray.length === 6) {
      validateOtpLogin(email, otpArray)
    }
  }, [otpArray])

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      NavigationService.back()
    }
  }, [seconds])

  useEffect(() => {
    if (isSuccess === true) {
      onNavigationHome()
    }
  }, [isSuccess])

  return (
    <BaseScreen barBackgroundColor={COLOR_WHITE} contentStyle={{ paddingHorizontal: 20 }}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={styles.topView}>
          <Image
            source={require('../../assets/images/padlock.png')}
            style={styles.imageSize(height)}
            resizeMode='contain'
          />
          <Text style={styles.title}>ENTER OTP</Text>
          <Text style={styles.secondaryTitle}>OTP will expire in?</Text>
          {checkPin && <Text style={[styles.secondaryTitle, { position: 'absolute', color: COLOR_ERROR, marginTop: 20, top: "95%" }]}>Wrong PIN</Text>}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.pinNumber} >
            <BodyLarge bold>{otpArray[0]}</BodyLarge>
          </View>
          <View style={styles.pinNumber} >
            <BodyLarge bold>{otpArray[1]}</BodyLarge>
          </View>
          <View style={styles.pinNumber} >
            <BodyLarge bold>{otpArray[2]}</BodyLarge>
          </View>
          <View style={styles.pinNumber} >
            <BodyLarge bold>{otpArray[3]}</BodyLarge>
          </View>
          <View style={styles.pinNumber} >
            <BodyLarge bold>{otpArray[4]}</BodyLarge>
          </View>
          <View style={styles.pinNumber} >
            <BodyLarge bold>{otpArray[5]}</BodyLarge>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.time}>
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </View>
        <View>
          <FlatList
            data={numpad}
            contentContainerStyle={{ alignItems: 'center' }}
            renderItem={({ item }) =>
              <>
                {item.value === null ?
                  <View
                    style={styles.emptyButton}>
                    <Text style={{ color: COLOR_BLACK }}>{item.value}</Text>
                  </View> :
                  <TouchableOpacity
                    style={styles.numpadButton}
                    onPress={() => isLoading ? null : onPressedNumpad(item.value)}>
                    {item.id === 12 ? <iconTools.Feather name='delete' size={24} color={COLOR_BLACK} /> :
                      <Text style={{ color: COLOR_BLACK, fontSize: 20 }}>{item.value}</Text>
                    }
                  </TouchableOpacity>
                }
              </>
            }
            keyExtractor={item => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <MyModalError
        isVisible={isError}
        closeModal={onCloseModalError}
        message={message}
      />
    </BaseScreen >
  )
}

export default OtpLogin

const styles = StyleSheet.create({
  containerKeyboardView: {
    height: '100%',
    backgroundColor: COLOR_WHITE
  },
  content: (height) => ({
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height
  }),
  topView: {
    alignItems: 'center',
  },
  imageSize: (height) => ({
    height: 180,
    width: 180
  }),
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 5,
    color: COLOR_BLACK
  },
  secondaryTitle: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
    color: COLOR_DISABLED
  },
  time: {
    fontSize: 50,
    fontWeight: '400',
    letterSpacing: 1,
    color: COLOR_BLACK
  },
  pinNumber: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    borderColor: COLOR_PRIMARY,
    backgroundColor: COLOR_TRANSPARENT_PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyButton: {
    backgroundColor: COLOR_WHITE,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  numpadButton: {
    backgroundColor: COLOR_WHITE,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    elevation: 5,
    borderColor: COLOR_PRIMARY
  }
})