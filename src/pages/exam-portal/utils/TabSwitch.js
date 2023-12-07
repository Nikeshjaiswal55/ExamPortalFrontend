import { TabSwitchScreenShot } from "./TabSwitchScreenShot";


export const handleVisibilityChange = (handleShow, setContent, setIsButtonVisible, stream, setCapturedImages, capturedImages) => {
    if (document.hidden && stream) {
        setIsButtonVisible(false)
        TabSwitchScreenShot(stream, setCapturedImages, capturedImages)
        setContent('please dont switch your tab other, your exam will automatically submited.')
        handleShow()
    }
};

export function TabSwitch(handleShow, setContent, setIsButtonVisible, stream, setCapturedImages, capturedImages) {
    document.addEventListener('visibilitychange', () => handleVisibilityChange(handleShow, setContent, setIsButtonVisible, stream, setCapturedImages, capturedImages));
}