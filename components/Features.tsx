import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { AnimatedBackground } from './AnimatedBackground';
import { InfoSection } from './InfoSection';
import { InterviewSection } from './InterviewSection';
import { ResumeSection } from './ResumeSection';

const Features = () => {
    return (
        <View style={styles.container}>
            <AnimatedBackground />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <InfoSection />
                <InterviewSection />
                <ResumeSection />
            </ScrollView>
        </View>
    );
};

export default Features;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    }
});
