function preventCopy(event) {
    event.preventDefault();
}

export function PreventCopy2(setProgress, callback) {
    document.addEventListener('copy', preventCopy);
    setProgress((prev) => prev + 25);
    callback()
}