import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useFeed } from '@/context/FeedContext';
import { useColors } from '@/hooks/useColors';
import { WEEKLY_REPORT } from '@/data/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ReportsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user } = useApp();
  const { likedIds } = useFeed();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : 0;
  const report = WEEKLY_REPORT;

  const xpForNextLevel = (user.level) * 500;
  const xpProgress = (user.xp % 500) / 500;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: botPad + 90 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: topPad + 12 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.heading, { color: colors.foreground }]}>Intelligence</Text>
            <Text style={[styles.subheading, { color: colors.mutedForeground }]}>
              Your weekly knowledge digest
            </Text>
          </View>
          <View style={[styles.weekBadge, { backgroundColor: 'rgba(108,99,255,0.15)', borderColor: colors.primary }]}>
            <Feather name="calendar" size={12} color={colors.primary} />
            <Text style={[styles.weekLabel, { color: colors.primary }]}>{report.weekLabel}</Text>
          </View>
        </View>

        {/* Streak + XP hero */}
        <View style={[styles.heroCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.heroGradientTop}>
            <Text style={[styles.streakNumber, { color: colors.foreground }]}>{user.streak}</Text>
            <Text style={[styles.streakLabel, { color: colors.primary }]}>day streak</Text>
            <Feather name="zap" size={18} color={colors.primary} />
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.foreground }]}>{report.totalRead}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>articles read</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.foreground }]}>{user.totalRead}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>total read</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.foreground }]}>{likedIds.size}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>liked</Text>
            </View>
          </View>
        </View>

        {/* XP Level */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Feather name="award" size={16} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Knowledge Level</Text>
          </View>
          <View style={styles.levelRow}>
            <View style={[styles.levelBadge, { backgroundColor: 'rgba(108,99,255,0.2)', borderColor: colors.primary }]}>
              <Text style={[styles.levelNum, { color: colors.primary }]}>Lv.{user.level}</Text>
            </View>
            <View style={styles.xpBarContainer}>
              <View style={[styles.xpBarBg, { backgroundColor: colors.secondary }]}>
                <View style={[styles.xpBarFill, { backgroundColor: colors.primary, width: `${xpProgress * 100}%` as any }]} />
              </View>
              <Text style={[styles.xpLabel, { color: colors.mutedForeground }]}>
                {user.xp} / {xpForNextLevel} XP
              </Text>
            </View>
          </View>
        </View>

        {/* Top Topics */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Feather name="pie-chart" size={16} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Top Topics This Week</Text>
          </View>
          {report.topTopics.map((topic, i) => (
            <View key={i} style={styles.topicRow}>
              <View style={styles.topicMeta}>
                <Text style={[styles.topicRank, { color: colors.mutedForeground }]}>#{i + 1}</Text>
                <Text style={[styles.topicName, { color: colors.foreground }]}>{topic.topic}</Text>
              </View>
              <View style={styles.barArea}>
                <View style={[styles.barBg, { backgroundColor: colors.secondary }]}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        backgroundColor: i === 0 ? colors.primary : i === 1 ? colors.accent : colors.mutedForeground,
                        width: `${topic.percentage * 100}%` as any,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.barCount, { color: colors.mutedForeground }]}>{topic.count}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Highlights */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Feather name="star" size={16} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>This Week's Highlights</Text>
          </View>
          {report.highlights.map((hl, i) => (
            <View key={i} style={styles.highlightRow}>
              <View style={[styles.hlDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.hlText, { color: colors.foreground }]}>{hl}</Text>
            </View>
          ))}
        </View>

        {/* Intelligence Score */}
        <View style={[styles.scoreCard, { backgroundColor: 'rgba(108,99,255,0.1)', borderColor: 'rgba(108,99,255,0.3)' }]}>
          <Text style={[styles.scoreTitle, { color: colors.foreground }]}>
            Your Knowledge Growth
          </Text>
          <Text style={[styles.scoreValue, { color: colors.primary }]}>
            +{Math.round(report.totalRead * 4.3)}%
          </Text>
          <Text style={[styles.scoreDesc, { color: colors.mutedForeground }]}>
            vs. average user this week. Keep the streak alive to unlock Level {user.level + 1}.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
  },
  subheading: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  weekBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  weekLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  heroCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    marginBottom: 16,
  },
  heroGradientTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  streakNumber: {
    fontSize: 48,
    fontFamily: 'Inter_700Bold',
    lineHeight: 52,
  },
  streakLabel: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  divider: {
    height: 1,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statNum: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 36,
  },
  section: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
    gap: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  levelNum: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  xpBarContainer: {
    flex: 1,
    gap: 6,
  },
  xpBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  xpLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 130,
  },
  topicRank: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    width: 22,
  },
  topicName: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    flex: 1,
  },
  barArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  barCount: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    width: 20,
    textAlign: 'right',
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  hlDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 6,
    flexShrink: 0,
  },
  hlText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    flex: 1,
    lineHeight: 21,
  },
  scoreCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    gap: 8,
  },
  scoreTitle: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  scoreValue: {
    fontSize: 48,
    fontFamily: 'Inter_700Bold',
  },
  scoreDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
});
