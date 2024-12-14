import getChosung from './get-chosung'

const todaysChosungElement = document.getElementById('chosung')!

export default function showTodaysChosung(todaysWord: string) {
    for (const chosung of getChosung(todaysWord)) {
        const div = document.createElement('div')
        div.appendChild(document.createTextNode(chosung))
        todaysChosungElement.appendChild(div)
    }
}

