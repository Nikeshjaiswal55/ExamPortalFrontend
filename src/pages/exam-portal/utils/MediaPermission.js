
export async function MediaPermission(setProgress, callback2, handleShow, setContent) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(() => {
                setProgress((prev) => prev + 25)
                callback2()
            })
            .catch((error) => {
                setContent('you have to give access of your camera and mic. Otherwise you will not move to the next step')
                handleShow()
            });
    }
}