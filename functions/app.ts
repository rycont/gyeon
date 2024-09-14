import '@std/dotenv/load'

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
            'https://symmetrical-guide-9qjqwj65rgjc749x-5173.app.github.dev',
        ],
    })
)
app.get('/compare-word', async (c: Context) => {
    const trial = c.req.query('trial')
    const correctAnswer = c.req.query('answer')

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
                model: 'claude-3-5-sonnet-20240620',
                max_tokens: 1024,
                messages: [
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
                                text: `${correctAnswer}는 ${trial}보다`,
                            },
                        ],
                    },
                ],
                stop_sequences: [correctAnswer],
                system: `단어 맞추기 게임을 하자. 정답은 "${correctAnswer}"야. 사람들이 네게 단어를 말할거야. "${correctAnswer}"와 해당 단어를 비교해서, 창의적인 비교급 문장을 한 문장 써주면 돼.`,
            }),
        }
    )

    const data = await response.json()
    console.log(data)
    const sentence = data.content[0].text

    return c.text(sentence)
})

export default app
