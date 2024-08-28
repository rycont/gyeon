import tryAnswer from './try-answer'

const inputForm = document.getElementById('answer_form') as HTMLFormElement

function handler(this: HTMLFormElement, ev: SubmitEvent) {
    ev.preventDefault()

    const formData = new FormData(this)
    const answer = formData.get('answer_input') as string

    tryAnswer(answer)
}

inputForm.addEventListener('submit', handler)
