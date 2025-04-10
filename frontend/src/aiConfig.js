// Secure configuration for AI services
const aiConfig = {
  getGeminiApiKey: () => {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      throw new Error('Gemini API key is missing. Please set REACT_APP_GEMINI_API_KEY environment variable.');
    }
    return process.env.REACT_APP_GEMINI_API_KEY;
  }
};

export default aiConfig;
