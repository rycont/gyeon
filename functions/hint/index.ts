import { Context } from '@hono/hono'

import { GoogleGenerativeAI } from '@google/generative-ai'

import {
    CFLARE_ACCOUNT_ID,
    CFLARE_GATEWAY_ID,
    GEMINI_API_KEY,
} from '../constants.ts'

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
const model = genAI.getGenerativeModel(
    { model: 'gemini-2.0-flash-exp' },
    {
        baseUrl: `https://gateway.ai.cloudflare.com/v1/${CFLARE_ACCOUNT_ID}/${CFLARE_GATEWAY_ID}/google-ai-studio`,
    }
)

export async function hintRoute(c: Context) {
    try {
        const { question, answer } = parseRequest(c)
        const hintText = await getHintText(answer, question)

        return c.text(hintText)
    } catch (e) {
        if (e instanceof Error) {
            c.status(400)
            return c.text(e.message)
        }
    }
}

async function getHintText(answer: string, question: string): Promise<string> {
    const { response } = await model.generateContent({
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: question,
                    },
                ],
            },
        ],
        systemInstruction: `너는 단어 맞추기 게임을 하고 있어. 정답은 "${answer}"야. 사용자가 한 질문에 답변을 해주면 되는데, 절대로 답변에 정답 단어를 포함해선 안돼. 게임 진행과 관련이 없는 질문은 가볍게 무시해.`,
    })

    return response.text()
}

function parseRequest(c: Context) {
    const question = c.req.query('question')
    const answer = c.req.query('answer')

    if (!question) {
        throw new Error('question을 입력해주세요.')
    }

    if (!answer) {
        throw new Error('answer를 입력해주세요.')
    }

    return { question, answer }
}
