import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, FlatList, ActivityIndicator, TextInput, } from 'react-native'
import { COLOR_BLACK, COLOR_DISABLED, COLOR_PRIMARY, COLOR_WHITE, NAV_NAME_BARGIN_ONLINE_STEP_TWO, } from '../../tools/constant';
import { ios, getScreenDimension } from '../../tools/helper';
import {
    Button, BaseScreen, Body, H4, Dropdown, DropdownSearch, ProgressBar, MyModalInfo, MyModalError,
    MyModal, HorizontalLine, KeyboardView
} from '../../components';
import navigationService from '../../tools/navigationService';

const BarginOnlineStepOne = ({
    customers, isSuccess, isLoading, isError, message, onAppear, onCloseModalError
}) => {
    const [showTugBoatMenu, setShowTugBoatMenu] = useState(false);
    const [showCompanyMenu, setShowCompanyMenu] = useState(false);
    const [showCapacityMenu, setShowCapacityMenu] = useState(false);
    const [showBargeMenu, setShowBargeMenu] = useState(false);
    const [selectCompany, setSelectCompany] = useState('');
    const [selectTugBoat, setSelectTugBoat] = useState('');
    const [selectBarge, setSelectBarge] = useState('');
    const [selectCapacity, setSelectCapacity] = useState('');
    const [jetty, setJetty] = useState('');
    const [duration, setDuration] = useState('');
    const [vessel, setVessel] = useState('')
    const [showModalInfo, setShowModalInfo] = useState(false);
    const [messageInfo, setMessageInfo] = useState('');

    useEffect(() => onAppear(), [])
    useEffect(() => {
        if (isSuccess === true) {
            onCloseModalError()
        }
    }, [isSuccess])

    return (
        <BaseScreen containerStyle={{ paddingTop: ios ? 50 : 20, paddingBottom: 0 }}>
            <View style={{ paddingHorizontal: 20 }}>
                <ProgressBar stepOneActive />
            </View>
            {isLoading ?
                <ActivityIndicator size={'large'} />
                :
                <KeyboardView style={styles.containerKeyboardView(getScreenDimension.height)}>
                    <View>
                        <Body bold style={{ color: COLOR_PRIMARY }}>Select Jetty <Body style={{ color: 'red' }}>*</Body> : </Body>
                        <View style={styles.cardColumn}>
                            {customers?.jetty?.map((item) => {
                                return (
                                    <TouchableOpacity
                                        key={item?.id}
                                        style={styles.jettyCard(jetty, item?.name)}
                                        onPress={() => {
                                            setDuration('')
                                            setSelectCapacity('')
                                            setJetty(item?.name)
                                        }}
                                    >
                                        <H4 style={{ color: jetty === item?.name ? COLOR_WHITE : COLOR_BLACK }}>{item?.name}</H4>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Body bold style={{ color: COLOR_PRIMARY, marginBottom: 10 }}>Company <Body style={{ color: 'red' }}>*</Body> : </Body>
                        <Dropdown
                            selected={setSelectCompany}
                            value={selectCompany}
                            data={customers?.company}
                            dropdownActive={showCompanyMenu}
                            dropdownPressed={() => {
                                if (!jetty) {
                                    setShowModalInfo(!showModalInfo)
                                    setMessageInfo('Harap pilih jetty terlebih dahulu')
                                } else {
                                    setShowCompanyMenu(!showCompanyMenu)
                                }
                            }}
                            headerActive={true}
                            headerTitle={'LIST COMPANY'}
                            placeholder={'Select Company'}
                            containerStyle={{ marginVertical: 0 }}
                        />
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Body bold style={{ color: COLOR_PRIMARY, marginBottom: 10 }}>Tug Boat <Body style={{ color: 'red' }}>*</Body> : </Body>
                        <DropdownSearch
                            selected={setSelectTugBoat}
                            value={selectTugBoat}
                            data={customers?.tugBoat}
                            dropdownActive={showTugBoatMenu}
                            dropdownPressed={() => {
                                if (jetty === '') {
                                    setShowModalInfo(!showModalInfo)
                                    setMessageInfo('Harap pilih jetty terlebih dahulu')
                                } else {
                                    setShowTugBoatMenu(!showTugBoatMenu)
                                }
                            }}
                            headerActive={true}
                            headerTitle={'LIST TUG BOAT'}
                            placeholder={'Select Tug Boat'}
                            heightContent={155}
                            containerStyle={{ marginVertical: 0 }}
                        />
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Body bold style={{ color: COLOR_PRIMARY, marginBottom: 10 }}>Barge Ship <Body style={{ color: 'red' }}>*</Body> : </Body>
                        <DropdownSearch
                            selected={setSelectBarge}
                            value={selectBarge}
                            data={customers?.barge}
                            dropdownActive={showBargeMenu}
                            dropdownPressed={() => {
                                if (jetty === '') {
                                    setShowModalInfo(!showModalInfo)
                                    setMessageInfo('Harap pilih jetty terlebih dahulu')
                                } else {
                                    setShowBargeMenu(!showBargeMenu)
                                }
                            }}
                            headerActive={true}
                            headerTitle={'LIST BARGE'}
                            placeholder={'Select Barge'}
                            heightContent={155}
                            containerStyle={{ marginVertical: 0 }}
                        />
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Body bold style={{ color: COLOR_PRIMARY, marginBottom: 10 }}>Capacity (ton) <Body style={{ color: 'red' }}>*</Body> : </Body>
                        <Dropdown
                            custom={true}
                            value={selectCapacity && duration ? `${selectCapacity} (${duration} jam)` : ''}
                            dropdownActive={showCapacityMenu}
                            dropdownPressed={() => {
                                if (jetty === '') {
                                    setShowModalInfo(!showModalInfo)
                                    setMessageInfo('Harap pilih jetty terlebih dahulu')
                                } else {
                                    setShowCapacityMenu(!showCapacityMenu)
                                }
                            }}
                            data={customers?.capacity}
                            placeholder={'Select Capacity'}
                            containerStyle={{ marginVertical: 0 }}
                        >
                            <MyModal
                                isVisible={showCapacityMenu}
                                headerActive={true}
                                headerTitle={'LIST CAPACITY'}
                                closeModal={() => setShowCapacityMenu(!showCapacityMenu)}
                            >
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    style={{ width: '100%' }}
                                    data={customers?.capacity}
                                    keyExtractor={(_, index) => index}
                                    renderItem={({ item, index }) => {
                                        if (item.name === jetty) {
                                            const lastIndex = customers?.capacity?.length - 1;
                                            return (
                                                <>
                                                    <TouchableOpacity
                                                        style={{ marginVertical: 5 }}
                                                        onPress={() => {
                                                            setDuration(item.duration)
                                                            setSelectCapacity(item.capacity)
                                                            setShowCapacityMenu(!showCapacityMenu)
                                                        }}>
                                                        <Body style={{ color: COLOR_BLACK, textAlign: 'center' }}>
                                                            {`${item.capacity} (${item.duration} jam)`}
                                                        </Body>
                                                    </TouchableOpacity>
                                                    {index !== lastIndex && <HorizontalLine width={'100%'} />}
                                                </>
                                            )
                                        }
                                    }}
                                />
                            </MyModal>
                        </Dropdown>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Body bold style={{ color: COLOR_PRIMARY, marginBottom: 10 }}>Vessel/Tujuan : </Body>
                        <TextInput
                            multiline
                            onChangeText={(e) => setVessel(e)}
                            style={{
                                borderColor: COLOR_PRIMARY,
                                borderWidth: 1,
                                borderRadius: 4,
                                minHeight: 100,
                                maxHeight: 200,
                                padding: 10,
                                textAlignVertical: 'top'
                            }}
                        />
                    </View>
                </KeyboardView>
            }
            <View style={styles.buttonContainer}>
                <Button
                    caption='Close'
                    // loading={isLoading}
                    containerStyle={styles.close}
                    textStyle={{ color: COLOR_PRIMARY }}
                    onPress={() => navigationService.back()}
                />
                <Button
                    caption='Next'
                    disabled={jetty && selectCompany && selectCapacity && selectBarge && selectTugBoat ? false : true}
                    containerStyle={[styles.next, { backgroundColor: jetty && selectCompany && selectCapacity && selectBarge && selectTugBoat ? COLOR_PRIMARY : COLOR_DISABLED }]}
                    onPress={() => navigationService.navigate(NAV_NAME_BARGIN_ONLINE_STEP_TWO, { jetty, duration, selectCompany, selectBarge, selectTugBoat, selectCapacity, vessel })}
                />
            </View>
            <MyModalError
                isVisible={isError}
                closeModal={onCloseModalError}
                message={message}
            />
            <MyModalInfo
                isVisible={showModalInfo}
                closeModal={() => {
                    setShowModalInfo(!showModalInfo)
                    setMessageInfo('')
                }}
                message={messageInfo}
            />
        </BaseScreen>
    )
}

export default BarginOnlineStepOne

const styles = StyleSheet.create({
    containerKeyboardView: (height) => ({
        height,
        paddingHorizontal: 20,
        paddingBottom: 100,
        marginBottom:80
    }),
    cardColumn: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
    },
    jettyCard: (jetty, value) => ({
        width: '30%',
        height: 35,
        shadowColor: COLOR_BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: COLOR_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: jetty === value ? COLOR_PRIMARY : COLOR_WHITE,
        marginBottom: 10
    }),
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLOR_WHITE,
    },
    close: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: COLOR_WHITE,
        borderColor: COLOR_PRIMARY,
        borderWidth: 1,
        marginRight: 10
    },
    next: {
        flex: 1,
        alignSelf: 'center',
        marginLeft: 10
    }
})