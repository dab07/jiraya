import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';

import { InfoSection } from './InfoSection';
import { InterviewSection } from './InterviewSection';
import { ResumeSection } from './ResumeSection';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

interface FeaturesProps {
    onSectionLayout?: (section: 'info' | 'interview' | 'resume', y: number) => void;
    scrollRef?: any;
}
const screenHeight = Dimensions.get('window').height;

const Features = ({ onSectionLayout , scrollRef}: FeaturesProps) => {
    const scrollY = useSharedValue(0);
    const infoSectionRef = useRef<View>(null);
    const interviewSectionRef = useRef<View>(null);
    const resumeSectionRef = useRef<View>(null);


    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const handleInfoLayout = (event: any) => {
        const { y } = event.nativeEvent.layout;
        onSectionLayout?.('info', y);
    };

    const handleInterviewLayout = (event: any) => {
        const { y } = event.nativeEvent.layout;
        onSectionLayout?.('interview', y);
    };

    const handleResumeLayout = (event: any) => {
        const { y } = event.nativeEvent.layout;
        onSectionLayout?.('resume', y);
    };


    return (
        <View style={styles.container}>
            <AnimatedScrollView
                ref={scrollRef}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <View
                    ref={infoSectionRef}
                    onLayout={handleInfoLayout}
                    style={styles.section}
                >
                    <InfoSection />
                </View>

                <View
                    ref={interviewSectionRef}
                    onLayout={handleInterviewLayout}
                    style={styles.section}
                >
                    <InterviewSection />
                </View>

                {/*<View*/}
                {/*    ref={resumeSectionRef}*/}
                {/*    onLayout={handleResumeLayout}*/}
                {/*    style={styles.section}*/}
                {/*>*/}
                {/*    <ResumeSection />*/}
                {/*</View>*/}
            </AnimatedScrollView>

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
    },
    section: {
        minHeight: screenHeight,
        justifyContent: "center",
    },
});
