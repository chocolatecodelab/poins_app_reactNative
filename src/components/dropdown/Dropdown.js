import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { COLOR_BLACK, COLOR_DISABLED, COLOR_PRIMARY } from '../../tools/constant';
import { iconTools } from '../../tools/helper';
import { Body, BodyLarge, HorizontalLine, MyModal } from '../../components';

const renderEmptyComponent = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height:200 }}>
        <BodyLarge>No items to display</BodyLarge>
    </View>
);

const Dropdown = ({
    children, custom, selected, data, placeholder, containerStyle,
    value, dropdownActive, dropdownPressed, headerActive, headerTitle
}) => {
    const [selectedOption, setSelectedOption] = useState(value)

    useEffect(() => {
        setSelectedOption(value)
    }, [value])

    return (
        <View style={[styles.dropdownContainer, containerStyle]}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={dropdownPressed}>
                <Body style={{ color: selectedOption ? COLOR_BLACK : COLOR_DISABLED }}>
                    {selectedOption ? selectedOption : placeholder}
                </Body>
                <iconTools.MaterialIcons
                    name={!dropdownActive ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                    size={24}
                    color={selectedOption ? COLOR_PRIMARY : COLOR_DISABLED}
                    style={styles.icon}
                />
            </TouchableOpacity>
            {dropdownActive && custom ?
                <View>
                    {children}
                </View> : null
            }
            {dropdownActive && !custom ?
                <MyModal
                    isVisible={dropdownActive}
                    headerActive={headerActive}
                    headerTitle={headerTitle}
                    closeModal={() => dropdownPressed()}
                >
                    <FlatList
                        contentContainerStyle={{ textAlign: 'center' }}
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%' }}
                        data={data}
                        keyExtractor={(_, index) => index}
                        renderItem={({ item, index }) => {
                            const lastIndex = data?.length - 1;
                            return (
                                <View>
                                    <TouchableOpacity
                                        style={{ marginVertical: 10 }}
                                        onPress={() => [dropdownPressed(), setSelectedOption(item.name), selected(item.name)]}>
                                        <Body style={{ color: COLOR_BLACK, textAlign: 'center' }}>
                                            {item.name}
                                        </Body>
                                    </TouchableOpacity>
                                    {index !== lastIndex && <HorizontalLine width={'100%'} />}
                                </View>
                            )
                        }}
                        ListEmptyComponent={renderEmptyComponent}
                    />
                </MyModal> : null
            }
        </View>
    )
}

export default Dropdown

const styles = StyleSheet.create({
    dropdownContainer: {
        marginVertical: 5
    },
    menuButton: {
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        paddingLeft: 16,
        borderColor: COLOR_PRIMARY
    },
    icon: {
        backgroundColor: 'white',
        alignSelf: 'center',
        position: 'absolute',
        right: 12,
        top: 12
    },
})