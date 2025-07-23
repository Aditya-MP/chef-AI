import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query required' });

  // USDA FoodData Central API call
  const usdaApiKey = 'tXkhmhHam3PS80ltqOqzr9v18WHieVkIoejhdcih';
  const usdaUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${usdaApiKey}`;

  try {
    const response = await fetch(usdaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'USDA API error', details: error });
  }
}
