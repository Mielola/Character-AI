import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = `${import.meta.env.VITE_API_BASE_URL}?key=${apiKey}`;

export const getAnswer = async (prompt) => {
    const answer = await axios({
        url: `${baseUrl}`,
        method: 'POST',
        data: {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        },
    })
    return answer["data"]["candidates"][0]["content"]["parts"][0]["text"]
}