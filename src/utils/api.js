const ISS_POS_URL = '/api/iss-now';
const ASTROS_URL = '/api/astros';
const GNEWS_BASE = 'https://gnews.io/api/v4';
const GNEWS_KEY = import.meta.env.VITE_NEWS_API_KEY;
const HF_TOKEN = import.meta.env.VITE_AI_TOKEN;

// Originally: mistralai/Mistral-7B-Instruct-v0.2 (no longer available on HF free serverless API)
// Using Qwen2.5-72B-Instruct via HF Inference Providers (OpenAI-compatible endpoint)
const HF_MODEL = 'Qwen/Qwen2.5-72B-Instruct';
const HF_API_URL = 'https://router.huggingface.co/v1/chat/completions';

/* ========================
   ISS APIs
   ======================== */

export async function fetchISSPosition() {
  const res = await fetch(ISS_POS_URL);
  if (!res.ok) throw new Error(`ISS API error: ${res.status}`);
  const data = await res.json();
  return {
    latitude: parseFloat(data.iss_position.latitude),
    longitude: parseFloat(data.iss_position.longitude),
    timestamp: data.timestamp * 1000,
  };
}

export async function fetchAstronauts() {
  const res = await fetch(ASTROS_URL);
  if (!res.ok) throw new Error(`Astros API error: ${res.status}`);
  const data = await res.json();
  return {
    number: data.number,
    people: data.people,
  };
}

export async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=6`,
      { headers: { 'User-Agent': 'ISS-Dashboard/1.0' } }
    );
    if (!res.ok) return 'Unknown Location';
    const data = await res.json();
    return data.display_name || data.address?.country || 'Over Ocean';
  } catch {
    return 'Unknown Location';
  }
}

/* ========================
   NEWS APIs (GNews)
   ======================== */

export async function fetchNews(category = 'general', query = '') {
  let url;
  if (query) {
    url = `${GNEWS_BASE}/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${GNEWS_KEY}`;
  } else {
    url = `${GNEWS_BASE}/top-headlines?category=${category}&lang=en&max=5&apikey=${GNEWS_KEY}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`News API error: ${res.status}`);
  const data = await res.json();
  return (data.articles || []).map((a) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    image: a.image,
    source: a.source?.name || 'Unknown',
    author: a.author || 'Unknown',
    publishedAt: a.publishedAt,
    category,
  }));
}

/* ========================
   AI CHATBOT (Hugging Face — OpenAI-compatible endpoint)
   Uses Qwen2.5-72B-Instruct via HF Inference Providers
   ======================== */

export async function sendChatMessage(messages, systemContext) {
  const chatMessages = buildChatMessages(messages, systemContext);

  const res = await fetch(HF_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: HF_MODEL,
      messages: chatMessages,
      max_tokens: 512,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI API error: ${res.status} — ${err}`);
  }

  const data = await res.json();
  if (data.choices && data.choices[0]?.message?.content) {
    return data.choices[0].message.content.trim();
  }
  throw new Error('Unexpected AI response format');
}

function buildChatMessages(messages, systemContext) {
  const systemMessage = {
    role: 'system',
    content: `You are a dashboard assistant for an ISS Tracking Dashboard. You ONLY answer questions using the data provided below. If a question cannot be answered from this data, say "I can only answer questions about the ISS tracking data and news articles shown on this dashboard." Do not use any outside knowledge. Be concise and helpful.

DASHBOARD DATA:
${systemContext}`,
  };

  // Take last 6 messages for context window
  const recent = messages.slice(-6).map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  return [systemMessage, ...recent];
}
