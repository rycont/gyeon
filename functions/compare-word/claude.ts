import {
    CFLARE_ACCOUNT_ID,
    ANTHROPIC_API_KEY,
    ANTHROPIC_MODEL_ID,
    CFLARE_GATEWAY_ID,
} from '../constants.ts'

export async function getHintFromAnthropic({
    trial,
    correctAnswer,
}: {
    trial: string
    correctAnswer: string
}) {
    const response = await fetch(
        `https://gateway.ai.cloudflare.com/v1/${CFLARE_ACCOUNT_ID}/${CFLARE_GATEWAY_ID}/anthropic/v1/messages`,
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
                    /*
                    ...chatHistory.map((message) => ({
                        role: message.role,
                        content: [
                            {
                                type: 'text',
                                text: message.text,
                            },
                        ],
                    })),*/
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: `정답이 "${trial}"야?`,
                            },
                        ],
                    },
                    {
                        role: 'assistant',
                        content: [
                            {
                                type: 'text',
                                text: `${trial}보다`,
                            },
                        ],
                    },
                ],
                system: `너는 단어 맞추기 게임에 출제자로 참가하고 있어. 문제의 정답은 "${correctAnswer}"야. 사람들이 네게 단어를 말하면, ${correctAnswer.와과} 해당 단어를 비교하는 문장을 창의적이고 간결하게 써주면 돼. 음절을 직접 비교하진 말고, 의미로부터 의미심장하게 은유해줘. 절대로 답변에 정답 단어를 직접 포함하지 마. 그리고 사려깊은 말투를 사용해줘.`,
            }),
        }
    )

    const data = await response.json()
    const sentence = data.content[0].text

    return { sentence, lm: ANTHROPIC_MODEL_ID }
}
