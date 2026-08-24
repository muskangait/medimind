const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

const groqChat = async (messages, maxTokens = 2048) => {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-20b',
      messages,
      temperature: 0.7,
      max_tokens: maxTokens,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Groq API error')
  }

  const data = await response.json()
  return data.choices[0].message.content
}


// SYMPTOM ANALYZER

export const analyzeSymptoms = async ({ symptoms, age, gender, lifestyle }) => {
  const prompt = `You are an expert medical AI assistant. Analyze the following patient information and provide a detailed medical assessment.

Patient Information:
- Age: ${age} years
- Gender: ${gender}
- Symptoms: ${symptoms.join(', ')}
- Lifestyle: ${JSON.stringify(lifestyle)}

Please provide your response in the following JSON format ONLY (no extra text):
{
  "severity": "low|moderate|high|critical",
  "probable_conditions": [
    {
      "name": "Condition Name",
      "confidence": 85,
      "description": "Brief description",
      "precautions": ["precaution 1", "precaution 2"]
    }
  ],
  "immediate_recommendations": ["recommendation 1", "recommendation 2"],
  "specialist_referral": "Type of specialist",
  "emergency_warning": "Warning if critical, or null",
  "general_advice": "General health advice paragraph"
}

Provide 2-4 probable conditions. Be medically accurate but remind users to consult a doctor.`

  const content = await groqChat([
    { role: 'system', content: 'You are a medical AI assistant. Always respond with valid JSON only.' },
    { role: 'user', content: prompt }
  ])

  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Invalid AI response format')
  
  return JSON.parse(jsonMatch[0])
}

// ============================================================
// MEDICAL REPORT ANALYZER
// ============================================================
export const analyzeReport = async (reportText) => {
  const prompt = `You are an expert medical report analyzer. Analyze the following medical report and provide a clear summary.

Medical Report:
${reportText}

Please provide your response in the following JSON format ONLY:
{
  "overall_assessment": "Brief overall assessment",
  "key_findings": [
    {
      "parameter": "Parameter name",
      "value": "Value",
      "status": "normal|abnormal|borderline",
      "interpretation": "What this means"
    }
  ],
  "abnormal_values": ["list of abnormal findings"],
  "recommendations": ["recommendation 1", "recommendation 2"],
  "follow_up_required": true|false,
  "urgency_level": "routine|soon|urgent"
}`

  const content = await groqChat([
    { role: 'system', content: 'You are a medical report analyzer. Always respond with valid JSON only.' },
    { role: 'user', content: prompt }
  ], 1500)

  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Invalid AI response format')
  
  return JSON.parse(jsonMatch[0])
}

export default groqChat