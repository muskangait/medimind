const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

if (!GROQ_API_KEY) {
  throw new Error('Missing Groq API key')
}

export const groqChat = async (messages, options = {}) => {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: options.model || 'llama-3.3-70b-versatile',
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 2048,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Groq API error')
  }

  const data = await response.json()
  return data.choices[0].message.content
}

export default groqChat