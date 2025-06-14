import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Platform} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { GradientText } from '../components/GradientText';
import { colors } from '@/constant/colors';
import InterviewDetails from '../components/InterviewDetails';
import { useInterviewForm } from '@/hooks/useInterviewForm';
import { getInterviewQuestions } from '@/utils/GeminiAi/genai';
import { LinearGradient } from 'expo-linear-gradient';
import {router} from "expo-router";
import {allInterviewDetails} from "@/utils/db";

const { width } = Dimensions.get('window');
const isSmallScreen = width < 768;

type InterviewFormData = {
    jobTitle: string;
    yearsOfExp: string;
    jobDescription: string;
    skills: string;
};

export const InterviewSection = () => {
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

    const handleSubmit = async () => {
        if (!isFormValid()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        try {
            const formdetails: InterviewFormData = getFormDetails();
            const inputPrompt: string = `Job Title: ${formdetails.jobTitle}
      Years of Experience: ${formdetails.yearsOfExp}
      Job Description: ${formdetails.jobDescription}
      Skills: ${formdetails.skills}

      Generate 2 interview questions based on above given information in json format with answers. Question and answer are fields in json format. Return only the JSON array without any additional text or formatting.

      Expected format:
      [
          {
              "question": "Your question here",
              "answer": "Your answer here"
          }
      ]`;
            const sampleGeminiResponse = [
                {
                    "question": "Can you walk me through your experience with React Native and how you've used it in previous projects?",
                    "answer": "I have 3 years of experience with React Native, developing cross-platform mobile applications. I've worked on projects involving navigation with React Navigation, state management with Redux and Context API, implemented custom components, integrated third-party libraries like react-native-reanimated for animations, and published apps to both iOS and Android app stores. I've also worked with native modules when platform-specific functionality was needed."
                },
                {
                    "question": "How do you handle state management in React Native applications, and what's your preferred approach?",
                    "answer": "For state management, I use a combination of approaches depending on the complexity. For local component state, I use React hooks like useState and useReducer. For global state, I prefer Redux Toolkit for complex applications due to its predictable state updates and excellent debugging tools. For simpler apps, I use React Context API. I also leverage React Query for server state management, which handles caching, synchronization, and background updates efficiently."
                }
            ];

            // const fetchInterviewQuestions = await getInterviewQuestions(inputPrompt);
            // console.log('Successfully received response:', fetchInterviewQuestions);
            const storeInterviewQuestions = await allInterviewDetails({
                jobTitle: formdetails.jobTitle,
                jobExp : formdetails.yearsOfExp,
                jobDescription: formdetails.jobDescription,
                jobSkills : formdetails.skills,
                jsonMockResponse: JSON.stringify(sampleGeminiResponse)
            })


            console.log(`Successfully stored gemini response ${storeInterviewQuestions}`)
            router.push(`/AiInterview?mockId=${storeInterviewQuestions.mockId}`);
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
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
        <View style={styles.container} className="py-9">
            {/*<GlassContainer style={styles.content}>*/}
                <View style={styles.relative}>
                    <Animated.View style={[{width: '100%'}, styles.formContainer, introSectionStyle]} >
                        <View style={styles.centerContent}>
                            <GradientText
                                text="Schedule your AI Interview"
                                style={styles.sectionHeading}
                                colors={[colors.pink, colors.cyan]}
                            />

                            <Text style={styles.warningText}>
                                You cannot undo or cancel your interview once started
                            </Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleToggleSlider}
                            >
                                <LinearGradient
                                    colors={[colors.cyan, colors.purple]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonText}>Get Started</Text>
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
            {/*</GlassContainer>*/}
        </View>
    );
};

export default InterviewSection;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 32,
        minHeight: 500,
    },
    content: {
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
        height : 800,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },

    formScrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },

});
