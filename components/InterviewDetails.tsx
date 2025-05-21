import {View, Text, TextInput} from "react-native";

const InterviewDetails = () => {
    return (
        <View className="bg-gray-800 rounded-xl p-6 mt-8 border-2 border-cyan-300">
            <Text className="text-2xl text-white mb-4">Mock Interview Details</Text>
            <Text className="text-gray-200 mb-3">Our AI-powered interview simulation helps you prepare for:</Text>
            <View className="ml-4 mb-4">
                <TextInput className="text-gray-200 mb-2">• Technical interviews with coding challenges</TextInput>
                <TextInput className="text-gray-200 mb-2">• Behavioral questions with feedback on your responses</TextInput>
                <TextInput className="text-gray-200 mb-2">• Industry-specific interview preparation</TextInput>
            </View>
            <Text className="text-gray-200">Start a mock interview session and receive detailed feedback to improve your skills.</Text>
        </View>
    )
}
export default InterviewDetails;
