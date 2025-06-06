import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { GlassContainer } from '../components/GlassContainer';
import { GradientText } from '../components/GradientText';
import { colors } from '@/constant/colors';
import InterviewDetails from '../components/InterviewDetails';
import { useInterviewForm } from '@/hooks/useInterviewForm';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 768;

export const ResumeSection = () => {
    const [showSlider, setShowSlider] = useState(false);
    const translateX = useSharedValue(0);

    const {
        jobTitle,
        setJobTitle,
        yearsOfExp,
        setYearsOfExp,
        jobDescription,
        setJobDescription,
        skills,
        setSkills,
        getFormDetails,
        isFormValid
    } = useInterviewForm();

    const handleToggleSlider = () => {
        if (!showSlider) {
            setShowSlider(true);
            translateX.value = withTiming(-width, {
                duration: 500,
                easing: Easing.inOut(Easing.cubic)
            });
        } else {
            translateX.value = withTiming(0, {
                duration: 500,
                easing: Easing.inOut(Easing.cubic)
            });
            setTimeout(() => setShowSlider(false), 500);
        }
    };

    const handleSubmit = () => {
        // Resume analysis submission logic
        console.log('Resume analysis form submitted');
    };

    const introSectionStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const formSectionStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value + width }],
        };
    });

    return (
        <View style={styles.container}>
            <GlassContainer style={styles.content}>
                <View style={styles.relative}>
                    <Animated.View style={[styles.fullSize, introSectionStyle]} >
                        <View style={styles.centerContent}>
                            <GradientText
                                text="Analyse the power of your Resume"
                                style={styles.sectionHeading}
                                colors={[colors.cyan, colors.pink]}
                            />

                            <Text style={styles.warningText}>
                                Jiraya will guide you to build a strong ATS friendly resume! no worries just keep grinding
                            </Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleToggleSlider}
                            >
                                <LinearGradient
                                    colors={[colors.purple, colors.cyan]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonText}>Let's get started</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    {showSlider && (
                        <Animated.View style={[styles.fullSize, formSectionStyle]}>
                            <View style={styles.formContainer}>
                                <InterviewDetails
                                    onClose={handleToggleSlider}
                                    jobTitle={jobTitle}
                                    setJobTitle={setJobTitle}
                                    yearsOfExp={yearsOfExp}
                                    setYearsOfExp={setYearsOfExp}
                                    jobDescription={jobDescription}
                                    setJobDescription={setJobDescription}
                                    skills={skills}
                                    setSkills={setSkills}
                                    onSubmit={handleSubmit}
                                />
                            </View>
                        </Animated.View>
                    )}
                </View>
            </GlassContainer>
        </View>
    );
};

export default ResumeSection;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 32,
        minHeight: 500,
        marginBottom: 48,
    },
    content: {
        padding: 0,
        height: 500,
    },
    relative: {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    fullSize: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    sectionHeading: {
        fontSize: isSmallScreen ? 32 : 42,
        textAlign: 'center',
        marginBottom: 16,
    },
    warningText: {
        color: colors.pink,
        fontSize: 16,
        marginBottom: 48,
        textAlign: 'center',
        fontFamily: 'Inter-SemiBold',
        maxWidth: 500,
    },
    button: {
        borderRadius: 16,
        overflow: 'hidden',
        minWidth: 200,
        ...Platform.select({
            web: {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            },
            default: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
            },
        }),
    },
    buttonGradient: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontSize: 16,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
});
