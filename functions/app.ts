import 'npm:josa-complete'

import { Hono } from '@hono/hono'
import { cors } from '@hono/hono/cors'
import { compareWordRoute } from './compare-word/index.ts'
import { hintRoute } from './hint/index.ts'

const app = new Hono()

app.use(
    cors({
        origin: [
            'https://gyeon.postica.app',
            'https://ideal-chainsaw-rpprrgr7rv3xxq6-5173.app.github.dev',
            'https://update-share-message.word-guessing.pages.dev',
        ],
    })
)

app.get('/compare-word', compareWordRoute)
app.get('/get-hint', hintRoute)

export default app
