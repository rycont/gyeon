import { inputForm } from './handle-input'

export let isHintMode = false

const hintButton = document.getElementById('hint_button') as HTMLButtonElement
const inputElement = document.getElementById('answer_input') as HTMLInputElement

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
    inputElement.placeholder = '정답에 관한 무엇이든 물어보세요.'

    isHintMode = true
}

function disableHintMode() {
    inputForm.classList.remove('hint-mode')
    inputElement.placeholder = '정답 입력'
    isHintMode = false
}
