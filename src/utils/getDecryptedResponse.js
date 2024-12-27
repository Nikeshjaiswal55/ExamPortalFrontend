import CryptoJS from 'crypto-js';
const secretKey = 'nikkk';  // Use the same secret key
export const getDecryptedResponse = (storageKey) => {
    const encryptedData = localStorage.getItem(storageKey);
    console.log('encryptedData',encryptedData)

    if (encryptedData) {
        // Decrypt the response
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        console.log('Decrypted response:', decryptedData);
        return decryptedData;
    } else {
        console.log('No data found in localStorage');
        return null;
    }
};


export const setEncryptData=(data,storageKey)=>{
    const encryptedResponse = CryptoJS.AES.encrypt(
        JSON.stringify(data), 
        secretKey
    ).toString();

    // Store the encrypted response in localStorage
    localStorage.setItem(storageKey, encryptedResponse);
}