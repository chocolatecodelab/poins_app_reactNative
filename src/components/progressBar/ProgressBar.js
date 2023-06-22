import { StyleSheet, View } from 'react-native'
import React from 'react'
import { COLOR_DISABLED, COLOR_SECONDARY_MAIN_ANDROID, COLOR_SECONDARY_MAIN_IOS, COLOR_WHITE } from '../../tools/constant'
import { ios } from '../../tools/helper'
import { Body, BodySmall } from '../labels/Labels'
import PropTypes from 'prop-types';

const ProgressBar = ({ stepOneActive, stepTwoActive }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.firstCircle(ios)}>
                    <Body
                        bold
                        style={{
                            color: stepOneActive ? ios ? COLOR_SECONDARY_MAIN_IOS : COLOR_SECONDARY_MAIN_ANDROID : COLOR_DISABLED,
                            marginBottom: 10,
                        }}>
                        FORM
                    </Body>
                    <View style={styles.firstBar(ios, stepOneActive)} />
                </View>
                <View style={styles.secondCircle(ios, stepTwoActive)}>
                    <Body
                        bold
                        style={{
                            color: stepTwoActive ? ios ? COLOR_SECONDARY_MAIN_IOS : COLOR_SECONDARY_MAIN_ANDROID : COLOR_DISABLED,
                            marginBottom: 10,
                        }}>
                        DATE
                    </Body>
                    <View style={styles.secondBar(ios, stepTwoActive)} />
                </View>
            </View>

        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    firstCircle: () => ({
        height: 25,
        width: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }),
    firstBar: (ios, stepOneActive) => ({
        width: '100%',
        height: 5,
        borderWidth: 0.5,
        borderColor: stepOneActive ? ios ? COLOR_SECONDARY_MAIN_IOS : COLOR_SECONDARY_MAIN_ANDROID : COLOR_DISABLED,
        backgroundColor: stepOneActive ? ios ? COLOR_SECONDARY_MAIN_IOS : COLOR_SECONDARY_MAIN_ANDROID : COLOR_DISABLED,
    }),
    secondCircle: () => ({
        height: 25,
        width: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }),
    secondBar: (ios, active) => ({
        width: '100%',
        height: 5,
        borderWidth: 0.5,
        borderColor: active ? ios ? COLOR_SECONDARY_MAIN_IOS : COLOR_SECONDARY_MAIN_ANDROID : COLOR_DISABLED,
        backgroundColor: active ? ios ? COLOR_SECONDARY_MAIN_IOS : COLOR_SECONDARY_MAIN_ANDROID : COLOR_DISABLED,
    }),
})

ProgressBar.propTypes = {
    stepTwoActive: PropTypes.bool,
    stepThreeActive: PropTypes.bool,
};

ProgressBar.defaultProps = {
    stepTwoActive: false,
    stepThreeActive: false,
};
