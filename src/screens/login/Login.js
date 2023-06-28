import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Pressable, View, Image, ImageBackground } from 'react-native'
import { TextInputFloating, Button, KeyboardView, BaseScreen, MyModalError, BodyExtraSmall, Body } from "../../components";
import { COLOR_BLACK, COLOR_DISABLED, COLOR_PRIMARY, COLOR_SECONDARY_MAIN_ANDROID, COLOR_WHITE, STATUS_TRANSPARENT } from '../../tools/constant';
import { android, iconTools, getScreenDimension } from "../../tools/helper";
import LinearGradient from 'react-native-linear-gradient';

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
    const circleSize = Math.min(width, height) * 1;
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
            containerStyle={{ paddingVertical: 0 }}
            // contentStyle={{ backgroundColor: COLOR_PRIMARY }}
            translucent={true}
            barBackgroundColor={STATUS_TRANSPARENT}
            statusBarColor={COLOR_WHITE}
        >
            <KeyboardView style={styles.containerKeyboardView(height)}>
                <View style={styles.content(height)}>
                    <ImageBackground
                        source={require('../../assets/images/loginBackground.png')}
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Image
                                source={require('../../assets/images/poins.png')}
                                style={{
                                    height: '70%',
                                    width: '70%',
                                }}
                            /> */}
                            <Image
                                source={require('../../assets/images/titlePoins.png')}
                                style={{
                                    height: '20%',
                                    width: '70%',
                                }}
                            />
                            <View
                                style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 60,
                                    backgroundColor: COLOR_WHITE,
                                    position: 'absolute',
                                    bottom: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: COLOR_PRIMARY
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/poins.png')}
                                    style={{
                                        height: 60,
                                        width: 40,
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ flex: .8, paddingHorizontal: 20 }}>
                            <TextInputFloating
                                style={[{ marginBottom: 15 }]}
                                iconType={iconTools.MaterialCommunityIcons}
                                IconName={'email'}
                                iconSize={24}
                                iconColor={COLOR_PRIMARY}
                                iconActive={true}
                                errorText={errorEmail}
                                borderRadius={30}
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
                                borderRadius={30}
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
                                containerStyle={{ marginTop: -20, borderRadius: 30 }}
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
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingTop: android ? 25 : 50
                            }}>
                                <Image
                                    source={require('../../assets/images/kpp.png')}
                                    style={{
                                        height: 50,
                                        width: 50
                                    }}
                                    resizeMode='contain'
                                />
                                <View style={styles.footerText} >
                                    <BodyExtraSmall bold>PT. KALIMANTAN PRIMA PERSADA</BodyExtraSmall>
                                    <BodyExtraSmall style={{ alignSelf: 'flex-start', fontStyle: 'italic' }}>Integrated Mining Service</BodyExtraSmall>
                                </View>
                            </View>

                        </View>

                    </ImageBackground>

                    {/* <View style={styles.topContent(height)}>
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
                        <View style={styles.footerText(height)} >
                            <BodyExtraSmall bold>PT. Kalimantan Prima Persada</BodyExtraSmall>
                            <BodyExtraSmall bold>Jobsite Port Sungai Puting</BodyExtraSmall>
                        </View>
                        <MyModalError
                            isVisible={isError}
                            closeModal={onCloseModalError}
                            message={message}
                        />
                    </View> */}
                </View>
            </KeyboardView>
        </BaseScreen>
    )
}
export default Login

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 9999,
    },
    containerKeyboardView: (height) => ({
        height: '100%',
    }),
    content: (height) => ({
        height,
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
        color: COLOR_DISABLED,
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
    footerText: {
        backgroundColor: COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageSize: (height, width) => ({
        marginTop: 20,
        height: height / 6.5,
        width: width / 4,
    })
})