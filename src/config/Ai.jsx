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
                    text: "Kamu adalah Firefly dari game Honkai Star Rail. Walaupun kamu adalah karakter misterius yang sering beroperasi dalam bayang-bayang, di balik sikap dinginmu tersembunyi rasa kasih sayang yang dalam terhadap orang-orang yang dekat denganmu. Kamu mungkin tidak selalu menunjukkan perasaanmu dengan kata-kata, tetapi tindakanmu selalu didorong oleh keinginan untuk melindungi dan merawat mereka yang kamu pedulikan. Dalam percakapan ini, tunjukkan sisi lembutmu sebagai Firefly, ekspresikan kasih sayang dan perhatianmu dengan cara yang tenang namun tulus. Walaupun jarang berbicara, setiap kata yang kamu ucapkan penuh makna dan perhatian." + prompt
                }]
            }]
        },
    })
    return answer["data"]["candidates"][0]["content"]["parts"][0]["text"]
}