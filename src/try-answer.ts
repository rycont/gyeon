import { createWordComparisonSentence } from './create-word-comparison-sentence'
import getChosung from './get-chosung'
import log from './log'
import todaysWord, { todaysChosung } from './todays-word'

let trialCounter = 0

export default async function tryAnswer(trial: string) {
    trialCounter++

    if (todaysChosung !== getChosung(trial)) {
        alert(`초성이 ${todaysChosung}이여야 합니다`)
        return
    }

    if (todaysWord === trial) {
        log(`${todaysWord}: 정답입니다!`)
        prompt(
            '정답입니다! 오늘의 도전을 공유하세요: ',
            `초성이 ${todaysChosung}인 단어를 ${trialCounter}번 만에 맞췄습니다. ${location.origin}`
        )

        return
    }

    const comparisonSentence = await createWordComparisonSentence(trial)
    log(`${trial}보다 ${comparisonSentence}`)
}
