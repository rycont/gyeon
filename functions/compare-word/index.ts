import { Context } from '@hono/hono'
import { getHintFromAnthropic } from './claude.ts'
import { kv } from '../kv.ts'

export async function compareWordRoute(c: Context) {
    try {
        const { trial, correctAnswer, user, session, chatHistory } =
            parseQuery(c)

        const { sentence, lm } = await getHintFromAnthropic({
            trial,
            correctAnswer,
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
    } catch (e) {
        if (e instanceof Error) {
            c.status(400)
            return c.text(e.message)
        }
    }
}

function parseQuery(c: Context) {
    const trial = c.req.query('trial')
    const correctAnswer = c.req.query('answer')

    const user = c.req.query('user')
    const session = c.req.query('session')

    const chatHistory = JSON.parse(c.req.query('chat-history')!) as {
        role: 'user' | 'assistant'
        text: string
    }[]

    if (!trial) {
        throw new Error('trial을 입력해주세요.')
    }

    if (!correctAnswer) {
        throw new Error('answer를 입력해주세요.')
    }

    if (!user) {
        throw new Error('user를 입력해주세요.')
    }

    if (!session) {
        throw new Error('session을 입력해주세요.')
    }

    return { trial, correctAnswer, user, session, chatHistory }
}
