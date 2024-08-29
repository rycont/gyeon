import todaysWord from './todays-word'

const { VITE_COMPARE_API_PATH } = import.meta.env

export async function createWordComparisonSentence(
    trial: string,
    answer: string = todaysWord
): Promise<string> {
    const response = await fetch(
        VITE_COMPARE_API_PATH + new URLSearchParams({ trial, answer })
    )

    const sentence = await response.text()
    return sentence
}
