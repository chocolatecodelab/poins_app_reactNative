import React, { useEffect, useRef, useState } from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native'
import { COLOR_BLACK, COLOR_DISABLED, COLOR_ERROR, COLOR_PRIMARY, COLOR_WHITE } from '../../tools/constant'
import { getScreenDimension, iPad, ios } from '../../tools/helper'

const TextInputFloating = (props) => {
  const {
    label, errorText, showLabelError, value, style, onBlur, onFocus,
    iconType, IconName, iconSize, iconColor, iconStyle,
    iconActive, onPressed, disableFloating, activeTextColor,
    activeBorderColor, borderRadius, ...restOfProps
  } = props
  const [isFocused, setIsFocused] = useState(false)
  const { height } = getScreenDimension()
  const inputRef = useRef(null)
  const focusAnim = useRef(new Animated.Value(0)).current

  let color = isFocused ? activeTextColor ? activeTextColor : COLOR_PRIMARY : COLOR_DISABLED
  let borderColor = isFocused ? activeBorderColor ? activeBorderColor : COLOR_PRIMARY : COLOR_DISABLED
  if (errorText) {
    color = COLOR_ERROR
    borderColor = COLOR_ERROR
  }
  let Tag = iconType;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start()
  }, [focusAnim, isFocused, value])

  return (
    <View style={style}>
      {disableFloating ?
        <TextInput
          style={[
            styles.input(iconActive, isFocused, errorText, iPad),
            { borderColor: borderColor, borderRadius: borderRadius ? borderRadius : 4 },
          ]}
          {...restOfProps}
          placeholder={label}
          placeholderTextColor={COLOR_DISABLED}
          value={value}
          onBlur={(event) => {
            setIsFocused(false)
            onBlur?.(event)
          }}
          onFocus={(event) => {
            setIsFocused(true)
            onFocus?.(event)
          }}
        />
        :
        <TextInput
          style={[
            styles.input(iconActive, isFocused, errorText, height),
            { borderColor: borderColor, borderRadius: borderRadius ? borderRadius : 4 },
          ]}
          ref={inputRef}
          {...restOfProps}
          value={value}
          onBlur={(event) => {
            setIsFocused(false)
            onBlur?.(event)
          }}
          onFocus={(event) => {
            setIsFocused(true)
            onFocus?.(event)
          }}
        />

      }
      {disableFloating ?
        null
        :
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <Animated.View
            style={[
              styles.labelContainer(isFocused, value, iconActive),
              {
                transform: [
                  {
                    scale: focusAnim.interpolate({
                      inputRange: [0.3, 1.8],
                      outputRange: [1, 0.6],
                    }),
                  },
                  {
                    translateY: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [24, -12],
                    }),
                  },
                  {
                    translateX: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [16, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text
              style={styles.backLabel(value, isFocused, iconActive)}>
              {label}
            </Text>
            <Text
              style={[styles.label, { color }]}>
              {label}
              {errorText && !value ? '*' : ''}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      }

      {iconType && iconActive ?
        <Tag
          name={IconName}
          size={iconSize}
          color={!value ? COLOR_DISABLED : isFocused ? iconColor : value ? COLOR_DISABLED : COLOR_DISABLED}
          style={styles.icon}
          onPress={onPressed}
        /> : null
      }
      {!!errorText && showLabelError ? <Text style={styles.error}>{errorText}s</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  input: (iconActive, isFocused, error) => ({
    height: iPad ? 70 : 50,
    borderWidth: 1,
    fontFamily: 'Avenir-Medium',
    fontSize: iPad ? isFocused ? 28 : 22 : isFocused ? 16 : 14,
    paddingRight: iPad ? iconActive ? 100 : 32 : iconActive ? 50 : 16,
    marginBottom: iPad ? error ? 18 : 15 : error ? 2 : 0,
    paddingLeft: iPad ? 28 : 16,
    color: COLOR_BLACK
  }),
  labelContainer: (isFocused, value, iconActive) => ({
    position: 'absolute',
    paddingHorizontal: iPad ? 16 : 8,
    paddingLeft: iconActive ? isFocused ? 0 : value ? 0 : 5 : isFocused ? 0 : value ? 0 : 10,
    top: iPad ? isFocused || value ? -3 : -6 : isFocused || value ? 0 : -12,
    width: '50%'
  }),
  backLabel: (value, isFocused) => ({
    position: 'absolute',
    backgroundColor: value ? COLOR_WHITE : isFocused ? COLOR_WHITE : null,
    height: iPad ? 40 : 20,
    color: COLOR_WHITE,
    paddingHorizontal: iPad ?30 : 10,
    left: iPad ? -25 : -8
  }),
  label: {
    fontFamily: 'Avenir-Heavy',
    color: COLOR_DISABLED,
    fontSize: iPad ? 20 : ios ? 13 : 14,
    zIndex: 2,
    fontWeight: "500"
  },
  icon: {
    backgroundColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    right: iPad ? 24 : 12,
    top: iPad ? 22 : 12
  },
  error: {
    position: 'absolute',
    bottom: iPad ? -5 : -15,
    marginLeft: iPad ? 24 : 12,
    fontSize: iPad ? 14 : 12,
    color: COLOR_ERROR,
    fontFamily: 'Avenir-Medium',
  },
})

export default TextInputFloating