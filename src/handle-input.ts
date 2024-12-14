import { chatHistory } from './create-word-comparison-sentence'
import { inputForm } from './elements'
import { isHintMode } from './handle-hint'
import tryAnswer from './try-answer'
import { tryHint } from './try-hint'

function handler(this: HTMLFormElement, ev: SubmitEvent) {
    ev.preventDefault()

    const formData = new FormData(this)
    const trialInput = formData.get('answer_input') as string

    if (isHintMode) {
        tryHint(trialInput)
    } else {
        const haveTried = chatHistory.some((chat) => chat.text === trialInput)

        if (haveTried) {
            alert('이미 시도한 단어입니다.')
            formData.set('answer_input', '')
        }

        tryAnswer(trialInput)
    }
}

inputForm.addEventListener('submit', handler)
