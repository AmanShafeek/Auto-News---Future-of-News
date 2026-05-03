import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SourceBadge from '@/components/SourceBadge';
import { useFeed } from '@/context/FeedContext';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { EXPLORE_TOPICS } from '@/data/mockData';
import { router } from 'expo-router';
import { FeedItem } from '@/types';

export default function ExploreScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { feed, likedIds, savedIds } = useFeed();
  const { user, toggleInterest } = useApp();
  const [search, setSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : 0;

  const filtered = feed.filter(item => {
    const matchSearch =
      search === '' ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.topic.toLowerCase().includes(search.toLowerCase());
    const matchTopic = activeTopic === null || item.topic === activeTopic;
    return matchSearch && matchTopic;
  });

  function renderItem({ item }: { item: FeedItem }) {
    return (
      <Pressable
        style={[styles.listItem, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => router.push(`/detail/${item.id}`)}
      >
        <View style={styles.listItemLeft}>
          <View style={styles.listMeta}>
            <SourceBadge source={item.source} />
            <Text style={[styles.readTime, { color: colors.mutedForeground }]}>
              {item.readTime} min
            </Text>
          </View>
          <Text style={[styles.listTitle, { color: colors.foreground }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.listTopic, { color: colors.primary }]}>{item.topic}</Text>
        </View>
        <View style={styles.listItemRight}>
          <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
          {savedIds.has(item.id) && (
            <Feather name="bookmark" size={14} color={colors.primary} />
          )}
          {likedIds.has(item.id) && (
            <Feather name="heart" size={14} color="#00C896" />
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ paddingTop: topPad + 12, paddingBottom: 16, paddingHorizontal: 16, gap: 16 }}>
        <Text style={[styles.heading, { color: colors.foreground }]}>Explore</Text>

        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={16} color={colors.mutedForeground} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground }]}
            placeholder="Search topics, articles..."
            placeholderTextColor={colors.mutedForeground}
            value={search}
            onChangeText={setSearch}
          />
          {search !== '' && (
            <Pressable onPress={() => setSearch('')}>
              <Feather name="x" size={16} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>

        {/* Topic chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={[
              styles.topicChip,
              {
                backgroundColor: activeTopic === null ? colors.primary : colors.card,
                borderColor: activeTopic === null ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setActiveTopic(null)}
          >
            <Text
              style={[
                styles.topicChipText,
                { color: activeTopic === null ? colors.primaryForeground : colors.foreground },
              ]}
            >
              All
            </Text>
          </Pressable>
          {EXPLORE_TOPICS.map(topic => {
            const isActive = activeTopic === topic.name;
            const isFollowed = user.interests.includes(topic.name);
            return (
              <Pressable
                key={topic.id}
                style={[
                  styles.topicChip,
                  {
                    backgroundColor: isActive ? colors.primary : colors.card,
                    borderColor: isActive ? colors.primary : isFollowed ? 'rgba(108,99,255,0.5)' : colors.border,
                  },
                ]}
                onPress={() => setActiveTopic(isActive ? null : topic.name)}
              >
                <Feather
                  name={topic.icon as any}
                  size={12}
                  color={isActive ? colors.primaryForeground : isFollowed ? colors.primary : colors.mutedForeground}
                />
                <Text
                  style={[
                    styles.topicChipText,
                    { color: isActive ? colors.primaryForeground : colors.foreground },
                  ]}
                >
                  {topic.name}
                </Text>
                {isFollowed && !isActive && (
                  <View style={[styles.followedDot, { backgroundColor: colors.primary }]} />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { paddingBottom: botPad + 90 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="search" size={32} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No results found
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    padding: 0,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  topicChipText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  followedDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginLeft: 2,
  },
  list: {
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginVertical: 4,
    gap: 12,
  },
  listItemLeft: {
    flex: 1,
    gap: 6,
  },
  listItemRight: {
    alignItems: 'center',
    gap: 6,
  },
  listMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  readTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  listTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 21,
  },
  listTopic: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  separator: {
    height: 0,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});
