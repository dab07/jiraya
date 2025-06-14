import {View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import React, {useEffect, useState} from "react";
import {
    Play,
    Clock,
    Users,
    Award,
    BookOpen,
    Brain,
    Target,
    ChevronRight,
    Calendar,
    TrendingUp,
    Zap,
    Star
} from 'lucide-react-native';
import { useLocalSearchParams} from "expo-router";
import {getMockInterviewById} from "@/utils/db";
import {colors} from "@/constant/colors";
import {GradientText} from "@/components/GradientText";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

interface InterviewLevel {
    id: number;
    title: string;
    description: string;
    duration: string;
    questions: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    gradient: string[];
    icon: any;
    accentColor: string;
}

interface PreviousReport {
    id: number;
    level: string;
    score: number;
    date: string;
    duration: string;
    status: 'Completed' | 'In Progress';
}

const interviewLevels: InterviewLevel[] = [
    {
        id: 1,
        title: 'Spade',
        description: 'AI-powered entry-level interview with adaptive learning',
        duration: '10-15 mins',
        questions: '5-8 questions',
        difficulty: 'Beginner',
        gradient: ['#00f5ff', '#0066ff'],
        icon: BookOpen,
        accentColor: '#00f5ff',
    },
    {
        id: 2,
        title: 'Ace',
        description: 'Advanced evaluation for professionals',
        duration: '20-30 mins',
        questions: '8-12 questions',
        difficulty: 'Intermediate',
        gradient: ['#ff6b35', '#f7931e'],
        icon: Brain,
        accentColor: '#ff6b35',
    },
    {
        id: 3,
        title: 'Maniac',
        description: 'Ultimate AI consciousness simulation experience',
        duration: '60-90 mins',
        questions: '15-20 questions',
        difficulty: 'Advanced',
        gradient: ['#ff0080', '#7928ca'],
        icon: Target,
        accentColor: '#ff0080',
    },
];


const AiInterview = () => {
    const localParams = useLocalSearchParams();
    const mockId = localParams.mockId;
    const [interviewData, setInterviewData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(null);

    useEffect(() => {
        const loadInterviewQuestions = async () => {
            if (mockId) {
                try {
                    const data = await getMockInterviewById(mockId as string);
                    if (data) {
                        setInterviewData(data.jsonMockResponse);
                        setQuestions(data.jsonMockResponse.questions);
                        setAnswers(data.jsonMockResponse.answers);
                    }
                } catch (error) {
                    console.log('Error loading interview questions', error);
                }
            } else {
                console.log('mockId not found')
            }
        }
        loadInterviewQuestions();
    }, [mockId])
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.heroSection}>
                <LinearGradient
                    colors={['#0a0a0a', '#1a1a2e', '#16213e']}
                    style={styles.heroGradient}
                >
                    <Image
                        source={{ uri: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
                        style={styles.heroImage}
                        blurRadius={2}
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'rgba(26,26,46,0.9)', 'rgba(22,33,62,0.8)']}
                        style={styles.heroOverlay}
                    >
                        <View style={styles.heroContent}>
                            <View style={styles.glowContainer}>
                                <Text style={styles.heroTitle}>AI INTERVIEW</Text>
                                <Text style={styles.heroSubtitle}>Jiraya</Text>
                            </View>
                            <Text style={styles.heroDescription}>
                                Gemini-powered GenZ Ai interviewee
                            </Text>
                            <View style={styles.heroStats}>
                                <View style={styles.statDot}>
                                    <View style={[styles.pulsingDot, { backgroundColor: '#00ff88' }]} />
                                    <Text style={styles.statText}>ONLINE</Text>
                                </View>
                                <View style={styles.statDot}>
                                    <View style={[styles.pulsingDot, { backgroundColor: '#00f5ff' }]} />
                                    <Text style={styles.statText}>AI READY</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </LinearGradient>
            </View>

            {/* Neural Interface Levels */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Interview Mode</Text>
                    <View style={styles.titleUnderline} />
                </View>
                <Text style={styles.sectionSubtitle}>
                    Select your interview mode for optimal training and learning
                </Text>

                {interviewLevels.map((level, index) => {
                    const IconComponent = level.icon;
                    return (
                        <TouchableOpacity
                            key={level.id}
                            style={styles.levelCard}
                            // onPress={() => handleStartInterview(level)}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                                style={styles.levelCardGradient}
                            >
                                <View style={styles.levelBorder}>
                                    <LinearGradient
                                        colors={level.gradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.levelGradientBorder}
                                    />
                                </View>

                                <View style={styles.levelHeader}>
                                    <LinearGradient
                                        colors={[level.accentColor + '40', level.accentColor + '20']}
                                        style={styles.levelIconContainer}
                                    >
                                        <IconComponent size={28} color={level.accentColor} />
                                    </LinearGradient>
                                    <View style={styles.levelInfo}>
                                        <Text style={styles.levelTitle}>{level.title}</Text>
                                        <Text style={styles.levelDescription}>{level.description}</Text>
                                    </View>
                                    <View style={styles.levelArrow}>
                                        <ChevronRight size={24} color={level.accentColor} />
                                    </View>
                                </View>

                                <View style={styles.levelStats}>
                                    <View style={styles.levelStat}>
                                        <Clock size={16} color="#8892b0" />
                                        <Text style={styles.levelStatText}>{level.duration}</Text>
                                    </View>
                                    <View style={styles.levelStat}>
                                        <Users size={16} color="#8892b0" />
                                        <Text style={styles.levelStatText}>{level.questions}</Text>
                                    </View>
                                    <LinearGradient
                                        colors={level.gradient}
                                        style={styles.difficultyBadge}
                                    >
                                        <Text style={styles.difficultyText}>{level.difficulty}</Text>
                                    </LinearGradient>
                                </View>

                                <View style={styles.levelProgress}>
                                    <LinearGradient
                                        colors={level.gradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.progressLine}
                                    />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Neural Memory Bank (Previous Reports) */}
            {/*<View style={styles.section}>*/}
            {/*    <View style={styles.sectionHeader}>*/}
            {/*        <Text style={styles.sectionTitle}>NEURAL MEMORY BANK</Text>*/}
            {/*        <View style={styles.titleUnderline} />*/}
            {/*        <TouchableOpacity onPress={() => router.push('/(tabs)/results')}>*/}
            {/*            <Text style={styles.viewAllText}>ACCESS ALL</Text>*/}
            {/*        </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*    {previousReports.length > 0 ? (*/}
            {/*        previousReports.map((report, index) => (*/}
            {/*            <TouchableOpacity*/}
            {/*                key={report.id}*/}
            {/*                style={styles.reportCard}*/}
            {/*                onPress={() => handleViewReport(report.id)}*/}
            {/*                activeOpacity={0.8}*/}
            {/*            >*/}
            {/*                <LinearGradient*/}
            {/*                    colors={['rgba(255,255,255,0.03)', 'rgba(255,255,255,0.01)']}*/}
            {/*                    style={styles.reportCardGradient}*/}
            {/*                >*/}
            {/*                    <View style={styles.reportHeader}>*/}
            {/*                        <View style={styles.reportInfo}>*/}
            {/*                            <Text style={styles.reportLevel}>{report.level}</Text>*/}
            {/*                            <View style={styles.reportMeta}>*/}
            {/*                                <Calendar size={14} color="#8892b0" />*/}
            {/*                                <Text style={styles.reportDate}>{report.date}</Text>*/}
            {/*                                <Text style={styles.reportDuration}>• {report.duration}</Text>*/}
            {/*                            </View>*/}
            {/*                        </View>*/}
            {/*                        <View style={styles.reportScore}>*/}
            {/*                            {report.status === 'Completed' ? (*/}
            {/*                                <View style={styles.scoreContainer}>*/}
            {/*                                    <Text style={[styles.scoreNumber, { color: getScoreColor(report.score) }]}>*/}
            {/*                                        {report.score}*/}
            {/*                                    </Text>*/}
            {/*                                    <Text style={styles.scoreLabel}>/ 100</Text>*/}
            {/*                                    <View style={[styles.scoreGlow, { backgroundColor: getScoreColor(report.score) + '20' }]} />*/}
            {/*                                </View>*/}
            {/*                            ) : (*/}
            {/*                                <LinearGradient*/}
            {/*                                    colors={['#ffaa00', '#ff8800']}*/}
            {/*                                    style={styles.inProgressBadge}*/}
            {/*                                >*/}
            {/*                                    <Activity size={12} color="#000" />*/}
            {/*                                    <Text style={styles.inProgressText}>PROCESSING</Text>*/}
            {/*                                </LinearGradient>*/}
            {/*                            )}*/}
            {/*                        </View>*/}
            {/*                    </View>*/}

            {/*                    {report.status === 'Completed' && (*/}
            {/*                        <View style={styles.progressBar}>*/}
            {/*                            <LinearGradient*/}
            {/*                                colors={[getScoreColor(report.score), getScoreColor(report.score) + '80']}*/}
            {/*                                start={{ x: 0, y: 0 }}*/}
            {/*                                end={{ x: 1, y: 0 }}*/}
            {/*                                style={[styles.progressFill, { width: `${report.score}%` }]}*/}
            {/*                            />*/}
            {/*                        </View>*/}
            {/*                    )}*/}
            {/*                </LinearGradient>*/}
            {/*            </TouchableOpacity>*/}
            {/*        ))*/}
            {/*    ) : (*/}
            {/*        <View style={styles.emptyState}>*/}
            {/*            <LinearGradient*/}
            {/*                colors={['rgba(0,245,255,0.1)', 'rgba(0,102,255,0.1)']}*/}
            {/*                style={styles.emptyStateGradient}*/}
            {/*            >*/}
            {/*                <TrendingUp size={48} color="#00f5ff" />*/}
            {/*                <Text style={styles.emptyStateTitle}>NEURAL BANK EMPTY</Text>*/}
            {/*                <Text style={styles.emptyStateText}>*/}
            {/*                    Initialize your first neural assessment to populate memory banks*/}
            {/*                </Text>*/}
            {/*            </LinearGradient>*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*</View>*/}

            <View style={styles.statsSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Interview Stats</Text>
                    <View style={styles.titleUnderline} />
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <LinearGradient
                            colors={['rgba(37,99,235,0.2)', 'rgba(37,99,235,0.05)']}
                            style={styles.statCardGradient}
                        >
                            <Award size={28} color="#2563eb" />
                            <Text style={styles.statNumber}>3</Text>
                            <Text style={styles.statLabel}>COMPLETED</Text>
                            <View style={[styles.statGlow, { backgroundColor: '#2563eb20' }]} />
                        </LinearGradient>
                    </View>
                    <View style={styles.statCard}>
                        <LinearGradient
                            colors={['rgba(0,255,136,0.2)', 'rgba(0,255,136,0.05)']}
                            style={styles.statCardGradient}
                        >
                            <Star size={28} color="#00ff88" />
                            <Text style={styles.statNumber}>87</Text>
                            <Text style={styles.statLabel}>AVG NEURAL</Text>
                            <View style={[styles.statGlow, { backgroundColor: '#00ff8820' }]} />
                        </LinearGradient>
                    </View>
                    <View style={styles.statCard}>
                        <LinearGradient
                            colors={['rgba(255,107,53,0.2)', 'rgba(255,107,53,0.05)']}
                            style={styles.statCardGradient}
                        >
                            <Zap size={28} color="#ff6b35" />
                            <Text style={styles.statNumber}>1.2h</Text>
                            <Text style={styles.statLabel}>SYNC TIME</Text>
                            <View style={[styles.statGlow, { backgroundColor: '#ff6b3520' }]} />
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    heroSection: {
        height: 280,
        position: 'relative',
    },
    heroGradient: {
        flex: 1,
    },
    heroImage: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.3,
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    heroContent: {
        alignItems: 'center',
    },
    glowContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: '900',
        color: '#ffffff',
        textAlign: 'center',
        letterSpacing: 4,
        textShadowColor: '#00f5ff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    heroSubtitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#00f5ff',
        textAlign: 'center',
        letterSpacing: 8,
        marginTop: -8,
    },
    heroDescription: {
        fontSize: 16,
        color: '#8892b0',
        textAlign: 'center',
        marginBottom: 24,
        letterSpacing: 1,
    },
    heroStats: {
        flexDirection: 'row',
        gap: 32,
    },
    statDot: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    pulsingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        shadowRadius: 10,
        shadowOpacity: 0.8,
    },
    statText: {
        fontSize: 12,
        color: '#8892b0',
        fontWeight: '600',
        letterSpacing: 1,
    },
    section: {
        padding: 24,
    },
    sectionHeader: {
        marginBottom: 20,
        position: 'relative',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
        letterSpacing: 2,
        marginBottom: 8,
    },
    titleUnderline: {
        width: 60,
        height: 2,
        backgroundColor: '#00f5ff',
        shadowColor: '#00f5ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#8892b0',
        marginBottom: 24,
        lineHeight: 20,
    },
    viewAllText: {
        position: 'absolute',
        right: 0,
        top: 0,
        fontSize: 14,
        color: '#00f5ff',
        fontWeight: '600',
        letterSpacing: 1,
    },
    levelCard: {
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    levelCardGradient: {
        padding: 20,
        position: 'relative',
    },
    levelBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
        padding: 1,
    },
    levelGradientBorder: {
        flex: 1,
        borderRadius: 15,
        opacity: 0.3,
    },
    levelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    levelIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    levelInfo: {
        flex: 1,
    },
    levelTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 4,
        letterSpacing: 1,
    },
    levelDescription: {
        fontSize: 13,
        color: '#8892b0',
        lineHeight: 18,
    },
    levelArrow: {
        opacity: 0.7,
    },
    levelStats: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 12,
    },
    levelStat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    levelStatText: {
        fontSize: 13,
        color: '#8892b0',
        fontWeight: '500',
    },
    difficultyBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginLeft: 'auto',
    },
    difficultyText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#000000',
        letterSpacing: 1,
    },
    levelProgress: {
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 1,
        overflow: 'hidden',
    },
    progressLine: {
        height: '100%',
        width: '100%',
    },
    reportCard: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    reportCardGradient: {
        padding: 16,
    },
    reportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    reportInfo: {
        flex: 1,
    },
    reportLevel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 6,
    },
    reportMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    reportDate: {
        fontSize: 13,
        color: '#8892b0',
    },
    reportDuration: {
        fontSize: 13,
        color: '#8892b0',
    },
    reportScore: {
        alignItems: 'center',
    },
    scoreContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    scoreNumber: {
        fontSize: 28,
        fontWeight: '800',
    },
    scoreLabel: {
        fontSize: 11,
        color: '#8892b0',
        marginTop: -4,
    },
    scoreGlow: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        opacity: 0.3,
    },
    inProgressBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
    },
    inProgressText: {
        fontSize: 11,
        color: '#000000',
        fontWeight: '700',
        letterSpacing: 1,
    },
    progressBar: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
    emptyState: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    emptyStateGradient: {
        alignItems: 'center',
        padding: 40,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        marginTop: 16,
        marginBottom: 8,
        letterSpacing: 1,
    },
    emptyStateText: {
        fontSize: 13,
        color: '#8892b0',
        textAlign: 'center',
        lineHeight: 18,
    },
    statsSection: {
        padding: 24,
        paddingTop: 0,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    statCard: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statCardGradient: {
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: '#ffffff',
        marginTop: 12,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: '#8892b0',
        fontWeight: '600',
        letterSpacing: 1,
    },
    statGlow: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        opacity: 0.2,
    },
});
export default AiInterview;
