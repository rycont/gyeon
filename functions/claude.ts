import {
    CFLARE_ACCOUNT_ID,
    ANTHROPIC_API_KEY,
    ANTHROPIC_MODEL_ID,
} from './constants.ts'

export async function getHintFromAnthropic({
    trial,
    correctAnswer,
    chatHistory,
}: {
    trial: string
    correctAnswer: string
    chatHistory: { role: 'user' | 'assistant'; text: string }[]
}) {
    const response = await fetch(
        `https://gateway.ai.cloudflare.com/v1/${CFLARE_ACCOUNT_ID}/gyeon-ai/anthropic/v1/messages`,
        {
            method: 'POST',
            headers: {
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                model: ANTHROPIC_MODEL_ID,
                max_tokens: 1024,
                messages: [
                    ...chatHistory.map((message) => ({
                        role: message.role,
                        content: [
                            {
                                type: 'text',
                                text: message.text,
                            },
                        ],
                    })),
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: trial,
                            },
                        ],
                    },
                    {
                        role: 'assistant',
                        content: [
                            {
                                type: 'text',
                                text: `${correctAnswer.은는} ${trial}보다`,
                            },
                        ],
                    },
                ],
                system: `단어 맞추기 게임을 하자. 정답은 "${correctAnswer}"야. 사람들이 네게 단어를 말할거야. ${correctAnswer.와과} 해당 단어를 비교하는 문장을 써주면 돼. 맞추기 쉽게 길고 풍부하게 비교문장을 써 줘.`,
            }),
        }
    )

    const data = await response.json()
    const sentence = data.content[0].text

    return { sentence, lm: ANTHROPIC_MODEL_ID }
}
