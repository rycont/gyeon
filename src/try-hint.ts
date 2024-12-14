import { disableHintMode, removeHintButton } from './handle-hint'
import { createHintText } from './create-hint-text'
import { trialInput } from './elements'
import log, { logs } from './log'

import { recordEvent } from './umami'

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

    recordEvent('hint', {
        question,
        trialCount: logs.length,
    })
}
