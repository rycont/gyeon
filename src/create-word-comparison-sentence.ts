import todaysWord from './todays-word'
import { userId } from './user'

const { VITE_COMPARE_API_PATH } = import.meta.env

const SESSION_UUID = crypto.randomUUID()

export const chatHistory: {
    role: 'user' | 'assistant'
    text: string
}[] = []

export let firstTrial: string | null = null

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
                session: SESSION_UUID,
                user: userId,
            })
    )

    let sentence = await response.text()

    chatHistory.push({ role: 'user', text: trial })
    chatHistory.push({
        role: 'assistant',
        text: `${answer}는 ${trial}보다${sentence}`,
    })

    if (firstTrial === null && !sentence.includes(answer)) {
        firstTrial = `${trial}보다${sentence}`
    }

    while (sentence.includes(answer)) {
        const leakedIndex = sentence.indexOf(answer)
        sentence =
            sentence.slice(0, leakedIndex) +
            '[LEAKED]' +
            sentence.slice(leakedIndex + answer.length + 2)
    }

    return sentence
}
