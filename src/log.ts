export const logWrapper = document.getElementById('log_wrapper')!

let logCount = 1

function log(message: string) {
    const p = document.createElement('div')
    p.appendChild(document.createTextNode(`#${logCount++}. ${message}`))

    logWrapper.appendChild(p)
    logWrapper.appendChild(document.createElement('hr'))
}

export default log
