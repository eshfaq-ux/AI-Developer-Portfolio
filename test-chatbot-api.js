// Test the chatbot API endpoint locally
async function testChatbotAPI() {
  const ports = [3000, 8080]
  
  for (const port of ports) {
    try {
      console.log(`Testing chatbot API on port ${port}...`)
      
      const response = await fetch(`http://localhost:${port}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: "What are Ashfaq's main technical skills?",
          sessionId: 'test-session-123'
        })
      })

      console.log('Status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('\n=== AI Response ===')
        console.log(data.response)
        console.log('\n=== Intent ===')
        console.log(data.intent)
        console.log('\n=== Suggestions ===')
        console.log(data.suggestions)
        console.log('\n=== Performance ===')
        console.log(data.performance)
        return // Success, exit
      } else {
        const error = await response.text()
        console.error('Error:', error)
      }
    } catch (error) {
      console.log(`Port ${port} not available:`, error.message)
    }
  }
  
  console.log('\nNo server found. Make sure your dev server is running.')
  console.log('Run: npm run dev')
}

testChatbotAPI()
