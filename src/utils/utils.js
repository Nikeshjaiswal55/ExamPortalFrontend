export const DateAndTimeFormate = (originalDateString) => {
    const originalDate = new Date(originalDateString);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formattedDateString =
        `${originalDate.getDate()} ${months[originalDate.getMonth()]} ${originalDate.getFullYear()} At ` +
        `${(originalDate.getHours() % 12 || 12)}:${originalDate.getMinutes().toString().padStart(2, '0')} ` +
        `${originalDate.getHours() < 12 ? 'AM' : 'PM'}`;

    return formattedDateString
}


export const TimeFormate = (seconds) => {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    // Add leading zeros if needed
    var formattedHours = hours < 10 ? '0' + hours : hours;
    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    var formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
}