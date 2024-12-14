export const logWrapper = document.getElementById('log_wrapper')!

function log(message: string) {
    const p = document.createElement('div')
    p.appendChild(document.createTextNode(message))

    logWrapper.appendChild(p)
    logWrapper.appendChild(document.createElement('hr'))
}

export default log
