import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from "react-native-reanimated";
import InterviewDetails from './InterviewDetails';
import { useInterviewForm } from '../hooks/useInterviewForm';
import {getInterviewQuestions} from "@/utils/GeminiAi/genai";
const screenWidth = Dimensions.get('window').width;

type InterviewFormData = {
    jobTitle: string;
    yearsOfExp: string;
    jobDescription: string;
    skills: string;
}

const Features = () => {
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
        resetForm,
        getFormDetails,
        isFormValid
    } = useInterviewForm();

    const handleToggleSlider = () => {
        if (!showSlider) {
            setShowSlider(true);
            translateX.value = withTiming(-screenWidth, {
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
            
            Generate 5 interview questions based on above given information in json format with answers. Question and answer are fields in json format. Return only the JSON array without any additional text or formatting.
        
            Expected format:
            [
                {
                    "question": "Your question here",
                    "answer": "Your answer here"
                }
            ]`;

            console.log('Sending prompt to Gemini API...');
            const fetchInterviewQuestions = await getInterviewQuestions(inputPrompt);
            console.log('Successfully received response:', fetchInterviewQuestions);

            // Handle the successful response here
            // For example: navigate to results screen, store in state, etc.

        } catch (error) {
            console.error('Error in handleSubmit:', error);

            // More specific error messages
            // if (error.message?.includes('API key')) {
            //     Alert.alert('Configuration Error', 'API key is not properly configured');
            // } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
            //     Alert.alert('Network Error', 'Please check your internet connection');
            // } else if (error.message?.includes('JSON')) {
            //     Alert.alert('Response Error', 'Invalid response format from AI service');
            // } else {
            //     Alert.alert('Error', 'Failed to generate interview questions. Please try again.');
            // }
        }
    };

    const introSectionStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const formSectionStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value + screenWidth }],
        };
    });

    return (
        <View className="flex flex-col">
            <View className="bg-gradient-to-b from-black to bg-gray-900 p-8 flex flex-row justify-center items-center">
                <View className="flex flex-col">
                    <Text style={styles.heading} className="text-white shadow-white">Prepare your Interview</Text>
                    <Text style={styles.heading} className="text-white shadow-white">with AI powdered Sensei</Text>
                    <Text style={styles.subHeading} className="text-white shadow-white">Jiraya provides advanced tools designed to help you succeed
                        in your job applications and interviews.</Text>
                </View>
                <Image style={styles.img1} className="px-4 md:mx-10 my-10" source={require('../assets/images/Working Art Cat.jpeg')} />
            </View>

            <View style={styles.interview} className="bg-black relative overflow-hidden">
                <Animated.View
                    style={[styles.fullSize, introSectionStyle]}
                    className="absolute flex justify-center items-center"
                >
                    <Text style={styles.heading2} className="text-white">Schedule your AI Interview</Text>
                    <Text style={styles.subHeading} className="text-red-600 shadow-white pb-10">
                        You cannot undo or cancel your interview once started
                    </Text>

                    <TouchableOpacity
                        className="border-2 border-cyan-300 rounded-xl px-8 py-3"
                        onPress={handleToggleSlider}
                        style={{ minWidth: 200 }}
                    >
                        <Text className="text-white text-center font-bold">Get Started</Text>
                    </TouchableOpacity>
                </Animated.View>

                {showSlider && (
                    <Animated.View
                        style={[styles.fullSize, formSectionStyle]}
                        className="absolute flex justify-center items-center px-6"
                    >
                        <View className="w-full max-w-lg">
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

            <View style={styles.interview} className="bg-black relative overflow-hidden">
                <Animated.View
                    style={[styles.fullSize, introSectionStyle]}
                    className="absolute flex justify-center items-center"
                >
                    <Text style={styles.heading2} className="text-white">Analyse the power of your Resume</Text>
                    <Text style={styles.subHeading} className="text-red-600 shadow-white pb-10">
                        Jiraya will guide you to build a strong ATS friendly resume! no worries just keep grinding
                    </Text>

                    <TouchableOpacity
                        className="border-2 border-cyan-300 rounded-xl px-8 py-3"
                        onPress={handleToggleSlider}
                        style={{ minWidth: 200 }}
                    >
                        <Text className="text-white text-center font-bold">Let's get started</Text>
                    </TouchableOpacity>
                </Animated.View>

                {showSlider && (
                    <Animated.View
                        style={[styles.fullSize, formSectionStyle]}
                        className="absolute flex justify-center items-center px-6"
                    >
                        <View className="w-full max-w-lg">
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
        </View>
    );
};

export default Features;

const styles = StyleSheet.create({
    heading: {
        fontSize: 64,
        fontWeight: 'bold',
    },
    heading2: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    subHeading: {
        fontSize: 24,
        fontWeight: 'light',
        marginTop: 30,
    },
    img1: {
        width: 600,
        height: 600,
        resizeMode: 'cover',
        borderWidth: 1,
        borderTopWidth: 2,
        borderBottomWidth: 0,
        borderRadius: 5,
    },
    interview: {
        width: '100%',
        height: 700,
    },
    fullSize: {
        width: '100%',
        height: '100%',
    }
});
