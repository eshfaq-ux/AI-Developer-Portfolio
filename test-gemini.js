// Test Gemini API directly
const apiKey = "AIzaSyBR2EtaLDPJI7I6GtRyy0nsF9ZOL80VOCU"

async function testGemini() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Say hello and introduce yourself as Ashfaq's AI assistant"
          }]
        }]
      })
    })

    console.log('Status:', response.status)
    const data = await response.json()
    console.log('Response:', JSON.stringify(data, null, 2))
    
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log('AI Response:', data.candidates[0].content.parts[0].text)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

testGemini()
