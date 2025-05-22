import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

interface InterviewDetailsProps {
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
}

const InterviewDetails: React.FC<InterviewDetailsProps> = ({
                                                               onClose,
                                                               jobTitle,
                                                               setJobTitle,
                                                               yearsOfExp,
                                                               setYearsOfExp,
                                                               jobDescription,
                                                               setJobDescription,
                                                               skills,
                                                               setSkills,
                                                               onSubmit
                                                           }) => {
    return (
        <View className="bg-gray-900 p-6 rounded-xl w-full">
            <Text className="text-white text-xl font-bold mb-4">
                Kick start your journey, Let's fill the details
            </Text>
            <Text style={styles.title} className="text-white p-2">Job Title</Text>
            <TextInput
                placeholder="Ex. Software Developer"
                placeholderTextColor="#aaa"
                className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                value={jobTitle}
                onChangeText={setJobTitle}
            />
            <Text style={styles.title} className="text-white p-2">Years of Experience</Text>

            <TextInput
                placeholder="Ex. 1"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                value={yearsOfExp}
                onChangeText={setYearsOfExp}
            />
            <Text style={styles.title} className="text-white p-2" >Job Description</Text>

            <TextInput
                placeholder="Job Description"
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={4}
                className="bg-gray-800 text-white px-4 py-2 rounded mb-3"
                style={{ textAlignVertical: 'top' }}
                value={jobDescription}
                onChangeText={setJobDescription}
            />
            <Text style={styles.title} className="text-white p-2">Skills</Text>
            <TextInput
                placeholder="Ex. React, TypeScript, SQL"
                placeholderTextColor="#aaa"
                className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
                value={skills}
                onChangeText={setSkills}
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
                    onPress={onSubmit}
                >
                    <Text className="text-white font-bold">Submit</Text>
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
