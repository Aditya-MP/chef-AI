import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageBase64 } = req.body;
  if (!imageBase64) return res.status(400).json({ error: 'Image required' });

  // Google Cloud Vision API call
  const visionApiKey = 'AIzaSyAOT3gsttl4uZaCv_0DboBeUyiYHx8vg3Y';
  const visionUrl = `https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`;

  const requestBody = {
    requests: [
      {
        image: { content: imageBase64 },
        features: [{ type: 'LABEL_DETECTION', maxResults: 5 }]
      }
    ]
  };

  try {
    const response = await fetch(visionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Vision API error', details: error });
  }
}
