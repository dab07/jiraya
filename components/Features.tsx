import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Mic, FileCheck, VideoIcon, LineChart } from 'lucide-react-native';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}



// const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
//     return (
//         <View style={styles.card} className="bg-white p-6 rounded-xl shadow-sm mb-6 md:mb-0 flex-1 mx-2">
//             <View className="bg-primary-50 p-4 rounded-lg w-16 h-16 items-center justify-center mb-4">
//                 {icon}
//             </View>
//             <Text style={styles.cardTitle} className="text-xl text-gray-800 mb-2">{title}</Text>
//             <Text style={styles.cardDescription} className="text-gray-600">{description}</Text>
//         </View>
//     );
// };

// export default function Features() {
//     return (
//         <View style={styles.container} className="px-4 md:px-8 py-16 bg-gray-50">
//             <View className="max-w-7xl mx-auto w-full">
//                 <View className="mb-12 text-center">
//                     <Text style={styles.sectionTitle} className="text-xl text-primary-600 mb-2">FEATURES</Text>
//                     <Text style={styles.heading} className="text-3xl md:text-4xl text-gray-900 mb-4">Why Choose Our Platform</Text>
//                     <Text style={styles.subheading} className="text-lg text-gray-600 max-w-2xl mx-auto">
//                         Advanced tools designed to help you succeed in your job applications and interviews.
//                     </Text>
//                 </View>
//
//                 <View className="flex-col md:flex-row md:flex-wrap">
//                     <FeatureCard
//                         icon={<VideoIcon size={28} color="#3366FF" />}
//                         title="Mock Interviews"
//                         description="Practice with AI-powered interview simulations that provide real-time feedback on your answers."
//                     />
//
//                     <FeatureCard
//                         icon={<FileCheck size={28} color="#3366FF" />}
//                         title="Resume Optimization"
//                         description="Get your resume ATS-optimized with keyword analysis and formatting suggestions."
//                     />
//
//                     <FeatureCard
//                         icon={<Mic size={28} color="#3366FF" />}
//                         title="Speech Analysis"
//                         description="Receive feedback on your speaking pace, clarity, and confidence during interview practice."
//                     />
//
//                     <FeatureCard
//                         icon={<LineChart size={28} color="#3366FF" />}
//                         title="Progress Tracking"
//                         description="Monitor your improvement over time with detailed analytics and personalized tips."
//                     />
//                 </View>
//             </View>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//     },
//     sectionTitle: {
//         fontFamily: 'Inter-Bold',
//     },
//     heading: {
//         fontFamily: 'Inter-Bold',
//     },
//     subheading: {
//         fontFamily: 'Inter-Regular',
//         lineHeight: 28,
//     },
//     card: {
//         width: '100%',
//         maxWidth: '100%',
//     },
//     cardTitle: {
//         fontFamily: 'Inter-Bold',
//     },
//     cardDescription: {
//         fontFamily: 'Inter-Regular',
//         lineHeight: 24,
//     },
// });
