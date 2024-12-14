import { createHintText } from './create-hint-text'
import { chatHistory } from './create-word-comparison-sentence'
import { trialInput } from './elements'
import { disableHintMode, removeHintButton } from './handle-hint'
import log from './log'

export async function tryHint(question: string) {
    trialInput.value = ''

    const hintText = await createHintText(question)

    log(`${question}: ${hintText}`)

    umami.track('hint', {
        question,
        trialCount: chatHistory.length / 2 + 1,
    })

    disableHintMode()
    removeHintButton()
}
