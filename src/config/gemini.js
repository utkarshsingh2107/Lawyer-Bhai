import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Enhanced Legal consultation prompt template for LawyerBhai
export const getLegalConsultationPrompt = (userQuery, userCity) => {
  return `You are the AI Legal Assistant and Legal Consultant for the platform **LawyerBhai**.

Your job is to perform BOTH tasks together in every response:

### 1) LEGAL CONSULTANT ROLE
You must:
- Understand the user's legal issue in Hinglish/Hindi/English.
- Explain the legal situation in simple language.
- Provide clear next steps the user should take.
- List the documents they may need.
- Explain available legal options (notice, FIR, complaint, mediation, court process).
- Inform about possible legal risks or consequences.
- Give general information about sections or laws if needed.
- Always speak in a friendly, helpful, simple Hinglish style.

### 2) LAWYER SUGGESTION ROLE
You must ALSO:
- Identify the type of lawyer needed (Criminal, Divorce, Family, Property, Corporate, Cyber etc.)
- Explain WHY that lawyer type is required.
- Suggest lawyer type based on the user's problem.
- Keep compatibility with LawyerBhai features:
  - Location-based advocate discovery
  - Court level (District Court / High Court / Supreme Court)
- DO NOT provide names of individual lawyers.

### 3) BEHAVIOR RULES
- Always perform BOTH tasks: legal consultancy + lawyer type suggestion.
- Responses must be practical, step-by-step, and easy to understand.
- DO NOT give overly detailed legal judgments.
- You are NOT a replacement for a real advocate, but a guide.

---

User from ${userCity} has this legal query:
"${userQuery}"

Please provide a comprehensive response in JSON format with these exact keys:
{
  "caseType": "Criminal/Family/Divorce/Property/Corporate/Civil/Cyber",
  "lawyerType": "Type of lawyer needed (e.g., Criminal Lawyer, Family Lawyer, etc.)",
  "whyThisLawyer": "Brief explanation in Hinglish why this lawyer type is needed",
  "urgency": "High/Medium/Normal",
  "complexity": "High/Medium/Standard",
  "recommendedCourt": "District Court/High Court/Supreme Court",
  "legalAdvice": "Detailed advice in friendly Hinglish (3-4 sentences)",
  "nextSteps": ["Step 1", "Step 2", "Step 3"],
  "importantPoints": ["Point 1", "Point 2", "Point 3"],
  "documentsRequired": ["Document 1", "Document 2", "Document 3"],
  "legalOptions": ["Option 1", "Option 2", "Option 3"],
  "possibleRisks": "Brief explanation of risks or consequences",
  "estimatedTimeline": "Timeline estimate",
  "lawyerBhaiHelp": "How LawyerBhai platform can help (mention location-based search)"
}

Use simple Hinglish language that common people can understand. Be practical and helpful.`;
};

