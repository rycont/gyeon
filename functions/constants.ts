import '@std/dotenv/load'

export const ANTHROPIC_MODEL_ID = 'claude-3-5-haiku-20241022'
export const CFLARE_ACCOUNT_ID = '151c47aea09345bea53fef9648b8b958'
export const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')!

if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set')
}
