import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Pressable, View, Image } from 'react-native'
import { TextInputFloating, Button, KeyboardView, BaseScreen, MyModalError, BodyExtraSmall } from "../../components";
import { COLOR_BLACK, COLOR_PRIMARY, COLOR_SECONDARY_MAIN_ANDROID, COLOR_WHITE } from '../../tools/constant';
import { android, iconTools, getScreenDimension } from "../../tools/helper";

const Login = ({
    email, password, isError, isSuccess, isLoading, message, onChangeEmail,
    onChangePassword, onSubmitPressed, onNavigationOtp, onCloseModalError,
    onAppear, onNavigationRegister, onNavigationForgetPassword
}) => {
    const [iconPasssword, setIconPassword] = useState('eye')
    const [showPassword, setShowPassword] = useState(true)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const { height, width } = getScreenDimension()

    const handlerVisiblePassword = () => {
        setShowPassword(!showPassword)
        if (!showPassword) return setIconPassword('eye')
        if (showPassword) return setIconPassword('eye-off')
    }
    useEffect(() => {
        if (isSuccess === true) {
            onNavigationOtp()
        }
    }, [isSuccess])

    useEffect(() => { onAppear() }, [])


    return (
        <BaseScreen
            containerStyle={{ backgroundColor: COLOR_PRIMARY, paddingVertical: 0 }}
            contentStyle={{ backgroundColor: COLOR_PRIMARY }}
            barBackgroundColor={COLOR_PRIMARY} statusBarColor={COLOR_WHITE}>
            <KeyboardView style={styles.containerKeyboardView(height)}>
                <View style={styles.content(height)}>
                    <View style={styles.topContent(height)}>
                        {/* <Text style={styles.title(height)}>POINS</Text> */}
                        <Image
                            source={require('../../assets/images/logo-white.png')}
                            style={styles.imageSize(height, width)}
                        />
                    </View>
                    <View style={styles.mainContent}>
                        <View style={{}}>
                            <TextInputFloating
                                style={[{ marginBottom: 30 }]}
                                iconType={iconTools.MaterialCommunityIcons}
                                IconName={'email'}
                                iconSize={24}
                                iconColor={COLOR_PRIMARY}
                                iconActive={true}
                                errorText={errorEmail}
                                value={email}
                                label="Email"
                                editable={!isLoading}
                                onChangeText={(text) => {
                                    setErrorEmail(null)
                                    onChangeEmail(text)
                                }}
                                autoCapitalize='none'
                            />
                            <TextInputFloating
                                secureTextEntry={showPassword}
                                style={[{ marginBottom: 10 }]}
                                iconType={iconTools.MaterialCommunityIcons}
                                IconName={iconPasssword}
                                iconSize={24}
                                iconColor={COLOR_PRIMARY}
                                iconActive={true}
                                errorText={errorPassword}
                                value={password}
                                label="Password"
                                editable={!isLoading}
                                onPressed={() => handlerVisiblePassword()}
                                onChangeText={(text) => {
                                    setErrorPassword(null)
                                    onChangePassword(text)
                                }}
                                autoCapitalize='none'
                            />
                            <Pressable
                                onPress={onNavigationForgetPassword}
                                style={{ alignSelf: 'flex-end' }}
                            >
                                <Text style={styles.secondText(android)}>Forgot Password?</Text>
                            </Pressable>
                            <Button
                                caption='Login'
                                disabled={isLoading}
                                loading={isLoading}
                                onPress={() => onSubmitPressed(email, password, setErrorPassword, setErrorEmail)}
                            />
                            <View style={styles.signup(android)}>
                                <Text style={styles.thirdText} >Don't have an account? </Text>
                                <Pressable
                                    style={{}}
                                    disabled={isLoading}
                                    onPress={onNavigationRegister}
                                >
                                    <Text style={styles.fourthText}>Sign Up</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.imageContainer(height)} >
                            <BodyExtraSmall bold>PT. Kalimantan Prima Persada</BodyExtraSmall>
                            <BodyExtraSmall bold>Jobsite Port Sungai Puting</BodyExtraSmall>
                        </View>
                        <MyModalError
                            isVisible={isError}
                            closeModal={onCloseModalError}
                            message={message}
                        />
                    </View>
                </View>
            </KeyboardView>
        </BaseScreen>
    )
}
export default Login

const styles = StyleSheet.create({
    containerKeyboardView: (height) => ({
        height,
    }),
    content: (height) => ({
        height,
        backgroundColor: COLOR_PRIMARY
    }),
    topContent: (height) => ({
        backgroundColor: COLOR_PRIMARY,
        justifyContent: 'center',
        height: height / 4.2,
        alignItems: 'center'
    }),
    mainContent: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: COLOR_WHITE,
        paddingHorizontal: 20,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        paddingTop: 60,
    },
    title: (height) => ({
        color: COLOR_WHITE,
        fontSize: height < 600 ? 24 : 34,
        fontWeight: 'bold',
        textAlign: 'center',
    }),
    secondText: (android) => ({
        color: COLOR_PRIMARY,
        fontWeight: '600',
        fontSize: 12,
        marginBottom: android ? '20%' : '15%'
    }),
    thirdText: {
        fontSize: 12,
        color: COLOR_BLACK
    },
    fourthText: {
        color: COLOR_SECONDARY_MAIN_ANDROID,
        fontWeight: '500'
    },
    signup: (android) => ({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',
        marginBottom: android ? 20 : 10
    }),
    imageContainer: (height) => ({
        backgroundColor: COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
    }),
    imageSize: (height, width) => ({
        marginTop: 20,
        height: height / 6.5,
        width: width / 4,
    })
})