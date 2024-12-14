import { createHintText } from './create-hint-text'
import { chatHistory } from './create-word-comparison-sentence'
import { trialInput } from './elements'
import { disableHintMode, removeHintButton } from './handle-hint'
import log from './log'

export let leftHint = 1

export async function tryHint(question: string) {
    if (leftHint < 1) {
        alert('더 이상 힌트를 사용할 수 없습니다.')
        disableHintMode()
        removeHintButton()

        return
    }

    trialInput.value = ''

    const hintText = await createHintText(question)

    leftHint--
    log(`${question}: ${hintText}`)

    disableHintMode()
    removeHintButton()

    umami.track('hint', {
        question,
        trialCount: chatHistory.length / 2 + 1,
    })
}
