import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { BaseScreen, Body, BodyLarge, Button, H1, H2, KeyboardView, MyModalError, TextInputFloating } from "../../components";
import {
    COLOR_DISABLED, COLOR_PRIMARY
} from '../../tools/constant';
import { getScreenDimension, iconTools, ios } from '../../tools/helper';
import NavigationService from '../../tools/navigationService';

const ForgetPassword = ({
    email, isError, isSuccess, isLoading, message, onSubmitPressed, onNavigationOtp, onChangeEmail,
    onCloseModalError, onAppear
}) => {
    const [errorEmail, setErrorEmail] = useState(null)
    useEffect(() => {
        if (isSuccess === true) {
            onNavigationOtp()
        }
    }, [isSuccess])

    useEffect(() => { onAppear() }, [])

    return (
        <BaseScreen
            hiddenBar={true}
            contentStyle={{ paddingHorizontal: 25 }}
        >
            <KeyboardView style={styles.containerKeyboardView(getScreenDimension.height)}>
                <View style={{ marginTop: '1%' }}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => NavigationService.back()}
                    >
                        <iconTools.MaterialIcons
                            name={'chevron-left'}
                            size={45}
                            color={COLOR_PRIMARY}
                        />
                        <H1 bold style={{ color: COLOR_PRIMARY }}>Back</H1>
                    </TouchableOpacity>
                    <Image
                        source={require('../../assets/images/email.png')}
                        style={styles.imageSize}
                    />
                </View>
                <H1 bold style={styles.title}>Forgot</H1>
                <H1 bold style={styles.title}>Password?</H1>
                <BodyLarge style={styles.secondaryTitle}>Don't worry! it happens. Please enter the address associated with your account.</BodyLarge>
                <TextInputFloating
                    style={[{ marginTop: '15%' }]}
                    iconType={iconTools.MaterialCommunityIcons}
                    IconName={'email'}
                    iconSize={24}
                    iconColor={COLOR_PRIMARY}
                    iconActive={true}
                    errorText={errorEmail}
                    value={email}
                    label="Email"
                    // editable={!isLoading}
                    onChangeText={(text) => {
                        setErrorEmail(null)
                        onChangeEmail(text)
                    }}
                    autoCapitalize='none'
                />
                <Button
                    caption='Send'
                    containerStyle={{
                        marginTop: '25%',
                        backgroundColor: COLOR_PRIMARY
                    }}
                    disabled={isLoading}
                    loading={isLoading}
                    onPress={() => onSubmitPressed(email, setErrorEmail)}
                />
            </KeyboardView>
            <MyModalError
                isVisible={isError}
                closeModal={onCloseModalError}
                message={message}
            />
        </BaseScreen>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    containerKeyboardView: (height) => ({
        height,
    }),
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        width: 100,
        left: -13
    },
    imageSize: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginVertical: 50
    },
    title: {
        color: COLOR_PRIMARY,
        fontSize: 35
        // textAlign: 'center'
    },
    secondaryTitle: {
        // textAlign: 'center',
        color: COLOR_DISABLED,
        marginTop: 5
    },

})