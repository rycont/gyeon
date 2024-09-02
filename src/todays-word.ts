import getChosung from './get-chosung'

async function getTodaysWord() {
    const words = await (await fetch('/words.raw')).text()
    const processed = words?.split('\n').map((e) => e.replace(/[^가-힣]/g, ''))
    const uniqueWords = [...new Set(processed)]

    const index = getTodaysIndex(uniqueWords.length)
    return uniqueWords[index]
}

function getTodaysIndex(wordsQuantity: number) {
    const date = new Date()
    date.setHours(0, 0, 0, 0)

    const dateString = date.toISOString().split('T')[0]
    let hash = 0
    for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash |= 0
    }
    return Math.abs(hash) % wordsQuantity
}

const todaysWord = await getTodaysWord()

export default todaysWord
export const todaysChosung = getChosung(todaysWord)
