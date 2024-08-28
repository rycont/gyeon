import getChosung from './get-chosung'
import log from './log'
import todaysWord, { todaysChosung } from './todays-word'

export default function tryAnswer(answer: string) {
    if (todaysChosung !== getChosung(answer)) {
        alert(`초성이 ${todaysChosung}이여야 합니다`)
        return
    }

    if (todaysWord === answer) {
        log(`${todaysWord}: 정답입니다!`)
        alert('정답입니다!')
        return
    }
}
