export async function GetEntireScreen(setProgress, handleShow, setContent) {
    try {
        // Attempt to get a stream with displaySurface set to "monitor"
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                displaySurface: "monitor",
                mediaSource: 'screen',
            }
        });
        console.log(stream, 'stream');


        if (stream.getVideoTracks().length > 0) {
            const trackSettings = stream.getVideoTracks()[0].getSettings();
            const extend = externalScreen()
            console.log(extend, 'extend')
            if (trackSettings.deviceId != 'screen:0:0') {
                setContent('Please share your entire screen. Sharing a specific tab or window is not supported.');
                handleShow();
                return;
            } else {
                // User is sharing the entire screen, proceed with your logic
                setProgress((prev) => prev + 25);
            }
        }

    } catch (error) {
        console.error('Error accessing screen share:', error);
        setContent('You need to share your screen with us. Otherwise, you will not move to the next step.');
        handleShow();
    }
}


const externalScreen = () => {
    const { availWidth, availHeight } = window.screen;

    // You can set a threshold for the available screen dimensions
    // to determine if there might be an external screen connected.
    if (availWidth > window.innerWidth || availHeight > window.innerHeight) {
        return true
    } else {
        return false
    }
}
