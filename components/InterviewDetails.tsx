import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';

type InterviewDetailsProps = {
    onClose: () => void;
    jobTitle: string;
    setJobTitle: (value: string) => void;
    yearsOfExp: string;
    setYearsOfExp: (value: string) => void;
    jobDescription: string;
    setJobDescription: (value: string) => void;
    skills: string;
    setSkills: (value: string) => void;
    onSubmit: () => void;
    loading?: boolean;
}

const InterviewDetails = ({
                                                                onClose,
                                                                jobTitle,
                                                                setJobTitle,
                                                                yearsOfExp,
                                                                setYearsOfExp,
                                                                jobDescription,
                                                                setJobDescription,
                                                                skills,
                                                                setSkills,
                                                                onSubmit,
                                                                loading = false,
                                                           } : InterviewDetailsProps) => {
    return (
        <View className="bg-gray-900 p-6 rounded-xl w-full">
            <Text className="text-white text-xl font-bold mb-4">
                Kick start your journey, Let's fill the details
            </Text>

            <TextInput
                placeholder="Ex. Software Developer"
                placeholderTextColor="#aaa"
                className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                value={jobTitle}
                onChangeText={setJobTitle}
                editable={!loading}
            />

            <TextInput
                placeholder="Ex. 1"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                value={yearsOfExp}
                onChangeText={setYearsOfExp}
                editable={!loading}
            />

            <TextInput
                placeholder="Job Description"
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={4}
                className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                style={{ textAlignVertical: 'top' }}
                value={jobDescription}
                onChangeText={setJobDescription}
                editable={!loading}
            />

            <TextInput
                placeholder="Ex. React, TypeScript, SQL"
                placeholderTextColor="#aaa"
                className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
                value={skills}
                onChangeText={setSkills}
                editable={!loading}
            />

            <View className="flex-row justify-between mt-2">
                <TouchableOpacity
                    className="bg-red-500 px-6 py-3 rounded-lg"
                    onPress={onClose}
                    disabled={loading}
                    style={{ opacity: loading ? 0.5 : 1 }}
                >
                    <Text className="text-white font-bold">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-cyan-500 px-6 py-3 rounded-lg"
                    onPress={onSubmit}
                    disabled={loading}
                    style={{ opacity: loading ? 0.5 : 1 }}
                >
                    {loading ? (
                        <View className="flex-row items-center">
                            <ActivityIndicator size="small" color="white" />
                            <Text className="text-white font-bold ml-2">Generating...</Text>
                        </View>
                    ) : (
                        <Text className="text-white font-bold">Submit</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        flex: 1,
    }
})

export default InterviewDetails;
