import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HowItWorks = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>How It Works</Text>
            <Text style={styles.description}>
                Learn how our AI-powered interview and resume checking system works to help you land your dream job.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        minHeight: 600,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        textAlign: 'center',
        color: '#666',
    },
});
