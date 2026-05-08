import { useState, useCallback, useEffect } from 'react';
import { sendChatMessage } from '../utils/api';
import { getItem, setItem } from '../utils/storage';

const MAX_MESSAGES = 30;
const STORAGE_KEY = 'chatbot_messages';

export function useChatbot(issData, newsData) {
  const [messages, setMessages] = useState(() => getItem(STORAGE_KEY) || []);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  // Persist messages
  useEffect(() => {
    setItem(STORAGE_KEY, messages.slice(-MAX_MESSAGES));
  }, [messages]);

  // Build system context from dashboard data
  const buildContext = useCallback(() => {
    const parts = [];

    if (issData?.currentPosition) {
      parts.push(`ISS CURRENT POSITION:`);
      parts.push(`- Latitude: ${issData.currentPosition.latitude}`);
      parts.push(`- Longitude: ${issData.currentPosition.longitude}`);
      parts.push(`- Speed: ${issData.currentSpeed} km/h`);
      parts.push(`- Location: ${issData.locationName}`);
      parts.push(`- Positions Tracked: ${issData.positions?.length || 0}`);
    }

    if (issData?.astronauts?.number) {
      parts.push(`\nPEOPLE IN SPACE: ${issData.astronauts.number}`);
      issData.astronauts.people?.forEach((p) => {
        parts.push(`- ${p.name} (${p.craft})`);
      });
    }

    if (newsData?.allArticles?.length) {
      parts.push(`\nNEWS ARTICLES (${newsData.allArticles.length} total):`);
      newsData.allArticles.slice(0, 10).forEach((a, i) => {
        parts.push(`${i + 1}. "${a.title}" — ${a.source} (${a.category})`);
        if (a.description) parts.push(`   Summary: ${a.description.slice(0, 120)}`);
      });
    }

    return parts.join('\n') || 'No dashboard data available yet.';
  }, [issData, newsData]);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    const userMsg = { role: 'user', content, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setError(null);

    try {
      const allMessages = [...messages, userMsg];
      const context = buildContext();
      const reply = await sendChatMessage(allMessages, context);

      const assistantMsg = { role: 'assistant', content: reply, timestamp: Date.now() };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError(err.message);
      const errorMsg = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, buildContext]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setItem(STORAGE_KEY, []);
  }, []);

  return {
    messages,
    isTyping,
    error,
    sendMessage,
    clearChat,
  };
}
