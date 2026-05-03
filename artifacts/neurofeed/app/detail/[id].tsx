import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SourceBadge from '@/components/SourceBadge';
import InsightChip from '@/components/InsightChip';
import { useFeed } from '@/context/FeedContext';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';

type Mode = 'summary' | 'eli5' | 'business' | 'future';

const MODES: { key: Mode; label: string }[] = [
  { key: 'summary', label: 'Summary' },
  { key: 'eli5', label: 'ELI5' },
  { key: 'business', label: 'Business' },
  { key: 'future', label: 'Future' },
];

export default function DetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getItemById, likedIds, savedIds, likeItem, saveItem } = useFeed();
  const { addXP } = useApp();
  const [mode, setMode] = useState<Mode>('summary');

  const item = getItemById(id ?? '');

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  if (!item) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Feather name="alert-circle" size={36} color={colors.mutedForeground} />
        <Text style={[styles.notFoundText, { color: colors.mutedForeground }]}>Article not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const isLiked = likedIds.has(item.id);
  const isSaved = savedIds.has(item.id);

  const thumbnailSrc =
    item.thumbnail === 'ai'
      ? require('@/assets/images/placeholder_ai.png')
      : item.thumbnail === 'business'
      ? require('@/assets/images/placeholder_business.png')
      : null;

  function getContent() {
    switch (mode) {
      case 'eli5':
        return item?.eli5 ?? 'No ELI5 available.';
      case 'business':
        return item?.businessImpact ?? 'No business impact analysis available.';
      case 'future':
        return item?.futurePrediction ?? 'No future prediction available.';
      default:
        return item?.summary ?? '';
    }
  }

  function handleLike() {
    likeItem(item.id);
    addXP(10);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  function handleSave() {
    saveItem(item.id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <Pressable style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable
            style={[styles.actionBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleSave}
          >
            <Feather name="bookmark" size={18} color={isSaved ? colors.primary : colors.foreground} />
          </Pressable>
          <Pressable
            style={[styles.actionBtn, { backgroundColor: isLiked ? 'rgba(0,200,150,0.15)' : colors.card, borderColor: isLiked ? '#00C896' : colors.border }]}
            onPress={handleLike}
          >
            <Feather name="heart" size={18} color={isLiked ? '#00C896' : colors.foreground} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: botPad + 24 }}
      >
        {thumbnailSrc && (
          <Image source={thumbnailSrc} style={styles.thumbnail} resizeMode="cover" />
        )}

        <View style={styles.content}>
          {/* Meta */}
          <View style={styles.metaRow}>
            <SourceBadge source={item.source} />
            {item.author && (
              <Text style={[styles.author, { color: colors.mutedForeground }]}>{item.author}</Text>
            )}
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: colors.foreground }]}>{item.title}</Text>

          <View style={styles.metaRow}>
            <View style={[styles.topicBadge, { backgroundColor: 'rgba(108,99,255,0.12)', borderColor: colors.primary }]}>
              <Text style={[styles.topicText, { color: colors.primary }]}>{item.topic}</Text>
            </View>
            <Feather name="clock" size={12} color={colors.mutedForeground} />
            <Text style={[styles.readTime, { color: colors.mutedForeground }]}>
              {item.readTime} min read · {item.publishedAt}
            </Text>
          </View>

          {/* Mode tabs */}
          <View style={[styles.modeTabs, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
            {MODES.map(m => (
              <Pressable
                key={m.key}
                style={[
                  styles.modeTab,
                  mode === m.key && { backgroundColor: colors.primary },
                ]}
                onPress={() => setMode(m.key)}
              >
                <Text
                  style={[
                    styles.modeTabText,
                    { color: mode === m.key ? colors.primaryForeground : colors.mutedForeground },
                  ]}
                >
                  {m.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Mode content */}
          <View style={[styles.contentBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {mode === 'eli5' && (
              <View style={styles.modeIcon}>
                <Text style={[styles.modeIconText, { color: colors.primary }]}>ELI5</Text>
              </View>
            )}
            {mode === 'business' && (
              <View style={styles.modeIcon}>
                <Feather name="trending-up" size={16} color={colors.primary} />
                <Text style={[styles.modeIconLabel, { color: colors.primary }]}>Business Impact</Text>
              </View>
            )}
            {mode === 'future' && (
              <View style={styles.modeIcon}>
                <Feather name="eye" size={16} color={colors.primary} />
                <Text style={[styles.modeIconLabel, { color: colors.primary }]}>Future Prediction</Text>
              </View>
            )}
            <Text style={[styles.contentText, { color: colors.foreground }]}>
              {getContent()}
            </Text>
          </View>

          {/* Key Insights */}
          <View style={styles.insightsSection}>
            <Text style={[styles.insightsLabel, { color: colors.accent }]}>KEY INSIGHTS</Text>
            {item.insights.map((insight, i) => (
              <InsightChip key={i} text={insight} />
            ))}
          </View>

          {/* Like CTA */}
          {!isLiked && (
            <Pressable
              style={[styles.likeBtn, { backgroundColor: 'rgba(0,200,150,0.1)', borderColor: '#00C896' }]}
              onPress={handleLike}
            >
              <Feather name="heart" size={18} color="#00C896" />
              <Text style={[styles.likeBtnText, { color: '#00C896' }]}>Like this — improve your feed (+10 XP)</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  author: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    lineHeight: 32,
  },
  topicBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  topicText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  readTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  modeTabs: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    padding: 4,
    gap: 2,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  modeTabText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  contentBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  modeIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modeIconText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
  },
  modeIconLabel: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
  contentText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
  },
  insightsSection: {
    gap: 6,
  },
  insightsLabel: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.5,
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  likeBtnText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  notFoundText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  backLink: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
});
