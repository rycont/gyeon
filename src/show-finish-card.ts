import { logWrapper } from './log'
import { todaysChosung } from './todays-word'
import { chatHistory } from './create-word-comparison-sentence'

export function showFinishCard(trials: number) {
    const card = document.createElement('blockquote')

    const p = document.createElement('p')

    const today = new Date()
    const todayString = today.getMonth() + 1 + '월 ' + today.getDate() + '일'

    const template = [
        `${todayString} #견주기 ${trials}번째 시도에 성공했습니다.`,
        `첫 시도: ${chatHistory[1].text}`,
        `초성이 ${todaysChosung}인 단어를 맞출 수 있을까요?`,
        location.origin,
    ]

    p.innerHTML = template.join('<br>')

    const button = document.createElement('button')
    button.appendChild(document.createTextNode('복사'))

    card.addEventListener('click', () => {
        navigator.clipboard.writeText(template.join('\n\n'))
        alert('복사되었습니다')
    })

    card.appendChild(p)
    card.appendChild(button)

    logWrapper.appendChild(card)
}
