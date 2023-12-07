import { PreventCopy2 } from "./PreventCopy";

export const CheckForExtension = (handleShow, setContent, setProgress, callback) => {
    if (typeof browser !== "undefined" && typeof browser.runtime !== "undefined" && browser.runtime.getManifest) {
        // Check for a browser extension using the WebExtensions API
        setContent('You are using a browser extension. Please disable it!!');
        handleShow();
        return;
    } else {
        // No known extension found
        setProgress((prev) => prev + 25);
        PreventCopy2(setProgress, callback);
    }
};
