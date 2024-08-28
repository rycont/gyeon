export default function getChosung(word: string) {
  const chosung = Array.from(word).map((e) => {
    const code = e.charCodeAt(0) - 44032;
    if (code < 0 || code > 11171) return e;
    return String.fromCharCode(Math.floor(code / 588) + 4352);
  });

  return chosung.join("");
}
