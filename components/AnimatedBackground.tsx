import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';

import { colors } from '@/constant/colors';

export const AnimatedBackground = () => {
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(1, { duration: 20000, easing: Easing.linear }),
            -1,
            false
        );

        scale.value = withRepeat(
            withTiming(1.2, { duration: 15000, easing: Easing.inOut(Easing.sin) }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotation.value * 360}deg` },
                { scale: scale.value }
            ],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.gradientContainer, animatedStyle]}>
                <LinearGradient
                    colors={[colors.darkBlue, colors.deepPurple, colors.darkBlue]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                />
            </Animated.View>
            <View style={styles.overlay} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    gradientContainer: {
        width: '200%',
        height: '200%',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
    },
    gradient: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    }
});
