import { logWrapper } from './log'
import { todaysChosung } from './todays-word'

export function showFinishCard(trials: number) {
    const card = document.createElement('blockquote')

    const p = document.createElement('p')

    const today = new Date()
    const todayString = today.getMonth() + 1 + '월 ' + today.getDate() + '일'

    p.appendChild(
        document.createTextNode(
            `${todayString} #견주기 ${trials}번째 시도에 성공했습니다. 초성이 ${todaysChosung}인 단어를 맞출 수 있을까요?`
        )
    )

    const button = document.createElement('button')
    button.appendChild(document.createTextNode('복사'))

    card.addEventListener('click', () => {
        navigator.clipboard.writeText(p.textContent!)
        alert('복사되었습니다')
    })

    card.appendChild(p)
    card.appendChild(button)

    logWrapper.appendChild(card)
}