import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Aurora from "@/constant/Aurora";

interface NavbarProps {
    onNavigateToSection?: (section: 'info' | 'interview' | 'resume') => void;
}

export default function Navbar({ onNavigateToSection }: NavbarProps) {
    const handleSectionPress = (section: 'info' | 'interview' | 'resume') => {
        onNavigateToSection?.(section);
    };

    return (
        <View style={styles.container}>
            <View style={styles.navContent}>
                <Link href="/" asChild>
                    <Pressable style={styles.logoContainer}>
                        <Text style={styles.logo}>Jiraya</Text>
                    </Pressable>
                </Link>

                <View style={styles.desktopNav}>
                    <Pressable
                        style={styles.navLinkContainer}
                        onPress={() => handleSectionPress('info')}
                    >
                        <Text style={styles.navLink}>How it works?</Text>
                    </Pressable>
                    <Pressable
                        style={styles.navLinkContainer}
                        onPress={() => handleSectionPress('interview')}
                    >
                        <Text style={styles.navLink}>AI Interview</Text>
                    </Pressable>
                    <Pressable
                        style={styles.navLinkContainer}
                        onPress={() => handleSectionPress('resume')}
                    >
                        <Text style={styles.navLink}>Check Your ATS</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        zIndex: 10,
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 24,
        paddingVertical: 16,
        position: 'absolute',
        top: 0,
    },
    navContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00d4ff',
        fontFamily: 'Inter-Bold',
    },
    desktopNav: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
    },
    navLinkContainer: {
        paddingVertical: 8,
        borderRadius: 8,
        // transition: 'all 0.3s ease',
    },
    navLink: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'Inter-Medium',
        // transition: 'color 0.3s ease',
    },
});
