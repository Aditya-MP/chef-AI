import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

function ApiDemo() {
  const [geminiPrompt, setGeminiPrompt] = useState('');
  const [geminiResult, setGeminiResult] = useState('');
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [visionResult, setVisionResult] = useState('');
  const [visionLoading, setVisionLoading] = useState(false);
  const [mealDbResult, setMealDbResult] = useState('');
  const [mealDbLoading, setMealDbLoading] = useState(false);
  const [usdaQuery, setUsdaQuery] = useState('');
  const [usdaResult, setUsdaResult] = useState('');
  const [usdaLoading, setUsdaLoading] = useState(false);
  async function callGemini() {
    setGeminiLoading(true);
    setGeminiResult('');
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: geminiPrompt })
      });
      const data = await res.json();
      setGeminiResult(JSON.stringify(data, null, 2));
    } catch {
      setGeminiResult('Error fetching Gemini result.');
    } finally {
      setGeminiLoading(false);
    }
  }

  async function callVision(imageBase64: string) {
    setVisionLoading(true);
    setVisionResult('');
    try {
      const res = await fetch('/api/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 })
      });
      const data = await res.json();
      setVisionResult(JSON.stringify(data, null, 2));
    } catch {
      setVisionResult('Error fetching Vision result.');
    } finally {
      setVisionLoading(false);
    }
  }

  async function callMealDb() {
    setMealDbLoading(true);
    setMealDbResult('');
    try {
      const res = await fetch('/api/mealdb');
      const data = await res.json();
      setMealDbResult(JSON.stringify(data, null, 2));
    } catch {
      setMealDbResult('Error fetching Meal DB result.');
    } finally {
      setMealDbLoading(false);
    }
  }

  async function callUsda() {
    setUsdaLoading(true);
    setUsdaResult('');
    try {
      const res = await fetch('/api/usda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: usdaQuery })
      });
      const data = await res.json();
      setUsdaResult(JSON.stringify(data, null, 2));
    } catch {
      setUsdaResult('Error fetching USDA result.');
    } finally {
      setUsdaLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Chef-AI API Demo</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Gemini API</h2>
        <div className="flex gap-2 mb-2">
          <input className="border rounded px-2 py-1 flex-1" value={geminiPrompt} onChange={e => setGeminiPrompt(e.target.value)} placeholder="Enter prompt" />
          <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={callGemini} disabled={geminiLoading}>{geminiLoading ? <Loader2 className="animate-spin" /> : 'Send'}</button>
        </div>
        <pre className="bg-gray-100 p-2 rounded text-sm max-h-40 overflow-auto">{geminiResult || (geminiLoading ? 'Loading...' : 'No result yet.')}</pre>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Google Cloud Vision API</h2>
        <input type="file" accept="image/*" className="mb-2" onChange={async e => {
          const file = e.target.files?.[0];
          if (file) {
            setVisionLoading(true);
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result?.toString().split(',')[1];
              if (base64) callVision(base64);
            };
            reader.readAsDataURL(file);
          }
        }} />
        <pre className="bg-gray-100 p-2 rounded text-sm max-h-40 overflow-auto">{visionResult || (visionLoading ? 'Loading...' : 'No result yet.')}</pre>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Meal DB API</h2>
        <button className="bg-green-600 text-white px-4 py-1 rounded mb-2" onClick={callMealDb} disabled={mealDbLoading}>{mealDbLoading ? <Loader2 className="animate-spin" /> : 'Get Meal Example'}</button>
        <pre className="bg-gray-100 p-2 rounded text-sm max-h-40 overflow-auto">{mealDbResult || (mealDbLoading ? 'Loading...' : 'No result yet.')}</pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">USDA FoodData Central API</h2>
        <div className="flex gap-2 mb-2">
          <input className="border rounded px-2 py-1 flex-1" value={usdaQuery} onChange={e => setUsdaQuery(e.target.value)} placeholder="Search food" />
          <button className="bg-purple-600 text-white px-4 py-1 rounded" onClick={callUsda} disabled={usdaLoading}>{usdaLoading ? <Loader2 className="animate-spin" /> : 'Search'}</button>
        </div>
        <pre className="bg-gray-100 p-2 rounded text-sm max-h-40 overflow-auto">{usdaResult || (usdaLoading ? 'Loading...' : 'No result yet.')}</pre>
      </section>
    </div>
  );
}

export default ApiDemo;
