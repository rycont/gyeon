import getChosung from './get-chosung'

export default function showTodaysChosung(todaysWord: string) {
    const todaysChosungElement = document.getElementById('chosung')!
    todaysChosungElement.appendChild(
        document.createTextNode(getChosung(todaysWord))
    )
}