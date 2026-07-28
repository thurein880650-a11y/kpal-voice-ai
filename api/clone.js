export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

    if (!ELEVENLABS_API_KEY) {
      return res.status(500).json({ error: 'API Key မရှိသေးပါ။ Vercel Environment Variable မှာ ထည့်ပေးပါ။' });
    }

    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'content-type': req.headers['content-type'],
      },
      body: req,
      duplex: 'half',
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.detail?.message || 'ElevenLabs API Error' });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

