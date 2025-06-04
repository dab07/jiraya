import React from 'react';
import { Text, StyleSheet, TextProps, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import { colors as themeColors} from '@/constant/colors';

interface GradientTextProps extends TextProps {
    text: string;
    colors?: [string, string, ...string[]];
    startX?: number;
    startY?: number;
    endX?: number;
    endY?: number;
    style?: any;
}

export const GradientText = ({
                                 text,
                                 colors = [themeColors.cyan, themeColors.purple],
                                 startX = 0,
                                 startY = 0,
                                 endX = 1,
                                 endY = 0,
                                 style,
                                 ...rest
                             }: GradientTextProps) => {
    if (Platform.OS === 'web') {
        return (
            <Text
                style={[
                    styles.text,
                    style,
                    {
                        backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    },
                ]}
                {...rest}
            >
                {text}
            </Text>
        );
    }

    // For native platforms
    return (
        <MaskedView
            maskElement={
                <Text style={[styles.text, style]} {...rest}>
                    {text}
                </Text>
            }
        >
            <LinearGradient
                colors={colors}
                start={{ x: startX, y: startY }}
                end={{ x: endX, y: endY }}
                style={styles.gradient}
            >
                <Text style={[styles.text, style, styles.transparent]} {...rest}>
                    {text}
                </Text>
            </LinearGradient>
        </MaskedView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Inter-Bold',
    },
    gradient: {
        flex: 1,
    },
    transparent: {
        opacity: 0,
    },
});
