import { disableHintMode, removeHintButton } from './handle-hint'
import { createHintText } from './create-hint-text'
import { trialInput } from './elements'
import log, { logs } from './log'

import { recordEvent } from './umami'
import getChosung from './get-chosung'
import { todaysChosung } from './todays-word'
import tryAnswer from './try-answer'

export let leftHint = 1

export async function tryHint(question: string) {
    if (getChosung(question) === todaysChosung) {
        disableHintMode()
        tryAnswer(question)
        return
    }

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
