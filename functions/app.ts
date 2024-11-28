import 'npm:josa-complete'

import { Context } from '@hono/hono'
import { Hono } from '@hono/hono'
import { cors } from '@hono/hono/cors'
import { getHintFromAnthropic } from './claude.ts'

const app = new Hono()
const kv = await Deno.openKv()

app.use(
    cors({
        origin: [
            'https://gyeon.postica.app',
            'https://ideal-chainsaw-rpprrgr7rv3xxq6-5173.app.github.dev',
        ],
    })
)

app.get('/compare-word', async (c: Context) => {
    const { trial, correctAnswer, user, session, chatHistory } = parseQuery(c)

    const { sentence, lm } = await getHintFromAnthropic({
        trial,
        correctAnswer,
        chatHistory,
    })

    const logRecord = {
        user,
        session,
        trial,
        correctAnswer,
        sentence,
        lm,
        trialCounts: chatHistory.length / 2,
    }

    const logKey = ['trial', user, session, chatHistory.length / 2]

    await kv.set(logKey, logRecord)

    return c.text(sentence)
})

function parseQuery(c: Context) {
    const trial = c.req.query('trial')
    const correctAnswer = c.req.query('answer')

    const user = c.req.query('user')
    const session = c.req.query('session')

    const chatHistory = JSON.parse(c.req.query('chat-history')!) as {
        role: 'user' | 'assistant'
        text: string
    }[]

    if (!trial || !correctAnswer) {
        c.status(400)
        return c.text('trial과 answer를 입력해주세요.')
    }

    if (!user || !session) {
        c.status(400)
        return c.text('user와 session을 입력해주세요.')
    }

    return { trial, correctAnswer, user, session, chatHistory }
}

export default app
