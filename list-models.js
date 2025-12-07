// List available Gemini models
const API_KEY = "AIzaSyCROubqakZ-hyU9m0HyVuga3bNCl_2u2vo"

async function listModels() {
  try {
    console.log('Fetching available models...')
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`)
    
    if (response.ok) {
      const data = await response.json()
      console.log('Available models:')
      data.models?.forEach(model => {
        if (model.supportedGenerationMethods?.includes('generateContent')) {
          console.log(`✅ ${model.name} - ${model.displayName}`)
        }
      })
      
      // Test with the first available model
      const firstModel = data.models?.find(m => 
        m.supportedGenerationMethods?.includes('generateContent')
      )
      
      if (firstModel) {
        console.log(`\nTesting with: ${firstModel.name}`)
        await testModel(firstModel.name)
      }
    } else {
      console.log('Error fetching models:', await response.text())
    }
  } catch (error) {
    console.log('Error:', error.message)
  }
}

async function testModel(modelName) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Hello! Say 'API working' if you can see this."
          }]
        }]
      })
    })

    if (response.ok) {
      const data = await response.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      console.log('✅ SUCCESS! Response:', text)
      console.log(`\n🎉 Use this model in your code: ${modelName}`)
    } else {
      console.log('❌ Test failed:', await response.text())
    }
  } catch (error) {
    console.log('❌ Test error:', error.message)
  }
}

listModels()
