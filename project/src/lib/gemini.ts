import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDz0MqwBEScj3WPg4ljV8UAT0ru_gZ0G4Y");

export async function getGeminiResponse(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Add instructions for bullet points and conciseness
    const formattedPrompt = `Please provide a concise response in bullet points to the following query. Keep each point brief and focused: ${prompt}`;
    
    const result = await model.generateContent(formattedPrompt);
    const response = await result.response;
    
    // Format the response if it doesn't already contain bullets
    let text = response.text();
    if (!text.includes('•') && !text.includes('-')) {
      text = text.split('\n')
        .filter(line => line.trim())
        .map(line => `• ${line}`)
        .join('\n');
    }
    
    return text;
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    return "• I apologize, but I'm having trouble processing your request at the moment.\n• Please try again.";
  }
}