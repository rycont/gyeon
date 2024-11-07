import {
    chatHistory,
    createWordComparisonSentence,
} from './create-word-comparison-sentence'
import getChosung from './get-chosung'
import log from './log'
import { showFinishCard } from './show-finish-card'
import todaysWord, { todaysChosung } from './todays-word'

const submitButton = document.getElementById(
    'submit_button'
) as HTMLButtonElement

const answerInput = document.getElementById('answer_input') as HTMLInputElement

export default async function tryAnswer(trial: string) {
    if (todaysChosung !== getChosung(trial)) {
        alert(`초성이 ${todaysChosung}이여야 합니다`)
        return
    }

    answerInput.value = ''

    if (todaysWord === trial) {
        log(`${todaysWord}: 정답입니다!`)
        showFinishCard(chatHistory.length / 2 + 1)

        return
    }

    submitButton.setAttribute('disabled', 'true')
    const comparisonSentence = await createWordComparisonSentence(trial)
    submitButton.removeAttribute('disabled')

    log(`${trial}보다 ${comparisonSentence}`)
}
