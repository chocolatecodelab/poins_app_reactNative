import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { BaseScreen, Button, H1, KeyboardView, MyModalError, MyModalSuccess, TextInputFloating } from '../../components'
import { useState } from 'react'
import LocalizedString from '../../tools/localization'
import { COLOR_PRIMARY } from '../../tools/constant'
import { iconTools, getScreenDimension } from '../../tools/helper'

const CreateForgetPassword = ({
    isLoading, isSuccess, isError, message, email, onSubmitPressed, onCloseModalError, onCloseModalSuccess
}) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [iconPasssword, setIconPassword] = useState('eye')
    const [iconConfirmPasssword, setIconConfirmPassword] = useState('eye')
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)

    const handleVisiblePassword = () => {
        setShowPassword(!showPassword)
        if (!showPassword) return setIconPassword('eye')
        if (showPassword) return setIconPassword('eye-off')
    }

    const handleVisibleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
        if (!showConfirmPassword) return setIconConfirmPassword('eye')
        if (showConfirmPassword) return setIconConfirmPassword('eye-off')
    }

    const handleSubmit = () => {
        if (!password) {
            setErrorPassword('This field is required.')
        }
        if (!confirmPassword) {
            setErrorConfirmPassword('This field is required.')
        }
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                setErrorPassword('Password not match')
                setErrorConfirmPassword('Password not match')
            } else {
                setErrorPassword('')
                setErrorConfirmPassword('')
                onSubmitPressed(email, password)
            }
        }
    }
    return (
        <BaseScreen
            hiddenBar={true}
            contentStyle={{ paddingHorizontal: 25 }}
        >
            <KeyboardView style={styles.containerKeyboardView(getScreenDimension.height)}>
                <Image
                    source={require('../../assets/images/padlock.png')}
                    style={styles.imageSize(getScreenDimension().height)}
                />
                <H1 bold style={{ color: COLOR_PRIMARY }}>Reset</H1>
                <H1 bold style={{ color: COLOR_PRIMARY }}>Password</H1>
                <View style={{ marginTop: 15 }}>
                    <TextInputFloating
                        secureTextEntry={showPassword}
                        style={[{ marginBottom: 30 }]}
                        editable={isLoading ? false : true}
                        iconType={iconTools.MaterialCommunityIcons}
                        IconName={iconPasssword}
                        iconSize={24}
                        iconColor={COLOR_PRIMARY}
                        errorText={errorPassword}
                        iconActive={true}
                        value={password}
                        label={'New password'}
                        onPressed={() => handleVisiblePassword()}
                        onChangeText={(text) => {
                            setPassword(text)
                            setErrorPassword(null)
                        }}
                        autoCapitalize='none'
                    />
                    <TextInputFloating
                        secureTextEntry={showConfirmPassword}
                        iconType={iconTools.MaterialCommunityIcons}
                        IconName={iconConfirmPasssword}
                        editable={isLoading ? false : true}
                        iconSize={24}
                        iconColor={COLOR_PRIMARY}
                        iconActive={true}
                        errorText={errorConfirmPassword}
                        value={confirmPassword}
                        label={'Confirm new password'}
                        onPressed={() => handleVisibleConfirmPassword()}
                        onChangeText={(text) => {
                            setConfirmPassword(text)
                            setErrorConfirmPassword(null)
                        }}
                        autoCapitalize='none'
                    />
                </View>
                <Button
                    caption='Change Password'
                    disabled={isLoading}
                    loading={isLoading}
                    containerStyle={{ backgroundColor: COLOR_PRIMARY, marginTop: 100 }}
                    onPress={handleSubmit}
                />
            </KeyboardView>
            <MyModalError
                isVisible={isError}
                closeModal={onCloseModalError}
                message={message}
            />
            <MyModalSuccess
                isVisible={isSuccess}
                closeModal={onCloseModalSuccess}
                message={LocalizedString.profileScreen.updateSuccess}
            />
        </BaseScreen>
    )
}

export default CreateForgetPassword

const styles = StyleSheet.create({
    containerKeyboardView: (height) => ({
        height,
    }),
    imageSize: (height) => ({
        height: 180,
        width: 180,
        alignSelf: 'center',
        marginVertical: 30
    }),
})