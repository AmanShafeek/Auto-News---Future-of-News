import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useFeed } from '@/context/FeedContext';
import { useColors } from '@/hooks/useColors';
import { EXPLORE_TOPICS } from '@/data/mockData';

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, toggleInterest } = useApp();
  const { likedIds, savedIds } = useFeed();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : 0;

  const xpForLevel = user.level * 500;
  const xpInLevel = user.xp % 500;
  const xpProgress = xpInLevel / 500;

  function onToggleInterest(topic: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleInterest(topic);
  }

  const avatarLetter = user.name.charAt(0).toUpperCase();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: botPad + 90 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: topPad + 12 }}>
        {/* Profile Hero */}
        <View style={styles.heroSection}>
          <View style={[styles.avatarRing, { borderColor: colors.primary }]}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarLetter}>{avatarLetter}</Text>
            </View>
          </View>
          <Text style={[styles.userName, { color: colors.foreground }]}>{user.name}</Text>
          <Text style={[styles.joinDate, { color: colors.mutedForeground }]}>
            Learning since {user.joinedAt}
          </Text>
          <View style={styles.badgesRow}>
            <View style={[styles.badge, { backgroundColor: 'rgba(108,99,255,0.15)', borderColor: colors.primary }]}>
              <Feather name="zap" size={12} color={colors.primary} />
              <Text style={[styles.badgeText, { color: colors.primary }]}>{user.streak} day streak</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: 'rgba(0,212,255,0.1)', borderColor: colors.accent }]}>
              <Feather name="award" size={12} color={colors.accent} />
              <Text style={[styles.badgeText, { color: colors.accent }]}>Level {user.level}</Text>
            </View>
          </View>
        </View>

        {/* XP Progress */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>XP Progress</Text>
            <Text style={[styles.cardValue, { color: colors.primary }]}>{user.xp} XP</Text>
          </View>
          <View style={[styles.progressBg, { backgroundColor: colors.secondary }]}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: colors.primary, width: `${xpProgress * 100}%` as any },
              ]}
            />
          </View>
          <View style={styles.levelRow}>
            <Text style={[styles.levelText, { color: colors.mutedForeground }]}>Lv.{user.level}</Text>
            <Text style={[styles.xpNeeded, { color: colors.mutedForeground }]}>
              {500 - xpInLevel} XP to Lv.{user.level + 1}
            </Text>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Total Read', value: user.totalRead, icon: 'book-open' },
            { label: 'Liked', value: likedIds.size, icon: 'heart' },
            { label: 'Saved', value: savedIds.size, icon: 'bookmark' },
          ].map((stat, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Feather name={stat.icon as any} size={18} color={colors.primary} />
              <Text style={[styles.statNum, { color: colors.foreground }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Interests */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>My Interests</Text>
            <Text style={[styles.cardSubtitle, { color: colors.mutedForeground }]}>
              Tap to follow/unfollow
            </Text>
          </View>
          <View style={styles.interestGrid}>
            {EXPLORE_TOPICS.map(topic => {
              const isFollowed = user.interests.includes(topic.name);
              return (
                <Pressable
                  key={topic.id}
                  style={[
                    styles.interestChip,
                    {
                      backgroundColor: isFollowed ? 'rgba(108,99,255,0.15)' : colors.secondary,
                      borderColor: isFollowed ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => onToggleInterest(topic.name)}
                >
                  <Feather
                    name={topic.icon as any}
                    size={13}
                    color={isFollowed ? colors.primary : colors.mutedForeground}
                  />
                  <Text
                    style={[
                      styles.interestText,
                      { color: isFollowed ? colors.primary : colors.foreground },
                    ]}
                  >
                    {topic.name}
                  </Text>
                  {isFollowed && (
                    <Feather name="check" size={11} color={colors.primary} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Knowledge Graph placeholder */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>Knowledge Graph</Text>
          </View>
          <View style={[styles.graphPlaceholder, { borderColor: colors.border }]}>
            {['AI Research', 'Startups', 'Finance', 'Science', 'Space'].map((node, i) => {
              const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(angle) * 32;
              const y = 50 + Math.sin(angle) * 32;
              const isActive = user.interests.includes(node);
              return (
                <View
                  key={i}
                  style={[
                    styles.graphNode,
                    {
                      left: `${x}%` as any,
                      top: `${y}%` as any,
                      backgroundColor: isActive ? colors.primary : colors.secondary,
                      borderColor: isActive ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.graphNodeText, { color: isActive ? '#fff' : colors.mutedForeground }]} numberOfLines={1}>
                    {node.split(' ')[0]}
                  </Text>
                </View>
              );
            })}
            <View style={[styles.graphCenter, { backgroundColor: 'rgba(108,99,255,0.2)', borderColor: colors.primary }]}>
              <Feather name="user" size={16} color={colors.primary} />
            </View>
          </View>
          <Text style={[styles.graphCaption, { color: colors.mutedForeground }]}>
            Your personal knowledge network — follows your interests
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  avatarRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    padding: 3,
    marginBottom: 4,
  },
  avatar: {
    flex: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
  },
  userName: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
  },
  joinDate: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 12,
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  cardValue: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  progressBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  xpNeeded: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    gap: 6,
  },
  statNum: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  interestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  interestText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  graphPlaceholder: {
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  graphNode: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    transform: [{ translateX: -30 }, { translateY: -12 }],
  },
  graphNodeText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  graphCenter: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -22 }, { translateY: -22 }],
  },
  graphCaption: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
});
