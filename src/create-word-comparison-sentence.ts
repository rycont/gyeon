import todaysWord from './todays-word'

const { VITE_COMPARE_API_PATH } = import.meta.env

export const chatHistory: {
    role: 'user' | 'assistant'
    text: string
}[] = []

export async function createWordComparisonSentence(
    trial: string,
    answer: string = todaysWord
): Promise<string> {
    const response = await fetch(
        VITE_COMPARE_API_PATH +
            new URLSearchParams({
                trial,
                answer,
                'chat-history': JSON.stringify(chatHistory),
            })
    )

    let sentence = await response.text()

    chatHistory.push({ role: 'user', text: trial })
    chatHistory.push({
        role: 'assistant',
        text: `${answer}는 ${trial}보다${sentence}`,
    })

    while (sentence.includes(answer)) {
        const leakedIndex = sentence.indexOf(answer)
        sentence =
            sentence.slice(0, leakedIndex) +
            '[LEAKED]' +
            sentence.slice(leakedIndex + answer.length + 2)
    }

    return sentence
}
