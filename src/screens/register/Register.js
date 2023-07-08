import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Pressable, View, Image, } from 'react-native'
import { TextInputFloating, Button, KeyboardView, BaseScreen, MyModalError, MyModalSuccess, Dropdown, Body } from "../../components";
import NavigationService from "../../tools/navigationService";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_MAIN_SECONDARY, COLOR_MEDIUM_BLACK, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE, NAV_NAME_LOGIN } from '../../tools/constant';
import { android, iconTools, getScreenDimension } from "../../tools/helper";
import LocalizedString from '../../tools/localization';

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
  console.log('selectCompany', selectCompany);
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
                width: '50%',
              }}
              resizeMode='cover'
            />
          </View>

          <View style={styles.content}>
            <View>
              <View style={{ marginBottom: 20 }}>
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
              <TextInputFloating
                style={[{ marginBottom: 20 }]}
                editable={isLoading ? false : true}
                iconType={iconTools.MaterialCommunityIcons}
                IconName={'account'}
                iconSize={24}
                maxLength={40}
                iconColor={COLOR_PRIMARY}
                borderRadius={30}
                errorText={errorName}
                iconActive={true}
                value={name}
                label={LocalizedString.registerScreen.name}
                onChangeText={(text) => {
                  setName(text)
                  setErrorName(null)
                }}
                autoCapitalize='none'
              />
              <TextInputFloating
                style={[{ marginBottom: 20 }]}
                editable={isLoading ? false : true}
                iconType={iconTools.MaterialCommunityIcons}
                IconName={'email'}
                iconSize={24}
                maxLength={40}
                iconColor={COLOR_PRIMARY}
                borderRadius={30}
                errorText={errorEmail}
                iconActive={true}
                value={email}
                label={LocalizedString.registerScreen.email}
                onChangeText={(text) => {
                  setEmail(text)
                  setErrorEmail(null)
                }}
                autoCapitalize='none'
              />
              <TextInputFloating
                style={[{ marginBottom: 20 }]}
                editable={isLoading ? false : true}
                iconType={iconTools.MaterialCommunityIcons}
                IconName={'phone'}
                iconSize={24}
                keyboardType="number-pad"
                iconColor={COLOR_PRIMARY}
                borderRadius={30}
                errorText={errorPhoneNumber}
                iconActive={true}
                maxLength={15}
                value={phoneNumber}
                label={LocalizedString.registerScreen.phoneNumber}
                onChangeText={(text) => {
                  if (isNaN(Number(text))) {
                    // do nothing when a non digit is pressed
                    return;
                  }
                  setPhoneNumber(text)
                  setErrorPhoneNumber(null)
                }}
              />
              <TextInputFloating
                secureTextEntry={showPassword}
                style={[{ marginBottom: 20 }]}
                editable={isLoading ? false : true}
                iconType={iconTools.MaterialCommunityIcons}
                IconName={iconPasssword}
                iconSize={24}
                iconColor={COLOR_PRIMARY}
                borderRadius={30}
                errorText={errorPassword}
                iconActive={true}
                value={password}
                label={LocalizedString.registerScreen.password}
                onPressed={() => handlerVisiblePassword()}
                onChangeText={(text) => {
                  setPassword(text)
                  setErrorPassword(null)
                }}
                autoCapitalize='none'
              />
              <TextInputFloating
                secureTextEntry={showConfirmPassword}
                style={[{ marginBottom: android ? '20%' : '15%' }]}
                iconType={iconTools.MaterialCommunityIcons}
                IconName={iconConfirmPasssword}
                iconSize={24}
                iconColor={COLOR_PRIMARY}
                borderRadius={30}
                iconActive={true}
                errorText={errorConfirmPassword}
                value={confirmPassword}
                label={LocalizedString.registerScreen.confirmPassword}
                onPressed={() => handlerVisibleConfirmPassword()}
                onChangeText={(text) => {
                  setConfirmPassword(text)
                  setErrorConfirmPassword(null)
                }}
                autoCapitalize='none'
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
    paddingHorizontal: 40,
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