function getLogLocalstorageKey() {
    const date = new Date().toDateString()
    return `log_${date}`
}

export const logWrapper = document.getElementById('log_wrapper')!

export const logs: string[] = []

function log(message: string) {
    logs.push(message)

    const p = document.createElement('div')
    p.appendChild(document.createTextNode(`#${logs.length}. ${message}`))

    logWrapper.appendChild(p)
    logWrapper.appendChild(document.createElement('hr'))

    saveLog()
}

export default log

function restoreLog() {
    const key = getLogLocalstorageKey()
    const logString = localStorage.getItem(key)

    if (!logString) {
        return
    }

    const logArray = JSON.parse(logString)
    logArray.forEach((message: string) => log(message))
}

function saveLog() {
    const key = getLogLocalstorageKey()
    localStorage.setItem(key, JSON.stringify(logs))
}

restoreLog()
