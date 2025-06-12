import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedRef,
    scrollTo,
    withTiming,
    Easing
} from 'react-native-reanimated';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import '../global.css'

export default function Index() {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const [sectionPositions, setSectionPositions] = useState<{
        info: number;
        interview: number;
        resume: number;
    }>({
        info: 0,
        interview: 0,
        resume: 0,
    });

    const handleSectionLayout = (section: 'info' | 'interview' | 'resume', y: number) => {
        setSectionPositions(prev => ({
            ...prev,
            [section]: y,
        }));
    };

    const handleNavigateToSection = (section: 'info' | 'interview' | 'resume') => {
        const targetY = sectionPositions[section];

        // Smooth scroll to section with animation
        scrollTo(scrollRef, 0, targetY, true);
    };

    return (
        <View style={styles.container} className="bg-[#0a0a0a]">
            <Navbar onNavigateToSection={handleNavigateToSection} />
            <Features onSectionLayout={handleSectionLayout}
                      scrollRef={scrollRef}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
