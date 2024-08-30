import getChosung from './get-chosung'

async function getTodaysWord() {
    const words = await (await fetch('/words.raw')).text()
    const processed = words?.split('\n').map((e) => e.replace(/[^가-힣]/g, ''))
    const uniqueWords = [...new Set(processed)]

    const index = getTodaysIndex(uniqueWords.length)
    return uniqueWords[index]
}

function getTodaysIndex(wordsQuantity: number) {
    let date = +new Date()
    const stampWithoutTime = (date - (date % 86400000)) / 86400000
    return stampWithoutTime ** 2 % wordsQuantity
}

const todaysWord = await getTodaysWord()

export default todaysWord
export const todaysChosung = getChosung(todaysWord)
