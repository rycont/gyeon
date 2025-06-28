const USER_ID_KEY = 'gyeon-user_id'
const LAST_LOGIN_DATE_KEY = 'gyeon-last_login_date'
const CONSECUTIVE_LOGIN_DAYS_KEY = 'gyeon-consecutive_login_days'

/**
 * Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환합니다.
 * @param date 변환할 Date 객체
 * @returns 'YYYY-MM-DD' 형식의 날짜 문자열
 */
const toISODateString = (date: Date): string => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

const today = new Date()
const todayStr = toISODateString(today)
let currentConsecutiveLoginDays = 1

if (!localStorage.getItem(USER_ID_KEY)) {
    localStorage.setItem(USER_ID_KEY, crypto.randomUUID())
    localStorage.setItem(CONSECUTIVE_LOGIN_DAYS_KEY, '1')
    localStorage.setItem(LAST_LOGIN_DATE_KEY, todayStr)
} else {
    const lastLoginDate = localStorage.getItem(LAST_LOGIN_DATE_KEY)
    const storedConsecutiveDays = localStorage.getItem(
        CONSECUTIVE_LOGIN_DAYS_KEY
    )

    if (lastLoginDate === todayStr) {
        // 같은 날 재방문
        currentConsecutiveLoginDays = parseInt(storedConsecutiveDays || '1', 10)
    } else {
        // 새로운 날짜에 방문
        if (lastLoginDate) {
            const yesterday = new Date()
            yesterday.setDate(today.getDate() - 1)
            const yesterdayStr = toISODateString(yesterday)

            if (lastLoginDate === yesterdayStr) {
                // 어제 로그인 함 (연속)
                currentConsecutiveLoginDays =
                    parseInt(storedConsecutiveDays || '0', 10) + 1
            } else {
                // 연속 깨짐
                currentConsecutiveLoginDays = 1
            }
        } else {
            // lastLoginDate가 없는 경우 (기존 사용자가 업데이트 후 처음 방문)
            currentConsecutiveLoginDays = 1
        }
        localStorage.setItem(LAST_LOGIN_DATE_KEY, todayStr)
        localStorage.setItem(
            CONSECUTIVE_LOGIN_DAYS_KEY,
            currentConsecutiveLoginDays.toString()
        )
    }
}

export const userId = localStorage.getItem(USER_ID_KEY)!
export const consecutiveLoginDays = currentConsecutiveLoginDays
