import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { SourceType } from '@/types';

const SOURCE_CONFIG: Record<SourceType, { icon: string; color: string }> = {
  YouTube: { icon: 'youtube', color: '#FF0000' },
  Reddit: { icon: 'message-circle', color: '#FF4500' },
  Article: { icon: 'file-text', color: '#00D4FF' },
};

export default function SourceBadge({ source }: { source: SourceType }) {
  const colors = useColors();
  const config = SOURCE_CONFIG[source];

  return (
    <View style={[styles.badge, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
      <Feather name={config.icon as any} size={11} color={config.color} />
      <Text style={[styles.label, { color: colors.mutedForeground }]}>{source}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  label: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  },
});
