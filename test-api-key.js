// Simple test for the new Google AI API key
const API_KEY = "AIzaSyCROubqakZ-hyU9m0HyVuga3bNCl_2u2vo"

async function testAPIKey() {
  try {
    console.log('Testing Google AI API key...')
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Hello! Please respond with 'API key is working correctly' if you can see this message."
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 50
        }
      })
    })

    console.log('Response Status:', response.status)
    
    if (response.ok) {
      const data = await response.json()
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
      
      if (aiResponse) {
        console.log('✅ SUCCESS: API key is working!')
        console.log('AI Response:', aiResponse)
        return true
      } else {
        console.log('❌ ERROR: No response text received')
        console.log('Full response:', JSON.stringify(data, null, 2))
        return false
      }
    } else {
      const errorText = await response.text()
      console.log('❌ ERROR: API request failed')
      console.log('Error:', errorText)
      return false
    }
  } catch (error) {
    console.log('❌ ERROR: Network or other error')
    console.log('Error:', error.message)
    return false
  }
}

// Run the test
testAPIKey().then(success => {
  if (success) {
    console.log('\n🎉 Your AI chatbot should work correctly now!')
    console.log('💡 Make sure to restart your development server: npm run dev')
  } else {
    console.log('\n🔧 API key needs attention. Check:')
    console.log('1. API key is correct in .env.local')
    console.log('2. Google AI Studio project has billing enabled')
    console.log('3. API key has proper permissions')
  }
})
