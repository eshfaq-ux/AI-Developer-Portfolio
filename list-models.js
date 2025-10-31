// List available Gemini models
const apiKey = "AIzaSyBR2EtaLDPJI7I6GtRyy0nsF9ZOL80VOCU"

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
    
    console.log('Status:', response.status)
    const data = await response.json()
    
    if (data.models) {
      console.log('Available models:')
      data.models.forEach(model => {
        console.log(`- ${model.name} (${model.displayName})`)
        if (model.supportedGenerationMethods) {
          console.log(`  Methods: ${model.supportedGenerationMethods.join(', ')}`)
        }
      })
    } else {
      console.log('Response:', JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

listModels()
