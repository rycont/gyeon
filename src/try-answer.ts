import { createWordComparisonSentence } from './create-word-comparison-sentence'
import getChosung from './get-chosung'
import log from './log'
import { showFinishCard } from './show-finish-card'
import todaysWord, { todaysChosung } from './todays-word'

export let trialCounter = 0

export default async function tryAnswer(trial: string) {
    trialCounter++

    if (todaysChosung !== getChosung(trial)) {
        alert(`초성이 ${todaysChosung}이여야 합니다`)
        return
    }

    if (todaysWord === trial) {
        log(`${todaysWord}: 정답입니다!`)
        showFinishCard(trialCounter)

        return
    }

    const comparisonSentence = await createWordComparisonSentence(trial)
    log(`${trial}보다 ${comparisonSentence}`)
}
