const logWrapper = document.getElementById('log_wrapper')!

function log(message: string) {
    const p = document.createElement('li')
    p.appendChild(document.createTextNode(message))

    logWrapper.appendChild(p)
}

export default log
