import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Pressable, View, Image, } from 'react-native'
import { Button, KeyboardView, BaseScreen, MyModalError, MyModalSuccess, Dropdown } from "../../components";
import NavigationService from "../../tools/navigationService";
import { COLOR_DISABLED, COLOR_MAIN_SECONDARY, COLOR_PRIMARY, COLOR_WHITE, NAV_NAME_LOGIN } from '../../tools/constant';
import { getScreenDimension, iPad } from "../../tools/helper";
import LocalizedString from '../../tools/localization';
import { TextInput } from 'react-native-paper';

const Register = ({ customers, message, isError, isLoading, isSuccess, onSubmitPressed, onAppear, onCloseModal }) => {
  const { height } = getScreenDimension()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [iconPasssword, setIconPassword] = useState('eye')
  const [iconConfirmPasssword, setIconConfirmPassword] = useState('eye')
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)
  const [errorName, setErrorName] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(null)
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [selectCompany, setSelectCompany] = useState('');
  const handlerVisiblePassword = () => {
    setShowPassword(!showPassword)
    if (!showPassword) return setIconPassword('eye')
    if (showPassword) return setIconPassword('eye-off')
  }
  const handlerVisibleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
    if (!showConfirmPassword) return setIconConfirmPassword('eye')
    if (showConfirmPassword) return setIconConfirmPassword('eye-off')
  }

  const handleSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    !name && setErrorName('This field is required.');

    if (!email) setErrorEmail('This field is required.');
    else if (!emailRegex.test(email)) setErrorEmail('Email not valid');

    if (!phoneNumber) setErrorPhoneNumber('This field is required.');

    if (!password) setErrorPassword('This field is required.');
    else if (password.length < 5) setErrorPassword('Minimum password length of 5 ');

    if (!confirmPassword) setErrorConfirmPassword('This field is required.');

    if (password !== confirmPassword) {
      setErrorPassword('Password not match');
      setErrorConfirmPassword('Password not match');
    }

    if (name && email && phoneNumber && password && confirmPassword) {
      if (password === confirmPassword) {
        let idCompany
        const company = customers?.company
        for (let i = 0; i < company.length; i++) {
          if (selectCompany === company[i].name) {
            idCompany = company[i].id
          }
        }
        const data = { name, email, password, phoneNumber, idCompany };
        onSubmitPressed(data);
      }
    }
  }

  const handleSuccess = () => {
    onAppear();
    NavigationService.replace(NAV_NAME_LOGIN)
  }

  useEffect(() => { onAppear() }, [])

  return (
    <BaseScreen
      useScrollViewContainer={true}
      containerStyle={{ backgroundColor: COLOR_PRIMARY, paddingVertical: 0 }}
      contentStyle={{ backgroundColor: COLOR_WHITE, paddingTop: 0 }}
      barBackgroundColor={COLOR_PRIMARY}
      statusBarColor={COLOR_WHITE}>
      <KeyboardView
        style={styles.containerKeyboardView}
        barBackgroundColor={COLOR_PRIMARY}
        statusbarColor={COLOR_WHITE}>
        <View style={{ backgroundColor: COLOR_PRIMARY, }}>
          {/* <Text style={styles.title}>POINS</Text> */}
          <View style={{
            height: height / 5,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 15
          }}>
            <Image
              source={require('../../assets/images/titlePoins.png')}
              style={{
                height: '100%',
                width: iPad ? '30%' : '50%',
              }}
              resizeMode='cover'
            />
          </View>

          <View style={styles.content}>
            <View>
              <View style={{ marginBottom: iPad ? 20 : 10 }}>
                <Dropdown
                  selected={setSelectCompany}
                  value={selectCompany}
                  data={customers?.company}
                  dropdownActive={showCompanyMenu}
                  dropdownPressed={() => {
                    setShowCompanyMenu(!showCompanyMenu)
                  }}
                  headerActive={true}
                  headerTitle={'LIST COMPANY'}
                  placeholder={'Select Company'}
                  containerStyle={{ marginVertical: 0 }}
                  borderColor={COLOR_DISABLED}
                  borderRadius={30}
                />
              </View>
              <TextInput
                mode='outlined'
                label={LocalizedString.registerScreen.name}
                value={name}
                cursorColor={COLOR_PRIMARY}
                outlineColor={COLOR_DISABLED}
                activeOutlineColor={COLOR_PRIMARY}
                editable={!isLoading}
                error={errorName ? true : false}
                theme={{ roundness: 50 }}
                autoCapitalize='none'
                style={{
                  backgroundColor: COLOR_WHITE,
                  marginBottom: iPad ? 20 : 10,
                  paddingHorizontal: iPad ? 15 : 10,
                }}
                right={
                  <TextInput.Icon
                    icon={'account'}
                    color={COLOR_DISABLED}
                    size={iPad ? 30 : 24}
                  />
                }
                onChangeText={(text) => {
                  setName(text)
                  setErrorName(null)
                }}
              />
              <TextInput
                mode='outlined'
                label={LocalizedString.registerScreen.email}
                value={email}
                cursorColor={COLOR_PRIMARY}
                outlineColor={COLOR_DISABLED}
                activeOutlineColor={COLOR_PRIMARY}
                editable={!isLoading}
                error={errorEmail ? true : false}
                theme={{ roundness: 50 }}
                autoCapitalize='none'
                style={{
                  backgroundColor: COLOR_WHITE,
                  marginBottom: iPad ? 20 : 10,
                  paddingHorizontal: iPad ? 15 : 10,
                }}
                right={
                  <TextInput.Icon
                    icon={'email'}
                    color={COLOR_DISABLED}
                    size={iPad ? 30 : 24}
                  />
                }
                onChangeText={(text) => {
                  setEmail(text)
                  setErrorEmail(null)
                }}
              />
              <TextInput
                mode='outlined'
                label={LocalizedString.registerScreen.phoneNumber}
                value={phoneNumber}
                cursorColor={COLOR_PRIMARY}
                outlineColor={COLOR_DISABLED}
                activeOutlineColor={COLOR_PRIMARY}
                editable={!isLoading}
                theme={{ roundness: 50 }}
                error={errorPhoneNumber ? true : false}
                autoCapitalize='none'
                style={{
                  backgroundColor: COLOR_WHITE,
                  marginBottom: iPad ? 20 : 10,
                  paddingHorizontal: iPad ? 15 : 10,
                }}
                right={
                  <TextInput.Icon
                    icon={'phone'}
                    color={COLOR_DISABLED}
                    size={iPad ? 30 : 24}
                  />
                }
                onChangeText={(text) => {
                  if (isNaN(Number(text))) {
                    // do nothing when a non digit is pressed
                    return;
                  }
                  setPhoneNumber(text)
                  setErrorPhoneNumber(null)
                }}
              />
              <TextInput
                mode='outlined'
                label={LocalizedString.registerScreen.password}
                value={password}
                cursorColor={COLOR_PRIMARY}
                outlineColor={COLOR_DISABLED}
                activeOutlineColor={COLOR_PRIMARY}
                editable={!isLoading}
                theme={{ roundness: 50 }}
                error={errorPassword ? true : false}
                secureTextEntry={showPassword}
                autoCapitalize='none'
                style={{
                  backgroundColor: COLOR_WHITE,
                  marginBottom: iPad ? 20 : 10,
                  paddingHorizontal: iPad ? 15 : 10,
                }}
                right={
                  <TextInput.Icon
                    icon={iconPasssword}
                    color={COLOR_DISABLED}
                    size={iPad ? 30 : 24}
                    onPress={() => handlerVisiblePassword()}
                  />
                }
                onChangeText={(text) => {
                  setPassword(text)
                  setErrorPassword(null)
                }}
              />
              <TextInput
                mode='outlined'
                label={LocalizedString.registerScreen.confirmPassword}
                value={confirmPassword}
                cursorColor={COLOR_PRIMARY}
                outlineColor={COLOR_DISABLED}
                activeOutlineColor={COLOR_PRIMARY}
                editable={!isLoading}
                theme={{ roundness: 50 }}
                error={errorConfirmPassword ? true : false}
                secureTextEntry={showConfirmPassword}
                autoCapitalize='none'
                style={{
                  backgroundColor: COLOR_WHITE,
                  marginBottom: iPad ? 20 : 30,
                  paddingHorizontal: iPad ? 15 : 10,
                }}
                right={
                  <TextInput.Icon
                    icon={iconConfirmPasssword}
                    color={COLOR_DISABLED}
                    size={iPad ? 30 : 24}
                    onPress={() => handlerVisibleConfirmPassword()}
                  />
                }
                onChangeText={(text) => {
                  setConfirmPassword(text)
                  setErrorConfirmPassword(null)
                }}
              />
            </View>
            <Button
              caption={LocalizedString.registerScreen.buttonRegister}
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              containerStyle={{ borderRadius: 30 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 12, color: '#000' }} >{LocalizedString.registerScreen.labelAskRegister}</Text>
              <Pressable
                style={{ marginLeft: 5 }}
                onPress={() => NavigationService.navigate(NAV_NAME_LOGIN)}
              >
                <Text style={{ color: COLOR_MAIN_SECONDARY, fontWeight: '500' }}>{LocalizedString.registerScreen.buttonLogin}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardView>
      {isError &&
        <MyModalError
          isVisible={isError}
          closeModal={onCloseModal}
          message={message}
        />
      }
      {isSuccess &&
        <MyModalSuccess
          isVisible={isSuccess}
          closeModal={handleSuccess}
          message={LocalizedString.common.msgSuccess}
        />
      }
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  containerKeyboardView: {
    height: '90%',
    backgroundColor: COLOR_WHITE,
    paddingBottom: 100
  },
  content: {
    position: 'relative',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingTop: 40,
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: '20%'
  },
})

export default Register