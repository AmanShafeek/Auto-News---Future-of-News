import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatBubble from '@/components/ChatBubble';
import { useColors } from '@/hooks/useColors';
import { ChatMessage } from '@/types';
import { getAIResponse, SUGGESTED_PROMPTS } from '@/data/mockData';

let msgCounter = 0;

function makeId() {
  msgCounter += 1;
  return `msg_${Date.now()}_${msgCounter}`;
}

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hey, I\'m your NeuroFeed AI. Ask me anything from your feed — trends, explanations, deep dives. What\'s on your mind?',
  timestamp: new Date(),
};

export default function ChatScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const listRef = useRef<FlatList>(null);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  function sendMessage(text: string) {
    if (!text.trim() || isThinking) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const userMsg: ChatMessage = {
      id: makeId(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [userMsg, ...prev]);
    setInput('');
    setIsThinking(true);

    const captured = text.trim();
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: getAIResponse(captured),
        timestamp: new Date(),
      };
      setMessages(prev => [aiMsg, ...prev]);
      setIsThinking(false);
    }, 1400 + Math.random() * 800);
  }

  function renderHeader() {
    if (!isThinking) return null;
    return (
      <View style={[styles.thinkingRow]}>
        <View style={[styles.thinkingBubble, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ThinkingDots color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 12, borderBottomColor: colors.border },
        ]}
      >
        <View style={[styles.aiAvatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.aiAvatarText}>N</Text>
        </View>
        <View>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>NeuroFeed AI</Text>
          <Text style={[styles.headerSub, { color: '#00C896' }]}>Online · Always learning</Text>
        </View>
      </View>

      {/* Suggested prompts — only when empty */}
      {messages.length === 1 && !isThinking && (
        <View style={styles.suggestions}>
          <Text style={[styles.suggestLabel, { color: colors.mutedForeground }]}>
            Try asking...
          </Text>
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <Pressable
              key={i}
              style={[styles.promptChip, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => sendMessage(prompt)}
            >
              <Feather name="zap" size={13} color={colors.primary} />
              <Text style={[styles.promptText, { color: colors.foreground }]}>{prompt}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Messages — inverted FlatList */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatBubble message={item} />}
        inverted
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      />

      {/* Input row */}
      <View
        style={[
          styles.inputRow,
          {
            borderTopColor: colors.border,
            paddingBottom: botPad + 8,
            backgroundColor: colors.background,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]}
          placeholder="Ask anything..."
          placeholderTextColor={colors.mutedForeground}
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={() => sendMessage(input)}
        />
        <Pressable
          style={[
            styles.sendBtn,
            {
              backgroundColor: input.trim() && !isThinking ? colors.primary : colors.secondary,
            },
          ]}
          onPress={() => sendMessage(input)}
          disabled={!input.trim() || isThinking}
        >
          <Feather
            name="send"
            size={18}
            color={input.trim() && !isThinking ? colors.primaryForeground : colors.mutedForeground}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function ThinkingDots({ color }: { color: string }) {
  return (
    <View style={styles.dots}>
      {[0, 1, 2].map(i => (
        <View key={i} style={[styles.dot, { backgroundColor: color }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiAvatarText: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  headerSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  suggestions: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  suggestLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  promptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  promptText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  messageList: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  thinkingRow: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  thinkingBubble: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  dots: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    opacity: 0.8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    maxHeight: 100,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
