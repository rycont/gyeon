const USER_ID_KEY = 'gyeon-user_id'

if (!localStorage.getItem(USER_ID_KEY)) {
    localStorage.setItem(USER_ID_KEY, crypto.randomUUID())
}

export const userId = localStorage.getItem(USER_ID_KEY)!
