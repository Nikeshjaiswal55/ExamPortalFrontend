export const TabSwitchScreenShot = async () => {
    const stream = JSON.parse(localStorage.getItem('stream'))
    setTimeout(async () => {
        console.log(stream);
        const track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        const bitmap = await imageCapture.grabFrame();

        let canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const context = canvas.getContext('2d');
        context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
        const image = canvas.toDataURL();

        const res = await fetch(image);
        const buff = await res.arrayBuffer();

        const file = new File([buff], `photo_${new Date()}.jpg`, {
            type: 'image/jpeg',
        });
        localStorage.setItem('ss', JSON.stringify(file))
    }, 100);
};
