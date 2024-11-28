import '@std/dotenv/load'

import 'npm:josa-complete'

import { Context } from '@hono/hono'
import { Hono } from '@hono/hono'
import { cors } from '@hono/hono/cors'

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set')
}

const app = new Hono()

app.use(
    cors({
        origin: [
            'https://gyeon.postica.app',
            'https://ideal-chainsaw-rpprrgr7rv3xxq6-5173.app.github.dev',
        ],
    })
)
app.get('/compare-word', async (c: Context) => {
    const trial = c.req.query('trial')
    const correctAnswer = c.req.query('answer')
    const chatHistory = JSON.parse(c.req.query('chat-history')!) as {
        role: 'user' | 'assistant'
        text: string
    }[]

    if (!trial || !correctAnswer) {
        c.status(400)
        return c.text('trial과 answer를 입력해주세요.')
    }

    const response = await fetch(
        'https://gateway.ai.cloudflare.com/v1/151c47aea09345bea53fef9648b8b958/gyeon-ai/anthropic/v1/messages',
        {
            method: 'POST',
            headers: {
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-3-5-haiku-20241022',
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
                system: `단어 맞추기 게임을 하자. 정답은 "${correctAnswer}"야. 사람들이 네게 단어를 말할거야. ${correctAnswer.와과} 해당 단어를 비교해서 창의적인 비교급 문장을 한 문장 써주면 돼. 절대로 답변에 ${correctAnswer.을를} 포함하면 안돼.`,
            }),
        }
    )

    const data = await response.json()
    const sentence = data.content[0].text

    return c.text(sentence)
})

export default app
