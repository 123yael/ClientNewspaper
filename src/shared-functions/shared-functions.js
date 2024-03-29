
export const getNextTuesdays = (num) => {
    var nextTuesdays = [];
    var currentDate = getDateNow();
    while (nextTuesdays.length < num) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() === 2)
            nextTuesdays.push(new Date(currentDate).toLocaleDateString('de-DE', {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }));
    }
    return nextTuesdays;
}

export const getDateNow = () => {
    let date = new Date(2024, 1, 27) // new Date()
    return date;
}