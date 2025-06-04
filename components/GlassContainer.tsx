import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

interface GlassContainerProps extends ViewProps {
    children: ReactNode;
    intensity?: number;
    style?: any;
}

export const GlassContainer = ({
                                   children,
                                   intensity = 40,
                                   style,
                                   ...rest
                               }: GlassContainerProps) => {
    if (Platform.OS === 'web') {
        const webGlassStyle = {
            backgroundColor: 'rgba(20, 20, 40, 0.5)',
            backdropFilter: 'blur(16px)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
        };

        return (
            <View style={[styles.container, webGlassStyle, style]} {...rest}>
                {children}
            </View>
        );
    }

    return (
        <BlurView intensity={intensity} tint="dark" style={[styles.container, style]} {...rest}>
            <View style={styles.content}>
                {children}
            </View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
    }
});
