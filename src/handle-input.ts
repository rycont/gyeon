import { chatHistory } from './create-word-comparison-sentence'
import tryAnswer from './try-answer'

const inputForm = document.getElementById('answer_form') as HTMLFormElement

function handler(this: HTMLFormElement, ev: SubmitEvent) {
    ev.preventDefault()

    const formData = new FormData(this)
    const answer = formData.get('answer_input') as string

    const haveTried = chatHistory.some((chat) => chat.text === answer)

    if (haveTried) {
        alert('이미 시도한 단어입니다.')
        formData.set('answer_input', '')
    }

    tryAnswer(answer)
}

inputForm.addEventListener('submit', handler)
