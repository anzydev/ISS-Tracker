export default async function handler(req, res) {
  const secret = 'neo';
  const encoded = [89,3,89,8,83,9,92,85,88,13,81,10,93,3,93,13,3,12,8,3,13,95,86,87,86,0,89,91,92,88,93,93];
  const apiKey = encoded.map((c, i) => String.fromCharCode(c ^ secret.charCodeAt(i % secret.length))).join('');

  const { category, q } = req.query;

  let url;
  if (q) {
    url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=10&apikey=${apiKey}`;
  } else {
    url = `https://gnews.io/api/v4/top-headlines?category=${category || 'general'}&lang=en&max=5&apikey=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate');
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news', details: error.message });
  }
}
