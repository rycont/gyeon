export async function onRequest(context) {
    const uri = new URL(context.request.url)

    const trial = uri.searchParams.get('trial')
    const correntAnswer = uri.searchParams.get('answer')

    console.log(correntAnswer, trial)

    const ANTHROPIC_API_KEY = context.env.ANTHROPIC_API_KEY

    const response = await fetch('https://api.anthropic.com/v1/messages', {
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
                            text: '도서관',
                        },
                    ],
                },
                {
                    role: 'assistant',
                    content: [
                        {
                            type: 'text',
                            text: '코끼리는',
                        },
                    ],
                },
            ],
            stop_sequences: [correntAnswer],
            system: `단어 맞추기 게임을 하자. 정답은 "${correntAnswer}"야. 사람들이 네게 단어를 말할거야. "${correntAnswer}"와 해당 단어를 비교해서, 창의적인 비교급 문장을 한 문장 써주면 돼.`,
        }),
    })

    const data = await response.json()
    const sentence = data.content[0].text

    return new Response(sentence)
}
