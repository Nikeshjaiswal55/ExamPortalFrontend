
export async function MediaPermission(setProgress, callback2, handleShow, setContent) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(() => {
                setProgress((prev) => prev + 25)
                callback2()
            })
            .catch((error) => {
                setContent(`Your camera and microphone are blocked. Please follow the instructions below to enable access:\n
                1. Click on the lock icon in the browser address bar.\n
                2. Set camera and microphone to "Allow".\n
                3. Reload the page`)
                handleShow()
            });
    }
}