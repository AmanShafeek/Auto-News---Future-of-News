import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SourceBadge from '@/components/SourceBadge';
import InsightChip from '@/components/InsightChip';
import { useApp } from '@/context/AppContext';
import { useFeed } from '@/context/FeedContext';
import { useColors } from '@/hooks/useColors';
import { FeedItem } from '@/types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.28;
const CARD_PADDING = 16;

function FeedCard({
  item,
  onSwipeLeft,
  onSwipeRight,
  onSave,
  isSaved,
  isTop,
  nextCard,
}: {
  item: FeedItem;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSave: () => void;
  isSaved: boolean;
  isTop: boolean;
  nextCard?: FeedItem;
}) {
  const colors = useColors();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTop,
      onMoveShouldSetPanResponder: (_, gs) => isTop && Math.abs(gs.dx) > 5,
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy * 0.1 });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          Animated.timing(pan, {
            toValue: { x: SCREEN_WIDTH * 1.5, y: gesture.dy },
            duration: 280,
            useNativeDriver: true,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            onSwipeRight();
          });
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          Animated.timing(pan, {
            toValue: { x: -SCREEN_WIDTH * 1.5, y: gesture.dy },
            duration: 280,
            useNativeDriver: true,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            onSwipeLeft();
          });
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            tension: 80,
            friction: 10,
          }).start();
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ['-18deg', '0deg', '18deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = pan.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD * 0.5],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const skipOpacity = pan.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD * 0.5, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const thumbnailSrc =
    item.thumbnail === 'ai'
      ? require('@/assets/images/placeholder_ai.png')
      : item.thumbnail === 'business'
      ? require('@/assets/images/placeholder_business.png')
      : null;

  if (!isTop) {
    return (
      <View
        style={[
          styles.card,
          styles.backCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      />
    );
  }

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      {/* Like overlay */}
      <Animated.View style={[styles.overlay, styles.likeOverlay, { opacity: likeOpacity }]}>
        <Text style={styles.overlayText}>LIKE</Text>
      </Animated.View>
      {/* Skip overlay */}
      <Animated.View style={[styles.overlay, styles.skipOverlay, { opacity: skipOpacity }]}>
        <Text style={styles.overlayText}>SKIP</Text>
      </Animated.View>

      {thumbnailSrc && (
        <Image source={thumbnailSrc} style={styles.thumbnail} resizeMode="cover" />
      )}

      <Pressable
        style={styles.cardContent}
        onPress={() => router.push(`/detail/${item.id}`)}
        android_ripple={{ color: 'rgba(255,255,255,0.05)' }}
      >
        <View style={styles.metaRow}>
          <SourceBadge source={item.source} />
          <View style={[styles.topicBadge, { backgroundColor: 'rgba(108,99,255,0.15)', borderColor: colors.primary }]}>
            <Text style={[styles.topicText, { color: colors.primary }]}>{item.topic}</Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.foreground }]}>{item.title}</Text>
        <Text style={[styles.summary, { color: colors.mutedForeground }]} numberOfLines={4}>
          {item.summary}
        </Text>

        <View style={styles.insightsSection}>
          <Text style={[styles.insightsLabel, { color: colors.accent }]}>KEY INSIGHTS</Text>
          {item.insights.map((insight, i) => (
            <InsightChip key={i} text={insight} />
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Feather name="clock" size={12} color={colors.mutedForeground} />
            <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
              {item.readTime} min read
            </Text>
            <Text style={[styles.footerDot, { color: colors.mutedForeground }]}>·</Text>
            <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
              {item.publishedAt}
            </Text>
          </View>
          <Pressable onPress={onSave} hitSlop={12}>
            <Feather
              name={isSaved ? 'bookmark' : 'bookmark'}
              size={20}
              color={isSaved ? colors.primary : colors.mutedForeground}
            />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function FeedScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { feed, likedIds, dislikedIds, savedIds, likeItem, dislikeItem, saveItem } = useFeed();
  const { addXP, addReadCount } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleItems = feed.slice(currentIndex, currentIndex + 2);
  const currentItem = visibleItems[0];
  const allDone = currentIndex >= feed.length;

  function handleSwipeRight() {
    if (!currentItem) return;
    likeItem(currentItem.id);
    addXP(10);
    addReadCount();
    setCurrentIndex(i => i + 1);
  }

  function handleSwipeLeft() {
    if (!currentItem) return;
    dislikeItem(currentItem.id);
    setCurrentIndex(i => i + 1);
  }

  function handleSave() {
    if (!currentItem) return;
    saveItem(currentItem.id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.logo, { color: colors.foreground }]}>Neuro</Text>
          <Text style={[styles.logoAccent, { color: colors.primary }]}>Feed</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.xpBadge, { backgroundColor: 'rgba(108,99,255,0.15)', borderColor: colors.primary }]}>
            <Feather name="zap" size={12} color={colors.primary} />
            <Text style={[styles.xpText, { color: colors.primary }]}>+10 XP per like</Text>
          </View>
        </View>
      </View>

      {/* Card Stack */}
      <View style={[styles.stackArea, { paddingBottom: botPad + 80 }]}>
        {allDone ? (
          <View style={styles.doneContainer}>
            <Feather name="check-circle" size={48} color={colors.primary} />
            <Text style={[styles.doneTitle, { color: colors.foreground }]}>
              You're all caught up
            </Text>
            <Text style={[styles.doneSubtitle, { color: colors.mutedForeground }]}>
              New intelligence arriving soon. Check back later.
            </Text>
            <Pressable
              style={[styles.resetBtn, { backgroundColor: colors.primary }]}
              onPress={() => setCurrentIndex(0)}
            >
              <Text style={[styles.resetBtnText, { color: colors.primaryForeground }]}>Restart Feed</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.stack}>
            {visibleItems.length > 1 && (
              <View style={styles.cardSlot}>
                <FeedCard
                  item={visibleItems[1]}
                  onSwipeLeft={() => {}}
                  onSwipeRight={() => {}}
                  onSave={() => {}}
                  isSaved={false}
                  isTop={false}
                />
              </View>
            )}
            {currentItem && (
              <View style={styles.cardSlot}>
                <FeedCard
                  item={currentItem}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onSave={handleSave}
                  isSaved={savedIds.has(currentItem.id)}
                  isTop
                />
              </View>
            )}
          </View>
        )}
      </View>

      {/* Swipe hint */}
      {!allDone && (
        <View style={[styles.hintRow, { bottom: botPad + 84 }]}>
          <View style={[styles.hintBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="x" size={22} color="#FF4D6D" />
          </View>
          <Text style={[styles.hintLabel, { color: colors.mutedForeground }]}>
            {currentIndex + 1} / {feed.length}
          </Text>
          <View style={[styles.hintBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="heart" size={22} color="#00C896" />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  logoAccent: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  xpText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  stackArea: {
    flex: 1,
    paddingHorizontal: CARD_PADDING,
    paddingTop: 8,
  },
  stack: {
    flex: 1,
    position: 'relative',
  },
  cardSlot: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  backCard: {
    height: 200,
    top: 10,
    left: 8,
    right: 8,
    opacity: 0.5,
    transform: [{ scale: 0.97 }],
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderRadius: 20,
  },
  likeOverlay: {
    backgroundColor: 'rgba(0, 200, 150, 0.25)',
  },
  skipOverlay: {
    backgroundColor: 'rgba(255, 77, 109, 0.25)',
  },
  overlayText: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
    fontSize: 36,
    letterSpacing: 4,
  },
  thumbnail: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 20,
    gap: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
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
  title: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    lineHeight: 27,
  },
  summary: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
  },
  insightsSection: {
    gap: 4,
  },
  insightsLabel: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  footerDot: {
    fontSize: 12,
  },
  hintRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  hintBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    minWidth: 50,
    textAlign: 'center',
  },
  doneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  doneTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  doneSubtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  resetBtn: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 8,
  },
  resetBtnText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
});
