import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Legend = ({ color, text }) => {
    return (
        <View style={styles.legendItem}>
            <View style={[styles.circle, { backgroundColor: color }]} />
            <Text style={styles.legendText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 10,
        marginRight: 10,
    },
    legendText: {
        fontSize: 14,
    },
});

export default Legend;
