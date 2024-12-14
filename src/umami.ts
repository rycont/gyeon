export function recordEvent(event: string, data?: { [key: string]: any }) {
    try {
        umami.track(event, data)
    } catch (e) {
        console.error(e)
    }
}
