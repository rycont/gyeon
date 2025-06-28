const USER_ID_KEY = 'gyeon-user_id';
const LAST_LOGIN_DATE_KEY = 'gyeon-last_login_date';
const CONSECUTIVE_LOGIN_DAYS_KEY = 'gyeon-consecutive_login_days';

const today = new Date().toLocaleDateString();
let currentConsecutiveLoginDays = 1;

if (!localStorage.getItem(USER_ID_KEY)) {
    localStorage.setItem(USER_ID_KEY, crypto.randomUUID());
    localStorage.setItem(CONSECUTIVE_LOGIN_DAYS_KEY, '1');
    localStorage.setItem(LAST_LOGIN_DATE_KEY, today);
} else {
    const lastLoginDate = localStorage.getItem(LAST_LOGIN_DATE_KEY);
    const storedConsecutiveDays = localStorage.getItem(CONSECUTIVE_LOGIN_DAYS_KEY);

    if (lastLoginDate === today) {
        // 같은 날 재방문
        currentConsecutiveLoginDays = parseInt(storedConsecutiveDays || '1', 10);
    } else {
        // 새로운 날짜에 방문
        if (lastLoginDate) {
            const yesterday = new Date();
            yesterday.setDate(new Date().getDate() - 1);
            if (lastLoginDate === yesterday.toLocaleDateString()) {
                // 어제 로그인 함 (연속)
                currentConsecutiveLoginDays = parseInt(storedConsecutiveDays || '0', 10) + 1;
            } else {
                // 연속 깨짐
                currentConsecutiveLoginDays = 1;
            }
        } else {
            // lastLoginDate가 없는 경우 (기존 사용자가 업데이트 후 처음 방문)
            currentConsecutiveLoginDays = 1;
        }
        localStorage.setItem(LAST_LOGIN_DATE_KEY, today);
        localStorage.setItem(CONSECUTIVE_LOGIN_DAYS_KEY, currentConsecutiveLoginDays.toString());
    }
}

export const userId = localStorage.getItem(USER_ID_KEY)!;
export const consecutiveLoginDays = currentConsecutiveLoginDays;