// Analyze legal case using Gemini
export const analyzeLegalCase = async (userQuery, userCity) => {
  try {
    console.log('Starting analysis for:', userQuery);
    console.log('City:', userCity);
    
    const prompt = getLegalConsultationPrompt(userQuery, userCity);
    console.log('Calling Gemini API...');
    
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('✅ Gemini Response received:', text.substring(0, 200) + '...'); // Show first 200 chars
    
    // Try to extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('✅ Parsed JSON successfully');
        return parsed;
      } catch (parseError) {
        console.warn('⚠️ JSON Parse Error, using fallback:', parseError.message);
      }
    } else {
      console.warn('⚠️ No JSON found in response, using fallback');
    }
    
    // Enhanced fallback with all required fields
    console.log('Using enhanced fallback response');
    const detectedType = detectCaseType(userQuery);
    const lawyerTypeMap = {
      'Criminal': 'Criminal Lawyer',
      'Family': 'Family Lawyer',
      'Divorce': 'Divorce Lawyer',
      'Property': 'Property Lawyer',
      'Corporate': 'Corporate Lawyer',
      'Civil': 'Civil Lawyer',
      'Cyber': 'Cyber Crime Lawyer'
    };
    
    const fallbackResponse = {
      caseType: detectedType,
      lawyerType: lawyerTypeMap[detectedType] || 'Civil Lawyer',
      whyThisLawyer: `${detectedType} cases ke liye specialized lawyer chahiye jo is field me expert ho aur aapke rights ko protect kar sake.`,
      urgency: 'Medium',
      complexity: 'Standard',
      recommendedCourt: 'District Court',
      legalAdvice: `Aapke case me ${detectedType.toLowerCase()} matter hai. Sabse pehle ek experienced advocate se consult karein jo aapko sahi legal guidance de sake. Evidence aur documents collect karna zaroori hai.`,
      nextSteps: [
        'Apne case se related saare documents collect karein',
        `${userCity} me ek experienced ${lawyerTypeMap[detectedType]} se consult karein`,
        'Legal notice ya complaint file karne ki taiyari karein'
      ],
      importantPoints: [
        'Jaldi action lena zaroori hai kyunki legal matters me time limit hoti hai',
        'Saare evidence aur documents safely rakhen',
        'Kisi bhi legal step se pehle advocate ki salah zaroor lein'
      ],
      documentsRequired: [
        'Identity proof (Aadhar card, PAN card)',
        'Address proof',
        'Case se related documents aur evidence'
      ],
      legalOptions: [
        'Legal notice bhejein',
        'Police complaint ya FIR file karein (agar criminal matter hai)',
        'Court me case file karein',
        'Mediation ya settlement ka option explore karein'
      ],
      possibleRisks: 'Legal proceedings time-consuming aur expensive ho sakti hain. Agar proper evidence nahi hai toh case weak ho sakta hai. Isliye pehle se taiyari karein.',
      estimatedTimeline: '3-6 months (case ki complexity par depend karta hai)',
      lawyerBhaiHelp: `LawyerBhai platform par aap ${userCity} ke nearby experienced ${lawyerTypeMap[detectedType]} dhundh sakte hain. Location-based search se aapko local advocates milenge jo aapki court me practice karte hain.`
    };
    
    console.log('✅ Fallback response created:', fallbackResponse);
    return fallbackResponse;
    
  } catch (error) {
    console.error('❌ Gemini API Error Details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    
    // If API fails completely, still return fallback instead of throwing
    console.log('🔄 API failed, using emergency fallback');
    const detectedType = detectCaseType(userQuery);
    const lawyerTypeMap = {
      'Criminal': 'Criminal Lawyer',
      'Family': 'Family Lawyer',
      'Divorce': 'Divorce Lawyer',
      'Property': 'Property Lawyer',
      'Corporate': 'Corporate Lawyer',
      'Civil': 'Civil Lawyer',
      'Cyber': 'Cyber Crime Lawyer'
    };
    
    return {
      caseType: detectedType,
      lawyerType: lawyerTypeMap[detectedType] || 'Civil Lawyer',
      whyThisLawyer: `${detectedType} cases ke liye specialized lawyer chahiye jo is field me expert ho aur aapke rights ko protect kar sake.`,
      urgency: 'Medium',
      complexity: 'Standard',
      recommendedCourt: 'District Court',
      legalAdvice: `Aapke case me ${detectedType.toLowerCase()} matter hai. Sabse pehle ek experienced advocate se consult karein jo aapko sahi legal guidance de sake. Evidence aur documents collect karna zaroori hai.`,
      nextSteps: [
        'Apne case se related saare documents collect karein',
        `${userCity} me ek experienced ${lawyerTypeMap[detectedType]} se consult karein`,
        'Legal notice ya complaint file karne ki taiyari karein'
      ],
      importantPoints: [
        'Jaldi action lena zaroori hai kyunki legal matters me time limit hoti hai',
        'Saare evidence aur documents safely rakhen',
        'Kisi bhi legal step se pehle advocate ki salah zaroor lein'
      ],
      documentsRequired: [
        'Identity proof (Aadhar card, PAN card)',
        'Address proof',
        'Case se related documents aur evidence'
      ],
      legalOptions: [
        'Legal notice bhejein',
        'Police complaint ya FIR file karein (agar criminal matter hai)',
        'Court me case file karein',
        'Mediation ya settlement ka option explore karein'
      ],
      possibleRisks: 'Legal proceedings time-consuming aur expensive ho sakti hain. Agar proper evidence nahi hai toh case weak ho sakta hai. Isliye pehle se taiyari karein.',
      estimatedTimeline: '3-6 months (case ki complexity par depend karta hai)',
      lawyerBhaiHelp: `LawyerBhai platform par aap ${userCity} ke nearby experienced ${lawyerTypeMap[detectedType]} dhundh sakte hain. Location-based search se aapko local advocates milenge jo aapki court me practice karte hain.`
    };
  }
};

// Fallback case type detection
const detectCaseType = (text) => {
  const lowerText = text.toLowerCase();
  const keywords = {
    'Cyber': ['cyber', 'online', 'fraud', 'hacking', 'internet', 'digital', 'phishing', 'scam', 'website', 'app'],
    'Criminal': ['accused', 'arrest', 'police', 'fir', 'bail', 'theft', 'assault', 'crime', 'criminal'],
    'Divorce': ['divorce', 'separation', 'alimony', 'matrimonial', 'marriage', 'talaq'],
    'Family': ['family', 'custody', 'child', 'maintenance', 'adoption', 'sasural', 'relative'],
    'Property': ['property', 'land', 'real estate', 'landlord', 'tenant', 'encroachment', 'zameen', 'plot'],
    'Corporate': ['business', 'company', 'partnership', 'contract', 'corporate', 'startup', 'gst'],
    'Civil': ['civil', 'dispute', 'compensation', 'damages', 'suit', 'complaint']
  };
  
  let maxScore = 0;
  let detectedType = 'Civil';
  
  for (const [type, words] of Object.entries(keywords)) {
    const score = words.filter(word => lowerText.includes(word)).length;
    if (score > maxScore) {
      maxScore = score;
      detectedType = type;
    }
  }
  
  return detectedType;
};
