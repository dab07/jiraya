import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from "react-native-reanimated";

const screenWidth = Dimensions.get('window').width;

const InterviewDetails = ({ onClose }) => {
    return (
        <View className="bg-gray-900 p-6 rounded-xl w-full">
            <Text className="text-white text-xl font-bold mb-4">
                Kick start your journey, Lesgo fill the details33
            </Text>

            <TextInput
                placeholder="Ex. Software Developer"
                placeholderTextColor="#aaa"
                className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                // onChange={(e) => setJobTitle(e.target.value)}
            />

            <TextInput
                placeholder="Ex. 1"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
            />

            <TextInput
                placeholder="Job Description"
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={4}
                className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                style={{ textAlignVertical: 'top' }}
            />

            <TextInput
                placeholder="Ex. React, TypeScript, SQL"
                placeholderTextColor="#aaa"
                className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
            />

            <View className="flex-row justify-between mt-2">
                <TouchableOpacity
                    className="bg-red-500 px-6 py-3 rounded-lg"
                    onPress={onClose}
                >
                    <Text className="text-white font-bold">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-cyan-500 px-6 py-3 rounded-lg"
                >
                    <Text className="text-white font-bold">Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Features = () => {
    const [showSlider, setShowSlider] = useState(false);
    const translateX = useSharedValue(0);

    const[jobTitle, setJobTitle] = useState<string>('')

    const handleToggleSlider = () => {
        if (!showSlider) {
            // Opening the form
            setShowSlider(true);
            translateX.value = withTiming(-screenWidth, {
                duration: 500,
                easing: Easing.inOut(Easing.cubic)
            });
        } else {
            // Closing the form
            translateX.value = withTiming(0, {
                duration: 500,
                easing: Easing.inOut(Easing.cubic)
            });
            setTimeout(() => setShowSlider(false), 500);
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
                {/* Introduction Section */}
                <Animated.View
                    style={[styles.fullSize, introSectionStyle]}
                    className="absolute flex justify-center items-center"
                >
                    <Text style={styles.heading2} className="text-white">Schedule your Ai Interview</Text>
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

                {/* Form Section */}
                {showSlider && (
                    <Animated.View
                        style={[styles.fullSize, formSectionStyle]}
                        className="absolute flex justify-center items-center px-6"
                    >
                        <View className="w-full max-w-lg">
                            <InterviewDetails onClose={handleToggleSlider} />
                        </View>
                    </Animated.View>
                )}
            </View>

            <View style={styles.interview} className="bg-black relative overflow-hidden">
                {/* Introduction Section */}
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
                        <Text className="text-white text-center font-bold">Lets get started</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Form Section */}
                {showSlider && (
                    <Animated.View
                        style={[styles.fullSize, formSectionStyle]}
                        className="absolute flex justify-center items-center px-6"
                    >
                        <View className="w-full max-w-lg">
                            <InterviewDetails onClose={handleToggleSlider} />
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
