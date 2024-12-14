import { trialInput, hintButton, inputForm } from './elements'

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
    inputForm.classList.add('hint-mode')
    trialInput.placeholder = '정답에 관한 무엇이든 물어보세요.'

    isHintMode = true
}

function disableHintMode() {
    inputForm.classList.remove('hint-mode')
    trialInput.placeholder = '정답 입력'
    isHintMode = false
}
