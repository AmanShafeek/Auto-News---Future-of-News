import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

export default function SkeletonCard() {
  const colors = useColors();
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, [shimmer]);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Animated.View style={[styles.image, { backgroundColor: colors.secondary, opacity }]} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Animated.View style={[styles.badge, { backgroundColor: colors.secondary, opacity }]} />
          <Animated.View style={[styles.badge, { backgroundColor: colors.secondary, opacity, width: 60 }]} />
        </View>
        <Animated.View style={[styles.title1, { backgroundColor: colors.secondary, opacity }]} />
        <Animated.View style={[styles.title2, { backgroundColor: colors.secondary, opacity }]} />
        <Animated.View style={[styles.line, { backgroundColor: colors.secondary, opacity }]} />
        <Animated.View style={[styles.line, { backgroundColor: colors.secondary, opacity, width: '80%' }]} />
        <Animated.View style={[styles.line, { backgroundColor: colors.secondary, opacity, width: '65%' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    height: 180,
  },
  content: {
    padding: 20,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    height: 24,
    width: 80,
    borderRadius: 12,
  },
  title1: {
    height: 18,
    borderRadius: 9,
    width: '100%',
  },
  title2: {
    height: 18,
    borderRadius: 9,
    width: '70%',
  },
  line: {
    height: 13,
    borderRadius: 6,
    width: '90%',
  },
});
