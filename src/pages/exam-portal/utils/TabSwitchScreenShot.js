

export const TabSwitchScreenShot = async (stream) => {
    setTimeout(async () => {
        console.log("stream", stream);
        const track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        const bitmap = await imageCapture.grabFrame();

        let canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const context = canvas.getContext('2d');
        context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
        const imageBase64 = canvas.toDataURL('image/jpeg');

        localStorage.setItem('ss', JSON.stringify(imageBase64));
    }, 4000);
};

