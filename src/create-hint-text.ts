import todaysWord from './todays-word'

export async function createHintText(
    question: string,
    answer: string = todaysWord
): Promise<string> {
    const response = await fetch(
        import.meta.env.VITE_COMPARE_API_PATH +
            '/get-hint?' +
            new URLSearchParams({
                question,
                answer,
            })
    )

    return response.text()
}
