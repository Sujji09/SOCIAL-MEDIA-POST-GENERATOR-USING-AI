import React from "react";
import { useState } from "react";
import "./Homepage.css";

function Homepage(){
    const [formData, setFormData] = useState({ rawText: "", platforms: [] });
    const [geminiResponse, setGeminiResponse] = useState("");
    const [parsedResponses, setParsedResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function togglePlatform(value, checked){
        setFormData(prev => ({
            ...prev,
            platforms: checked ? [...prev.platforms, value] : prev.platforms.filter(p => p !== value)
        }))
    }

    async function contactGeminiAPI(){
        if (!formData.rawText.trim()) {
            setError("Please enter some text to generate posts from.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

            // Ask the model to return strict JSON so parsing is reliable.
            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a helpful assistant. Given the raw text and a list of platforms, generate a platform-appropriate social media post for each platform.
Return ONLY a JSON array (no extra commentary) with this exact shape:
[
  {"platform": "Linkedin", "post": "..."},
  {"platform": "Instagram", "post": "..."}
]

Inputs:
rawText: "${formData.rawText.replace(/"/g, '\\"')}"
platforms: "${formData.platforms.join(', ') || 'all'}"

Ensure the JSON is valid and properly escaped. Do not include any surrounding explanation or text.`
                            }
                        ]
                    }
                ]
            };

            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    // Consider moving the API key to an environment variable
                    'X-goog-api-key': 'YOUR_API_KEY'
                },
                body: JSON.stringify(requestBody)
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
                setGeminiResponse(text);
                setParsedResponses(parseResponses(text));
                console.log('GEMINI RESPONSE', text);
            } catch (err) {
                console.error(err);
                setError('Request failed — see console for details.');
            }

        } finally {
            setLoading(false);
        }
    }

    function clearForm(){
        setFormData({ rawText: "", platforms: [] });
        setGeminiResponse("");
        setError("");
    }

    function copyResponse(){
        if (!geminiResponse) return;
        navigator.clipboard?.writeText(geminiResponse);
    }

    // Parse the model response into an array of { platform, post }
    function parseResponses(text){
        if (!text) return [];

        // Try to extract a JSON array from the model output first
        try{
            const jsonMatch = text.match(/\[([\s\S]*?)\]/);
            if (jsonMatch) {
                const jsonStr = jsonMatch[0];
                const parsed = JSON.parse(jsonStr);
                if (Array.isArray(parsed)) {
                    return parsed.map(p => ({ platform: p.platform || p.platformName || 'All', post: p.post || p.content || '' }));
                }
            }
        }catch(e){
            console.warn('JSON parse failed, falling back to regex parser', e);
        }

        // Fallback: old regex-based parser (handles "Platform Name:[name]\npost:[content]")
        const results = [];
        const regex = /Platform Name:\s*\[?(.*?)\]?\s*[\r\n]+post:\s*\[?(.*?)(?=(?:\r?\nPlatform Name:|$))/gis;
        let match;
        while ((match = regex.exec(text)) !== null) {
            const platform = (match[1] || '').trim();
            const post = (match[2] || '').trim();
            if (platform || post) results.push({ platform, post });
        }
        if (results.length === 0 && text.trim()) {
            results.push({ platform: 'All', post: text.trim() });
        }
        return results;
    }

    function copyText(text){
        if (!text) return;
        navigator.clipboard?.writeText(text);
    }

    return(
        <div className="hp-container">
            <header>
                <h1 className="hp-title">Social Post Generator</h1>
                <p className="hp-sub">Paste a raw text and choose platforms — the model will generate platform-appropriate posts.</p>
            </header>

            <main className="hp-main">
                <form className="hp-form" onSubmit={e => e.preventDefault()}>
                    <label htmlFor="rawText">Enter your text here</label>
                    <textarea
                        name="rawText"
                        id="rawText"
                        rows={10}
                        placeholder="Paste or type the raw text you'll base posts on..."
                        onChange={e=> setFormData({...formData, rawText: e.target.value})}
                        value={formData.rawText}
                        className="hp-textarea"
                    />

                    <fieldset className="hp-platforms">
                        <legend>Select platforms</legend>
                        <label><input type="checkbox" value="Linkedin" checked={formData.platforms.includes('Linkedin')} onChange={e=> togglePlatform('Linkedin', e.target.checked)} /> Linkedin</label>
                        <label><input type="checkbox" value="Instagram" checked={formData.platforms.includes('Instagram')} onChange={e=> togglePlatform('Instagram', e.target.checked)} /> Instagram</label>
                        <label><input type="checkbox" value="Twitter" checked={formData.platforms.includes('Twitter')} onChange={e=> togglePlatform('Twitter', e.target.checked)} /> Twitter</label>
                    </fieldset>

                    <div className="hp-actions">
                        <button
                            type="button"
                            className="btn primary"
                            onClick={contactGeminiAPI}
                            disabled={loading || !formData.rawText.trim()}
                        >
                            {loading ? 'Generating…' : 'Generate Posts'}
                        </button>
                        <button type="button" className="btn" onClick={clearForm}>Clear</button>
                    </div>

                    {error && <div className="hp-error" role="alert">{error}</div>}
                </form>

                <section className="hp-output">
                    <h2>Generated Posts</h2>
                    {parsedResponses.length > 0 ? (
                        <div className="platform-grid">
                            {parsedResponses.map((item, idx) => (
                                <div className="platform-card" key={idx}>
                                    <div className="platform-header">
                                        <strong>{item.platform || 'Platform'}</strong>
                                        <button className="btn copy-btn" title="Copy" onClick={() => copyText(item.post)}>Copy</button>
                                    </div>
                                    <pre className="platform-post">{item.post}</pre>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="hp-empty">No generated content yet. Click "Generate Posts" to start.</p>
                    )}
                </section>
            </main>
        </div>
    )
}

export default Homepage;

