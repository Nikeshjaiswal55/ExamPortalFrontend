export function maskPhoneNumber(phoneNumber) {
    // Ensure the input is a string and has at least 3 digits
    if (typeof phoneNumber !== 'string' || phoneNumber.length < 3) {
        throw new Error('Invalid phone number');
    }

    // Get the last 3 digits
    const lastThreeDigits = phoneNumber.slice(-3);
    
    // Create the masked part by replacing all but the last 3 digits with asterisks
    const maskedPart = '*'.repeat(phoneNumber.length - 3);

    // Combine the masked part and the last 3 digits
    return maskedPart + lastThreeDigits;
}