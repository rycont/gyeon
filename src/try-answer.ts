import { createWordComparisonSentence } from './create-word-comparison-sentence'
import todaysWord, { todaysChosung } from './todays-word'
import { trialInput, submitButton } from './elements'
import { showFinishCard } from './show-finish-card'
import getChosung from './get-chosung'
import log, { logs } from './log'

import { recordEvent } from './umami'

export default async function tryAnswer(trial: string) {
    if (todaysChosung !== getChosung(trial)) {
        alert(`초성이 ${todaysChosung}이여야 합니다`)
        return
    }

    trialInput.value = ''

    if (todaysWord === trial) {
        log(`${todaysWord}: 정답입니다!`)
        showFinishCard(logs.length)

        return
    }

    submitButton.setAttribute('disabled', 'true')
    const comparisonSentence = await createWordComparisonSentence(trial)
    submitButton.removeAttribute('disabled')

    log(`${trial}보다 ${comparisonSentence}`)

    recordEvent('try', {
        trial,
        trialCount: logs.length,
    })
}
