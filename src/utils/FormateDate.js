export const FormateDate = (date) => {
    // const dateObject = new Date(date);

    // const day = dateObject.getDate();
    // const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
    // const year = dateObject.getFullYear();

    // // Ensure two-digit format for day and month
    // const formattedDay = day < 10 ? `0${day}` : day;
    // const formattedMonth = month < 10 ? `0${month}` : month;

    // const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
    // return formattedDate;

    const dateObject = new Date(date);

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const formattedDate = dateObject.toLocaleString('en-US', options);
    return formattedDate
}