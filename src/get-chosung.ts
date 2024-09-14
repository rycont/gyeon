export default function getChosung(word: string) {
    const chars = [...word]
    const chosung = chars.map((char) => {
        const hangulIndex = char.charCodeAt(0) - 44032
        if (hangulIndex < 0 || hangulIndex > 11171) {
            return char
        }

        const chosungIndex = Math.floor(hangulIndex / 588)
        return [
            'ㄱ',
            'ㄲ',
            'ㄴ',
            'ㄷ',
            'ㄸ',
            'ㄹ',
            'ㅁ',
            'ㅂ',
            'ㅃ',
            'ㅅ',
            'ㅆ',
            'ㅇ',
            'ㅈ',
            'ㅉ',
            'ㅊ',
            'ㅋ',
            'ㅌ',
            'ㅍ',
            'ㅎ',
        ][chosungIndex]
    })

    return chosung.join('')
}
