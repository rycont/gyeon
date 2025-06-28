import showTodaysChosung from './show-todays-chosung'

import './handle-input'
import './handle-hint'
import todaysWord from './todays-word'
import { consecutiveLoginDays } from './user'
import { elements } from './elements'

showTodaysChosung(todaysWord)

const consecutiveLoginDaysElement = elements.body.querySelector(
    '#consecutive-login-days',
)
if (consecutiveLoginDaysElement) {
    consecutiveLoginDaysElement.textContent = `${consecutiveLoginDays}일 연속 출석`
}
