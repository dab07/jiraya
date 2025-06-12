
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { GradientText } from './GradientText';
import { colors } from '@/constant/colors';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 768;

export const InfoSection = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Animated.View style={styles.textContainer}>
                    <GradientText
                        text="Prepare your Interview"
                        style={styles.heading}
                        colors={[colors.cyan, colors.purple]}
                    />
                    <GradientText
                        text="with AI powered Sensei"
                        style={styles.heading}
                        colors={[colors.purple, colors.cyan]}
                    />

                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.divider}
                    />

                    <Text style={styles.subHeading}>
                        Jiraya provides advanced tools designed to help you succeed
                        in your job applications and interviews.
                    </Text>
                </Animated.View>

                {!isSmallScreen && (
                    <Animated.View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800' }}
                            resizeMode="cover"
                        />
                    </Animated.View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    content: {
        height: 400,
        flexDirection: isSmallScreen ? 'column' : 'row',
        alignItems: 'center',
        padding: 32,
    },
    textContainer: {
        flex: 1,
        paddingRight: isSmallScreen ? 0 : 24,
    },
    heading: {
        fontSize: isSmallScreen ? 40 : 56,
        lineHeight: isSmallScreen ? 48 : 68,
        fontFamily: 'Inter-Bold',
        marginBottom: 8,
    },
    divider: {
        height: 2,
        width: 120,
        marginVertical: 24,
        borderRadius: 2,
    },
    subHeading: {
        fontSize: 18,
        lineHeight: 28,
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'Inter-Regular',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 24,
    },
    image: {
        width: '100%',
        height: 400,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        ...Platform.select({
            web: {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            },
            default: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 32,
                elevation: 8,
            },
        }),
    },
});
