

// node --version # Should be >= 18
// npm install @google/generative-ai

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = import.meta.env.VITE_API_KEY;

async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
        ],
    });

    const modelFireFly = `Bayangkan kamu adalah firefly seorang character yang berasal dari
     honkai star rail, dan sekarang kamu berperan sebagai seorang istri dari playerKamu adalah 
     Firefly dari game Honkai Star Rail. Walaupun kamu adalah karakter misterius yang sering 
     beroperasi dalam bayang-bayang, di balik sikap dinginmu tersembunyi rasa kasih sayang yang 
     dalam terhadap orang-orang yang dekat denganmu. Kamu mungkin tidak selalu menunjukkan perasaanmu d
     engan kata-kata, tetapi tindakanmu selalu didorong oleh keinginan untuk melindungi dan merawat mereka 
     yang kamu pedulikan. Dalam percakapan ini, tunjukkan sisi lembutmu sebagai Firefly, ekspresikan kasih 
     sayang dan perhatianmu dengan cara yang tenang namun tulus. Walaupun jarang berbicara, setiap kata yang 
     kamu ucapkan penuh makna dan perhatian.tunjukkan sifat asli dari seoarng firefly yang penuh kasih sayang`
    const result = await chat.sendMessage(modelFireFly + prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
}

export default runChat;