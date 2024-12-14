import { trialInput, hintButton, inputForm } from './elements'
import { leftHint } from './try-hint'

export let isHintMode = false

hintButton.addEventListener('click', (e) => {
    if (isHintMode) {
        disableHintMode()
    } else {
        enableHintMode()
    }

    e.preventDefault()
    e.stopPropagation()
})

function enableHintMode() {
    if (leftHint < 1) {
        alert('더 이상 힌트를 사용할 수 없습니다.')
        return
    }

    inputForm.classList.add('hint-mode')
    trialInput.placeholder = '정답에 관한 무엇이든 물어보세요.'
    trialInput.focus()

    isHintMode = true
}

export function disableHintMode() {
    inputForm.classList.remove('hint-mode')
    trialInput.placeholder = '정답 입력'
    trialInput.focus()
    isHintMode = false
}

export function removeHintButton() {
    hintButton.remove()
}
